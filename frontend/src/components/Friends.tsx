import { useEffect, useState } from "react";
import type { User } from "../types";
import FriendForm from "./FriendForm";
import homeIcon from "../assets/home.png";
import savedIcon from "../assets/saved.png";
import settingsIcon from "../assets/settings.png";
import logoutIcon from "../assets/logout.png";

interface FriendsProps {
    user: User;
    logOut: () => void;
}

const Friends = ({ user, logOut }: FriendsProps) => {
    const [friends, setFriends] = useState<User[]>();
    const [formOpen, setFormOpen] = useState<boolean>(false);

    // const fetchFriends = () => {
    //     setFriends(user.friends);
    // }

    // useEffect(() => {
    //     fetchFriends();
    // }, [fetchFriends])

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
                    <h1>Friends</h1>
                    <div className="friends">
                        {friends && friends.map(friend =>
                            <div key={friend.username} className="friend">
                                <div className="friend-img-container">
                                    {friend.iconUrl && <img src={friend.iconUrl} />}
                                </div>
                                <p>{friend.username}</p>
                            </div>
                        )}
                        <button 
                            className="add-friend-button"
                            onClick={() => setFormOpen(true)}
                        >+</button>
                    </div>
                    <FriendForm isOpen={formOpen} />
                </div>
            </div>
        </div>
    );
};

export default Friends;
