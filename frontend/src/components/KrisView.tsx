import homeIcon from "../assets/home.png";
import savedIcon from "../assets/saved.png";
import settingsIcon from "../assets/settings.png";
// import { useEffect } from "react";
// import type { MessageEntry } from "../types";

// interface KrisViewProps {
//     messages: MessageEntry[];
//     newMessage: string;
//     setNewMessage: React.Dispatch<React.SetStateAction<string>>;
//     setFrom: React.Dispatch<React.SetStateAction<string>>;
//     addMessage: (event: React.SyntheticEvent) => void;
// }

const KrisView = () => {
    // useEffect(() => {
    //     setFrom("Kris");
    // }, [setFrom]);

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
                    </div>
                    <div className="chatbox">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KrisView;
