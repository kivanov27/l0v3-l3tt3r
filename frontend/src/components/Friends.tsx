import { useEffect, useState } from "react";
import { getUser, updateUser } from "../services/userService";
import type { User } from "../types";
import FriendForm from "./FriendForm";
import homeIcon from "../assets/home.png";
import savedIcon from "../assets/saved.png";
import settingsIcon from "../assets/settings.png";
import logoutIcon from "../assets/logout.png";
import { useNavigate } from "react-router-dom";

interface FriendsProps {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    setRecipient: React.Dispatch<React.SetStateAction<User | null>>;
    logOut: () => void;
}

const Friends = ({ user, setUser, setRecipient, logOut }: FriendsProps) => {
    const [friends, setFriends] = useState<User[]>();
    const [requests, setRequests] = useState<User[]>();
    const [formOpen, setFormOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchFriends = () => {
            setFriends(user.friends as User[]);
        }
        const fetchRequests = () => {
            setRequests(user.requests as User[]);
        }
        fetchFriends();
        fetchRequests();
    }, [user.friends, user.requests]);

    const acceptRequest = async (userId: string) => {
        const newUser = {
            ...user,
            friends: user.friends?.map(f => f.id).concat(userId),
            requests: user.requests?.map(r => r.id).filter(id => id !== userId)
        };
        const updatedUser = await updateUser(user.id, newUser);
        setUser(updatedUser);

        const userFrom = await getUser(userId);
        const newUserFrom = {
            ...userFrom,
            friends: userFrom.friends?.map(f => f.id).concat(updatedUser.id),
            requests: userFrom.requests?.map(r => r.id)
        };
        await updateUser(userId, newUserFrom);
        
        // setRequests(requests?.filter(r => r.id !== userId));
    };

    const declineRequest = async (userId: string) => {
        const newUser = {
            ...user,
            friends: user.friends?.map(f => f.id),
            requests: user.requests?.map(r => r.id).filter(id => id !== userId)
        };
        const updatedUser = await updateUser(user.id, newUser);
        setUser(updatedUser);
    };

    const openChat = (friend: User) => {
        setRecipient(friend);
        navigate('/chat');
    };

    return (
        <div className="container">
            <div className="box">
                <div className="widget-container">
                    <img src={homeIcon} className="clickable" />
                    <img src={savedIcon} className="clickable" />
                    <img src={settingsIcon} className="clickable" />
                    <img src={logoutIcon} className="clickable" onClick={logOut} />
                </div>
                <div className="friends-container">
                    <h1>Friends</h1>
                    <div className="friends">
                        {friends && friends.map(friend =>
                            <div key={friend.username} className="friend">
                                <div 
                                    className="friend-img-container"
                                    style={{ backgroundColor: friend.bgColor }}
                                    onClick={() => openChat(friend)}
                                >
                                    {friend.iconUrl && <img src={friend.iconUrl} />}
                                </div>
                                <p className="friend-name">{friend.username}</p>
                            </div>
                        )}
                    </div>
                    <div className="requests">
                        <h3 className="requests-title">Friend requests</h3>
                        {requests && requests.map(req =>
                            <div className="request" key={req.id}>
                                <p>{req.username}</p>
                                <button onClick={() => acceptRequest(req.id)}>
                                    accept
                                </button>
                                <button onClick={() => declineRequest(req.id)}>
                                    deny
                                </button>
                            </div>
                        )}
                    </div>
                    <button
                        className="add-friend-button clickable"
                        onClick={() => setFormOpen(true)}
                    >
                        +
                    </button>
                    <FriendForm user={user} isOpen={formOpen} setIsOpen={setFormOpen} />
                </div>
            </div>
        </div>
    );
};

export default Friends;
