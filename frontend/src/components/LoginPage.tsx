import { useState } from "react";
import { login } from "../services/loginService";
import type { User } from "../types";

interface LoginPageProps {
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

const LoginPage = ({ setUser }: LoginPageProps) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleLogin = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        try {
            const user = await login({ username, password });
            setUser(user);
            setUsername('');
            setPassword('');
        }
        catch (error: unknown) {
            setErrorMessage("Wrong credentials." + error);
        }
    };

    return (
        <div className="credentials-page">
            <form 
                onSubmit={handleLogin} 
                className="credentials-form"
            >
                <label 
                    htmlFor="username" 
                    className="credentials-label"
                >
                    username:
                </label>
                <input 
                    id="username" 
                    type="text" 
                    onChange={({ target }) => setUsername(target.value)} 
                    className="credentials-input"
                />
                <label 
                    htmlFor="password"
                    className="credentials-label"
                >
                    password:
                </label>
                <input 
                    id="password" 
                    type="password" 
                    onChange={({ target }) => setPassword(target.value)} 
                    className="credentials-input"
                />
                <button 
                    type="submit" 
                    className="btn-submit"
                >
                    login
                </button>
                <p className="error-message">
                    {errorMessage}
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
