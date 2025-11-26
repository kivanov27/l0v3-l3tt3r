import letterIcon from "../assets/letter.png";
import type { MessageEntry, NewMessageEntry, User } from "../types";
import { useEffect, useState } from "react";
import { createMessage, getAllMessages } from "../services/messageService";
import SideMenu from "./SideMenu";
import { updateUser } from "../services/userService";

interface ChatProps {
    user: User; 
    recipient: User;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Chat = ({ user, recipient, setUser }: ChatProps) => {
    const [dates, setDates] = useState<string[]>();
    const [messages, setMessages] = useState<MessageEntry[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');

    useEffect(() => {
        const fetchMessages = async () => {
            if (user && recipient) {
                const fetchedMessages = await getAllMessages(user.username, recipient.username);
                const parsedMessages = fetchedMessages.map(m => ({
                    ...m,
                    date: m.date ? new Date(m.date) : undefined
                }));
                setMessages(parsedMessages);
            }
            else {
                console.error("You somehow got here without a user or recipient");
            }
        };

        const uniqueDates = [... new Set(
            messages
                .map(msg => msg.date ? new Date(msg.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                }) : undefined)
                .filter(d => d !== undefined)
        )];

        fetchMessages();
        setDates(uniqueDates);
    }, [messages, user, recipient]);

    const addMessage = (event: React.SyntheticEvent) => { 
        event.preventDefault();

        if (user && recipient) {
            const msgToAdd: NewMessageEntry = { 
                from: user.username, 
                to: recipient.username, 
                message: newMessage 
            };
            setNewMessage("");
            createMessage(msgToAdd);
            updateUser(user.id, {
                ...user,
                friends: user.friends?.map(f => f.id),
                requests: user.requests?.map(r => r.id),
                lastSentAt: new Date()
            });
        }
        else {
            console.error("No user or recipient.");
        }
    };

    const sameDay = (d1: Date, d2: Date) => {
        if (!d1) return false
        return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    }

    const isLocked = () => {
        return sameDay(user.lastSentAt as Date, new Date());
    };

    return (
        <div className="container">
            <div className="box">
                <SideMenu setUser={setUser} />
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
                    {isLocked() ?
                        <div className="locked-chatbox">
                            am loked
                        </div>
                        :
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
                    }
                </div>
            </div>
        </div>
    );
};

export default Chat;
