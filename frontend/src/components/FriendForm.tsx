import { useState } from "react";
import { sendFriendRequest } from "../services/friendRequestService";
import type { User } from "../types";

interface FriendFormProps {
    user: User;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FriendForm = ({ user, isOpen, setIsOpen }: FriendFormProps) => {
    const [username, setUsername] = useState<string>('');

    const findFriend = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (user.username) {
            sendFriendRequest(user.username, username);
            setIsOpen(false);
        }
        else {
            console.error("Couldn't send a friend request");
        }
    };

    return (
        <div className={`black-bg ${isOpen ? "visible" : "hidden"}`}>
            <form 
                className="friend-form"
                onSubmit={findFriend}
            >
                <label>username: </label>
                <input type="text" onChange={({ target }) => setUsername(target.value)} />
                <button type="submit">add friend</button>
                <button type="button" onClick={() => setIsOpen(false)}>
                    close
                </button>
            </form>
        </div>
    );
};

export default FriendForm;
