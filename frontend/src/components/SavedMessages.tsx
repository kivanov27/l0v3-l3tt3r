import { useEffect, useState, useRef } from "react";
import type { MessageEntry, User } from "../types";
import { getUserSavedMessages } from "../services/userService";
import SideMenu from "./SideMenu";
import Message from "./Message";

interface SavedMessagesProps {
    user: User;
    recipient: User;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const SavedMessages = ({ user, recipient, setUser }: SavedMessagesProps) => {
    const [messages, setMessages] = useState<MessageEntry[]>([]);
    const [dates, setDates] = useState<string[]>();
    const chatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchUserWithSavedMessages = async () => {
            const userWithSavedMessages = await getUserSavedMessages(user.id);
            if (userWithSavedMessages) {
                setMessages(
                    userWithSavedMessages.saved
                        .filter((m: MessageEntry) => 
                            m.to === recipient.username)
                );
            }
            else {
                console.error("Couldn't find the user somehow.");
            }
        };

        fetchUserWithSavedMessages();
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

    if (!recipient) {
        return (
            <div className="container">
                <div className="box">
                    <SideMenu setUser={setUser} />
                    <div className="chat-container">
                        <div className="chat" ref={chatRef}>
                            <h2>No recipient</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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
                                    .map(m =>
                                        <Message
                                            key={m.id}
                                            message={m}
                                            user={user}
                                            recipient={recipient}
                                            setUser={setUser}
                                        />
                                    )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavedMessages;
