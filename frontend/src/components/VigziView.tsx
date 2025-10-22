import phone from "../assets/iphone6.png";
import { useEffect } from "react";
import type { MessageEntry } from "../types";

interface VigziViewProps {
    messages: MessageEntry[];
    newMessage: string;
    setNewMessage: React.Dispatch<React.SetStateAction<string>>;
    setFrom: React.Dispatch<React.SetStateAction<string>>;
    addMessage: (event: React.SyntheticEvent) => void;
}

const VigziView = ({ messages, newMessage, setNewMessage, setFrom, addMessage }: VigziViewProps) => {
    useEffect(() => {
        setFrom("Vigzi");
    }, [setFrom]);

    return (
        <div>
            <img src={phone} alt="fak" width="454" height="872" />
            <div className="chat-container">
                <div className="chat">
                    <div className="msg-container left">
                        <span className="msg-lbl">kris' msg 4 u</span>
                        <span className="msg kris">
                            {messages.find(m => m.from === "Kris")?.message}
                        </span>
                    </div>
                    <div className="msg-container right">
                        <span className="msg-lbl">ur msg 4 kris</span>
                        <span className="msg vigzi">
                            {messages.find(m => m.from === "Kris")?.message}
                        </span>
                    </div>
                </div>
                <div className="chat-box">
                    <textarea
                        className="chat-message"
                        value={newMessage}
                        onChange={({ target }) => setNewMessage(target.value)}
                    />
                </div>
            </div>
            <button
                className="btn-heart"
                onClick={addMessage}
            >
                💙
            </button>
        </div>
    );
};

export default VigziView;
