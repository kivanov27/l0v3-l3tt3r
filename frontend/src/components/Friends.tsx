import { useState } from "react";
import type { User } from "../types";

const Friends = () => {
    const [friends, setFriends] = useState<User[]>();
    const [formOpen, setFormOpen] = useState<boolean>(false);

    return (
        <div>
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
        </div>
    );
};

export default Friends;
