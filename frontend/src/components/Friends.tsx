import { useEffect, useState } from "react";
import type { User } from "../types";
import FriendForm from "./FriendForm";
import homeIcon from "../assets/home.png";
import savedIcon from "../assets/saved.png";
import settingsIcon from "../assets/settings.png";
import logoutIcon from "../assets/logout.png";
import { getUser, updateUser } from "../services/userService";

interface FriendsProps {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    logOut: () => void;
}

const Friends = ({ user, setUser, logOut }: FriendsProps) => {
    const [friends, setFriends] = useState<(User)[]>();
    const [formOpen, setFormOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchFriends = () => {
            setFriends(user.friends as User[]);
        }
        fetchFriends();
    }, [user.friends]);

    const acceptRequest = async (userId: string) => {
        const newUser = {
            ...user,
            friends: user.friends?.concat(userId),
            requests: user.requests?.filter(r => r.toString() !== userId)
        };
        const updatedUser = await updateUser(newUser);
        setUser(updatedUser);

        const userFrom = await getUser(userId);
        const newUserFrom = {
            ...userFrom,
            friends: userFrom.friends?.concat(updatedUser.id as string)
        };
        await updateUser(newUserFrom);
    };

    const declineRequest = () => { };

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
                                <div className="friend-img-container">
                                    {friend.iconUrl && <img src={friend.iconUrl} />}
                                </div>
                                <p>{friend.username}</p>
                            </div>
                        )}
                    </div>
                    {user.requests?.length !== 0 &&
                        <div className="requests">
                            <h3 className="requests-title">Friend requests</h3>
                            {user.requests?.map(req =>
                                <div className="request" key={req.toString()}>
                                    <p>{req.toString()}</p>
                                    <button onClick={() => acceptRequest(req.toString())}>accept</button>
                                    <button onClick={declineRequest}>deny</button>
                                </div>
                            )}
                        </div>
                    }
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
