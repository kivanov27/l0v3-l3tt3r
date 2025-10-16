import phone from "../assets/iphone6.png";
import { useState } from "react";

const krisMsg = "hy lil bb how u doin today wit yo fine lil booty cheek";
const vigziMsg = "im gucci my doochi wanna smell my coochie";

const VigziView = () => {
  const [message, setMessage] = useState<string>("");
  const [urMsg, setUrMsg] = useState<string>(vigziMsg);

  return (
    <div>
      <img src={phone} alt="fak" width="454" height="872" />
      <div className="chat-container">
        <div className="chat">
          <div className="msg-container left">
            <span className="msg-lbl">kris' msg 4 u</span>
            <span className="msg kris">{krisMsg}</span>
          </div>
          <div className="msg-container right">
            <span className="msg-lbl">ur msg 4 kris</span>
            <span className="msg vigzi">{urMsg}</span>
          </div>
        </div>
        <div className="chat-box">
          <textarea
            className="chat-message"
            value={message}
            onChange={({ target }) => setMessage(target.value)}
          />
        </div>
      </div>
      <button
        className="btn-heart"
        onClick={() => setUrMsg(message)}
      >
        💙
      </button>
    </div>
  );
};

export default VigziView;
