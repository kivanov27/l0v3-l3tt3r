import { useState } from "react";

const RegistrationPage = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <div className="user-form-container">
            <label htmlFor="username">username:</label>
            <input id="username" type="text" onChange={({ target }) => setUsername(target.value)} />
            <label htmlFor="password">password:</label>
            <input id="password" type="password" onChange={({ target }) => setPassword(target.value)} />
            <button>register</button>
        </div>
    );
};

export default RegistrationPage;
