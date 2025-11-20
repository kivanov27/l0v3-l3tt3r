import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/userService";

const RegistrationPage = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const navigate = useNavigate();

    const handleRegistration = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!username || !password) {
            setErrorMessage("Missing username or password");
        }
        else {
            await createUser({ username: username, password: password });
            navigate('/');
        }
    };

    return (
        <div className="credentials-page">
            <form 
                onSubmit={handleRegistration} 
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
                    register
                </button>
                <button 
                    type="button"
                    className="credentials-button"
                    onClick={() => navigate('/')}
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

export default RegistrationPage;
