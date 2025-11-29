import letterIcon from "../assets/letter.png";
import lockIcon from "../assets/lock.png";
import type { MessageEntry, NewMessageEntry, User } from "../types";
import { useEffect, useState, useRef } from "react";
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
    const [locked, setLocked] = useState<boolean>(false);
    const chatRef = useRef<HTMLDivElement>(null);

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

        fetchMessages();
    }, [user, recipient]);

    // Get unique dates to generate messages for each date
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

    // Scroll chat to bottom
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTo({
                top: chatRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [messages]);

    // Check if chat box should be locked
    useEffect(() => {
        if (!user?.lastSentAt) {
            setLocked(false);
            return;
        }

        const last = new Date(user.lastSentAt);
        setLocked(sameDay(last, new Date()));
    }, [user]);

    const addMessage = async (event: React.SyntheticEvent) => { 
        event.preventDefault();

        if (user && recipient) {
            const msgToAdd: NewMessageEntry = { 
                from: user.username, 
                to: recipient.username, 
                message: newMessage 
            };

            //send to backend
            await createMessage(msgToAdd);
            // update user in backend
            const updated = await updateUser(user.id, {
                ...user,
                friends: user.friends?.map(f => f.id),
                requests: user.requests?.map(r => r.id),
                lastSentAt: new Date()
            });
            setUser(updated);
            setNewMessage("");
        }
        else {
            console.error("No user or recipient.");
        }
    };

    const sameDay = (a: Date, b: Date): boolean => {
        if (!a) return false
        return a.getFullYear() === b.getFullYear() && 
            a.getMonth() === b.getMonth() && 
            a.getDate() === b.getDate();
    };

    return (
        <div className="container">
            <div className="box">
                <SideMenu setUser={setUser} />
                <div className="chat-container">
                    <div className="chat" ref={chatRef}>
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
                                                    <div 
                                                        className="msg-pic-container"
                                                        style={{ backgroundColor: user.bgColor }}
                                                    >
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
                                                    <div 
                                                        className="msg-pic-container"
                                                        style={{ backgroundColor: recipient.bgColor }}
                                                    >
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
                    {locked ?
                        <div className="locked-chatbox">
                            <img src={lockIcon} draggable={false} />
                        </div>
                        :
                        <div className="chatbox">
                            <textarea 
                                id="chatbox"
                                className="chatbox-text" 
                                value={newMessage}
                                placeholder="type your message here..." 
                                onChange={({ target }) => setNewMessage(target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        addMessage(e);
                                    }
                                }}
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
