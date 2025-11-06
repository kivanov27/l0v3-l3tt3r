import { useEffect } from "react";
import type { MessageEntry } from "../types";

interface KrisViewProps {
    messages: MessageEntry[];
    newMessage: string;
    setNewMessage: React.Dispatch<React.SetStateAction<string>>;
    setFrom: React.Dispatch<React.SetStateAction<string>>;
    addMessage: (event: React.SyntheticEvent) => void;
}

const KrisView = ({ messages, newMessage, setNewMessage, setFrom, addMessage }: KrisViewProps) => {
    // remove
    console.log(messages);

    useEffect(() => {
        setFrom("Kris");
    }, [setFrom]);

    return (
        <div className="container">
            <div className="chat-container">
                <div className="chat">
                </div>
                <div className="chat-box">
                    <textarea
                        className="chat-message"
                        value={newMessage}
                        onChange={({ target }) => setNewMessage(target.value)}
                    />
                    <button
                        className="btn-heart"
                        onClick={addMessage}
                    >
                        💙
                    </button>
                </div>
            </div>
        </div>
    );
};

export default KrisView;
