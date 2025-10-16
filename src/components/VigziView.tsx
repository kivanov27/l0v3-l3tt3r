import phone from "../assets/iphone6.png";
import { useState } from "react";

const VigziView = () => {
  const [message, setMessage] = useState<string>("");

  return (
    <div>
      <img src={phone} alt="fak" width="454" height="872" />
      <div className="chat">
        <div className="kris-get"></div>
        <div className="vigzi-send"></div>
        <div className="chat-box">
          <textarea 
            className="chat-message"
            value={message}
            onChange={({ target }) => setMessage(target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default VigziView;
