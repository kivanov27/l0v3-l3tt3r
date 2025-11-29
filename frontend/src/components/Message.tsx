import { useEffect, useState } from "react";
import type { MessageEntry, User } from "../types";
import { updateUser } from "../services/userService";

interface MessageProps {
    message: MessageEntry;
    user: User;
    recipient: User;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Message = ({ message, user, recipient, setUser }: MessageProps) => {
    const [saved, setSaved] = useState<boolean>();

    useEffect(() => {
        const isSaved = user.saved?.includes(message.id);
        setSaved(isSaved);
    }, [message.id, user.saved]);

    const changeSave = () => {
        if (saved) unsaveMessage();
        else saveMessage();
    };

    const saveMessage = async () => {
        console.log("saving");
        if (!saved) {
            setSaved(true);
            const newUser = {
                ...user,
                friends: user.friends?.map(f => f.id),
                requests: user.requests?.map(r => r.id),
                saved: user.saved?.concat(message.id)
            };
            const updatedUser = await updateUser(user.id, newUser);
            setUser(updatedUser);
        }
    };

    const unsaveMessage = async () => {
        console.log("unsaving");
        if (saved) {
            setSaved(false);
            const newUser = {
                ...user,
                friends: user.friends?.map(f => f.id),
                requests: user.requests?.map(r => r.id),
                saved: user.saved?.filter(m => m !== message.id)
            };
            const updatedUser = await updateUser(user.id, newUser);
            setUser(updatedUser);
        }
    };

    if (message.from === user.username) {
        return (
            <div className="msg msg-mine" key={message.id}>
                <div 
                    className={`msg-save-button ${saved ? 'filled' : ''}`}
                    onClick={changeSave}
                />
                <span className="msg-time">
                    {message.date?.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                    })}
                </span>
                <span className="msg-message msg-message-mine">
                    {message.message}
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
        );
    }
    else if (message.from === recipient.username) {
        return (
            <div className="msg msg-other" key={message.id}>
                <div 
                    className="msg-pic-container"
                    style={{ backgroundColor: recipient.bgColor }}
                >
                    {recipient.iconUrl &&
                        <img src={recipient.iconUrl} />
                    }
                </div>
                <span className="msg-message msg-message-other">
                    {message.message}
                </span>
                <span className="msg-time">
                    {message.date?.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                    })}
                </span>
                <div 
                    className={`msg-save-button ${saved ? 'filled' : ''}`}
                    onClick={changeSave}
                />
            </div>
        );
    }
};

export default Message;
