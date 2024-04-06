import React, { useState } from "react";
import Picker from 'emoji-picker-react';
import "./emojis.css"

const EmojisAdd=()=>{
    const [inputStr, setInputStr] = useState('');
    const [showPicker, setShowPicker] = useState(false);
   
    const onEmojiClick = (event, emojiObject) => {
      setInputStr(prevInput => prevInput + emojiObject.emoji);
      setShowPicker(false);
    };
   
    return (
      <div className="app">
        <h3>Add Emoji Picker</h3>
        <div className="picker-container">
          <input
            className="input-style"
            value={inputStr}
            onChange={e => setInputStr(e.target.value)} />
          <img
            className="emoji-icon"
            src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
            onClick={() => setShowPicker(val => !val)} alt="emoji"/>
          {showPicker && <Picker
            pickerStyle={{ width: '100%' }}
            onEmojiClick={onEmojiClick} />}
        </div>
      </div>
    );
}
export default  EmojisAdd; 