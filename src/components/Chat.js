// import React, { useContext } from 'react'
// import Cam from "../images/cam.png";
// import Add from "../images/add.png"
// import More from "../images/more.png"
// import Messages from './Messages';
// import Input from './Input';
// import { ChatContext } from '../context/ChatContext';


// const Chat = () => {
//   const { data }= useContext(ChatContext);
//   return (
//     <div className='chat'>
//       <div className='chatInfo'>
//         <span>{data.user?.displayName}</span>
//         <div className='chatIcons'>
//             <img src={Cam} alt=''/>
//             <img src={Add} alt=''/>
//             <img src={More} alt=''/>
//           </div>
         
//       </div>
//       <Messages/>
//       <Input/>
//     </div>
//   )
// }

// export default Chat


import React, { useContext, useRef, useState } from 'react';
import Cam from "../images/cam.png";
import Add from "../images/add.png";
import More from "../images/more.png";
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../context/ChatContext';

const Chat = () => {
  const { data } = useContext(ChatContext);
  const videoRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);

  // Function to start video streaming
  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing video stream:', error);
    }
  };

  // Function to stop video streaming
  const stopVideo = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
  };

  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>{data.user?.displayName}</span>
        <div className='chatIcons'>
          <img src={Cam} alt='' onClick={startVideo} />
          <img src={Add} alt='' />
          <img src={More} alt='' onClick={stopVideo} />
        </div>
      </div>
      <video ref={videoRef} style={{ display: mediaStream ? 'block' : 'none' }} autoPlay playsInline muted />
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
