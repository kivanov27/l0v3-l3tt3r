import { useState } from "react";
import { login } from "../services/loginService";
import type { User } from "../types";
import { useNavigate } from "react-router-dom";
import { setToken } from "../services/messageService";

interface LoginPageProps {
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    fetchMessages: () => void;
}

const LoginPage = ({ setUser, fetchMessages }: LoginPageProps) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const navigate = useNavigate();

    const handleLogin = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        try {
            const user = await login({ username, password });
            window.localStorage.setItem('loveLetterUser', JSON.stringify(user));
            setToken(user.token);
            setUser(user);
            fetchMessages();
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
                <div className="credentials-group">
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
                </div>
                <div className="credentials-group">
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
                </div>
                <button 
                    type="submit" 
                    className="credentials-button"
                >
                    login
                </button>
                <button 
                    type="button"
                    className="credentials-button"
                    onClick={() => navigate('/register')}
                >
                    register
                </button>
                <p className="error-message">
                    {errorMessage}
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
