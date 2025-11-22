import { useState } from "react";

interface FriendFormProps {
    isOpen: boolean;
}

const FriendForm = ({ isOpen }: FriendFormProps) => {
    const [username, setUsername] = useState<string>('');

    const findFriend = () => {
        console.log(username);
    }

    return (
        <form className="friend-form" onSubmit={findFriend}>
            <label>username: </label>
            <input type="text" onChange={({ target }) => setUsername(target.value)} />
            <button type="submit">add friend</button>
        </form>
    );
};

export default FriendForm;
