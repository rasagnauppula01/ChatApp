import React, { useContext, useState } from 'react';
import Img from "../images/img.png";
import Attach from "../images/attach.png";
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import InputEmoji from "react-input-emoji";
import * as Icon from 'react-bootstrap-icons';

function Inputpanel() {

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const handleSend = async () => {
    if (!data.chatId) {
      alert("Please select a user to send the message");
      return;
    }

    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      
      uploadTask.on("error", (error) => {
        console.error("Upload error:", error);
      });

      uploadTask.on("state_changed", (snapshot) => {
        // You can add progress tracking here if needed
      }, (error) => {
        console.error("Upload error:", error);
      }, async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
          await updateLastMessage();
        } catch (error) {
          console.error("Error updating message with image:", error);
        }
      });
    } else {
      try {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
        await updateLastMessage();
      } catch (error) {
        console.error("Error updating message without image:", error);
      }
    }

    setText("");
    setImg(null);
    setImgPreview(null);
  }

  const updateLastMessage = async () => {
    try {
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text
        },
        [data.chatId + ".date"]: serverTimestamp()
      });
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text
        },
        [data.chatId + ".date"]: serverTimestamp()
      });
    } catch (error) {
      console.error("Error updating last message:", error);
    }
  }

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImg(file);
      setImgPreview(URL.createObjectURL(file)); // Display image preview
    }
  }

  return (
    <div className='input'>
      {imgPreview && <img src={imgPreview} alt="image-preview" className='image-preview' />}
      <InputEmoji
        value={text}
        onChange={setText}
        cleanOnEnter
        onKeyDown={handleEnter}
        placeholder="Type a message..."
      />
      <div className='send'>
        {/* <img src={Attach} /> */}
        <input type='file' style={{display:"none"}} id='file' onChange={handleImageChange} />
        <label htmlFor='file'>
          <img src={Img} alt=''/>
        </label>
        <span><Icon.SendFill onClick={handleSend}/></span>
      </div>
    </div>
  )
}

export default Inputpanel;
