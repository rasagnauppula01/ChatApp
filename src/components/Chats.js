import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Chats=()=>{

  const [chats, setChats]= useState([]);

  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);


  useEffect(()=>{
    const getChats=()=>{
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      setChats(doc.data())
      });
      return()=>{
        unsub();
      };
    };
    currentUser.uid && getChats()
  },[currentUser.uid])


  const handleSelect=(u)=>{
    dispatch({
      type: "CHANGE_USER",
      payload: u
    })
  }

  const getMessageSentTime = (timestamp) => {
    if (!timestamp) {
      return ''; 
    }
    const date = timestamp.toDate(); 
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleString('en-US', options);
  };
  


  return (
    <div className='chats'>
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=>(
       <div className='userChat' key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
        <img src={chat[1].userInfo.photoURL} alt=''/>
        <div className='userChatInfo'>
          <span>{chat[1].userInfo.displayName}</span>
          <div className='TimeMessage'>
            <p>{chat[1].lastMessage?.text}</p>
            <p className='time'>{getMessageSentTime(chat[1].date)}</p>
          </div>
        </div>
      </div>
      ))}
    </div>
  )
}
export default Chats;








// import { doc, onSnapshot } from "firebase/firestore";
// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";
// import { db } from "../firebase";

// const Chats = () => {
//   const [chats, setChats] = useState({});
//   const { currentUser } = useContext(AuthContext);
//   const { dispatch } = useContext(ChatContext);

//   useEffect(() => {
//     const getChats = () => {
//       if (!currentUser.uid || !dispatch) return; // Ensure currentUser and dispatch are defined
//       const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
//         setChats(doc.data()|| {});
//       });
//       return () => {
//         unsub();
//       };
//     };

//     getChats();
//   }, [currentUser.uid, dispatch]); // Include currentUser and dispatch in dependencies array

//   const handleSelect = (u) => {
//     dispatch({ type: "CHANGE_USER", payload: u }); //for select function in search component we need to do like this
//   };
//   // console.log(currentUser.uid);
//   return (
//     <div className="chats">
//       {Object.entries(chats)
//         .sort((a, b) => b[1].date - a[1].date)
//         .map((chat) => (
//           <div
//             className="userChat"
//             key={chat[0]}
//             onClick={() => handleSelect(chat[1].userInfo)}
//           >
//             <img src={chat[1].userInfo.photoURL} alt="" />
//             <div className="userChatInfo">
//               <span>{chat[1].userInfo.displayName}</span>
//               <p>{chat[1].lastMessage?.text.slice(0, 20)}</p>
              
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default Chats;