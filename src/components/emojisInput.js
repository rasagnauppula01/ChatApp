import React, { useState } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

const ChatInput = () => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji.native);
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        placeholder="Type your message..."
      />
      <Picker onSelect={handleEmojiSelect} />
    </div>
  );
};

export default ChatInput;
