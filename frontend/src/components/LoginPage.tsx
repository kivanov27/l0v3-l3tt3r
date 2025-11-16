import { useState } from "react";

const LoginPage = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <div>
            <label htmlFor="username">username:</label>
            <input id="username" type="text" onChange={({ target }) => setUsername(target.value)} />
            <label htmlFor="password">password:</label>
            <input id="password" type="password" onChange={({ target }) => setPassword(target.value)} />
        </div>
    );
};

export default LoginPage;
