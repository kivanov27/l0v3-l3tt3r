import homeIcon from "../assets/home.png";
import savedIcon from "../assets/saved.png";
import settingsIcon from "../assets/settings.png";
import bearIcon from "../assets/bear.png";
import chickenIcon from "../assets/chicken.png"
import type { MessageEntry } from "../types";
import { useEffect, useState } from "react";

interface KrisViewProps {
    messages: MessageEntry[];
    setFrom: React.Dispatch<React.SetStateAction<string>>;
    // newMessage: string;
    // setNewMessage: React.Dispatch<React.SetStateAction<string>>;
    // addMessage: (event: React.SyntheticEvent) => void;
}

const KrisView = ({ messages, setFrom }: KrisViewProps) => {
    const [dates, setDates] = useState<string[]>();

    useEffect(() => {
        setFrom("Kris");
        const uniqueDates = [... new Set(
            messages
                .map(msg => msg.date ? new Date(msg.date).toLocaleDateString() : undefined)
                .filter(d => d !== undefined)
        )];
        setDates(uniqueDates);
    }, [setFrom, messages]);

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
                                    .filter(m => m.date?.toLocaleDateString() === d)
                                    .map(m => {
                                        if (m.from === "Kris") {
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
                                        else if (m.from === "Vigzi") {
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KrisView;
