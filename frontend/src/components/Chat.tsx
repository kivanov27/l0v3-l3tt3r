import homeIcon from "../assets/home.png";
import savedIcon from "../assets/saved.png";
import settingsIcon from "../assets/settings.png";
import bearIcon from "../assets/bear.png";
import chickenIcon from "../assets/chicken.png";
import letterIcon from "../assets/letter.png";
import type { MessageEntry, User } from "../types";
import { useEffect, useState } from "react";

interface ChatProps {
    user: User; 
    messages: MessageEntry[];
    newMessage: string;
    setNewMessage: React.Dispatch<React.SetStateAction<string>>;
    addMessage: (event: React.SyntheticEvent) => void;
    logOut: () => void;
}

const Chat = ({ user, messages, newMessage, setNewMessage, addMessage }: ChatProps) => {
    const [dates, setDates] = useState<string[]>();

    useEffect(() => {
        const uniqueDates = [... new Set(
            messages
                .map(msg => msg.date ? new Date(msg.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                }) : undefined)
                .filter(d => d !== undefined)
        )];
        setDates(uniqueDates);
    }, [messages]);

    return (
        <div className="container">
            <div className="box">
                <div className="widget-container">
                    <img src={homeIcon} />
                    <img src={savedIcon} />
                    <img src={settingsIcon} />
                </div>
                <div className="chat-container">
                    <div className="chat">
                        {dates?.map(d =>
                            <div key={d} className="msg-day">
                                <div className="date-line">
                                    <span className="date">
                                        {d}
                                    </span>
                                </div>
                                {messages
                                    .filter(m => m.date?.toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric"
                                    }) === d)
                                    .map(m => {
                                        if (m.from === user.username) {
                                            return (
                                                <div className="msg msg-mine" key={m.id}>
                                                    <span className="msg-time">
                                                        {m.date?.toLocaleTimeString([], {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            hour12: false
                                                        })}
                                                    </span>
                                                    <span className="msg-message msg-message-mine">
                                                        {m.message}
                                                    </span>
                                                    <div className="msg-pic-container bear-bg">
                                                        <img src={bearIcon} />
                                                    </div>
                                                </div>
                                            )
                                        }
                                        else {
                                            return (
                                                <div className="msg msg-other" key={m.id}>
                                                    <div className="msg-pic-container chicken-bg">
                                                        <img src={chickenIcon} />
                                                    </div>
                                                    <span className="msg-message msg-message-other">
                                                        {m.message}
                                                    </span>
                                                    <span className="msg-time">
                                                        {m.date?.toLocaleTimeString([], {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            hour12: false
                                                        })}
                                                    </span>
                                                </div>
                                            )
                                        }
                                    })}
                            </div>
                        )}
                    </div>
                    <div className="chatbox">
                        <textarea 
                            id="chatbox"
                            className="chatbox-text" 
                            value={newMessage}
                            placeholder="type your message here..." 
                            onChange={({ target }) => setNewMessage(target.value)}
                        />
                        <div 
                            className="chatbox-btn"
                            onClick={addMessage}
                        >
                            <img src={letterIcon} draggable="false" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
