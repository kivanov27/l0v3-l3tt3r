import './App.css'
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import Friends from './components/Friends';
import Chat from './components/Chat';
import Settings from './components/Settings';
import type { User } from './types';
import { setToken } from './services/messageService';
import { getUser } from './services/userService';
import SavedMessages from './components/SavedMessages';

const App = () => {
    const [user, setUser] = useState<User | null>(null);
    const [recipient, setRecipient] = useState<User | null>(null);
    // it's a good idea to make chat route id based and avoid having to store recipient state

    useEffect(() => {
        const fetchUser = async (id: string) => {
            const user = await getUser(id);
            setUser(user);
        };

        const loggedUserJSON = window.localStorage.getItem('loveLetterUser');
        if (loggedUserJSON) {
            const userToken = JSON.parse(loggedUserJSON);
            setToken(userToken.token);
            fetchUser(userToken.id);
        }
    }, []);

    const logOut = () => {
        setUser(null);
        window.localStorage.removeItem('loveLetterUser');
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={user ? 
                    <Friends 
                        user={user} 
                        setUser={setUser} 
                        setRecipient={setRecipient}
                        logOut={logOut} 
                    />
                        : 
                    <LoginPage setUser={setUser} />
                } />
                <Route path="/register" element={<RegistrationPage />} />
                {user &&
                    <Route path='/settings' element={
                        <Settings
                            user={user}
                            setUser={setUser}
                        />
                    } />
                }
                {user && recipient &&
                    <Route path="/chat" element={
                        <Chat 
                            user={user} 
                            recipient={recipient} 
                            setUser={setUser}
                        /> 
                    } />
                }
                {user && recipient &&
                    <Route path='/saved' element={
                        <SavedMessages
                            user={user}
                            recipient={recipient}
                            setUser={setUser}
                        />
                    } />
                }
            </Routes>
        </BrowserRouter>
    );
};

export default App;
