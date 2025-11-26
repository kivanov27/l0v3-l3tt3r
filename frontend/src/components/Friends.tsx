import { useState } from "react";
import { getUser, updateUser } from "../services/userService";
import type { User } from "../types";
import FriendForm from "./FriendForm";
import SideMenu from "./SideMenu";
import { useNavigate } from "react-router-dom";

interface FriendsProps {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    setRecipient: React.Dispatch<React.SetStateAction<User | null>>;
    logOut: () => void;
}

const Friends = ({ user, setUser, setRecipient }: FriendsProps) => {
    const [formOpen, setFormOpen] = useState<boolean>(false);
    const navigate = useNavigate();

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
                <SideMenu setUser={setUser} />
                <div className="friends-container">
                    <h1>chat rooms</h1>
                    <div className="friends">
                        {user.friends && user.friends.map(friend =>
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

                    <button
                        className="add-friend-button clickable"
                        onClick={() => setFormOpen(true)}
                    >
                        +
                    </button>

                    {user.requests && user.requests.length > 0 &&
                        <div className="requests">
                            <h3 className="requests-title">friend requests:</h3>
                            {user.requests.map(req =>
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
                    }

                    <FriendForm user={user} isOpen={formOpen} setIsOpen={setFormOpen} />
                </div>
            </div>
        </div>
    );
};

export default Friends;
