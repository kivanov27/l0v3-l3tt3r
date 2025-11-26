import homeIcon from "../assets/home.png";
import savedIcon from "../assets/saved.png";
import settingsIcon from "../assets/settings.png";
import logoutIcon from "../assets/logout.png";
import letterIcon from "../assets/letter.png";
import type { MessageEntry, User } from "../types";
import { useEffect, useState } from "react";

interface ChatProps {
    user: User; 
    recipient: User;
    messages: MessageEntry[];
    newMessage: string;
    setNewMessage: React.Dispatch<React.SetStateAction<string>>;
    addMessage: (event: React.SyntheticEvent) => void;
    logOut: () => void;
}

const Chat = ({ user, recipient, messages, newMessage, setNewMessage, addMessage, logOut }: ChatProps) => {
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
                    <img src={homeIcon} className="clickable" />
                    <img src={savedIcon} className="clickable" />
                    <img src={settingsIcon} className="clickable" />
                    <img src={logoutIcon} className="clickable" onClick={logOut} />
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
                                                        {user.iconUrl &&
                                                            <img src={user.iconUrl} />
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        }
                                        else if (m.from === recipient.username) {
                                            return (
                                                <div className="msg msg-other" key={m.id}>
                                                    <div className="msg-pic-container chicken-bg">
                                                        {recipient.iconUrl &&
                                                            <img src={recipient.iconUrl} />
                                                        }
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
