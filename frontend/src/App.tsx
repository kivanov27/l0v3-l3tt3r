import './App.css'
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Chat from './components/Chat';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import Friends from './components/Friends';
import type { User, MessageEntry } from './types';
import { getAllMessages, setToken } from './services/messageService';
import { getUser } from './services/userService';

const App = () => {
    const [user, setUser] = useState<User | null>(null);
    const [messages, setMessages] = useState<MessageEntry[]>([]);
    // const [newMessage, setNewMessage] = useState<string>('');

    const fetchMessages = async () => {
        const fetchedMessages = await getAllMessages();
        const parsedMessages = fetchedMessages.map(m => ({
            ...m,
            date: m.date ? new Date(m.date) : undefined
        }));
        setMessages(parsedMessages);
    };

    const fetchUser = async (id: string) => {
        const user = await getUser(id);
        setUser(user);
    };

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loveLetterUser');
        if (loggedUserJSON) {
            const userToken = JSON.parse(loggedUserJSON);
            setToken(userToken.token);
            fetchUser(userToken.id);
            fetchMessages();
        }
    }, []);

    // const addMessage = (event: React.SyntheticEvent) => {
    //     event.preventDefault();
    //     if (user) {
    //         const msgToAdd: NewMessageEntry = { from: user.username, to: '', message: newMessage }; // CHANGE TO
    //         setNewMessage("");
    //         createMessage(msgToAdd);
    //         fetchMessages();
    //     }
    //     else {
    //         console.error("No user.");
    //     }
    // };

    const logOut = () => {
        setUser(null);
        window.localStorage.removeItem('loveLetterUser');
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    user ? <Friends user={user} setUser={setUser} logOut={logOut} />
                        : <LoginPage setUser={setUser} fetchMessages={fetchMessages} />
                } />
                {/* <Route path="/" element={ */}
                {/*     user ? <Chat user={user} messages={messages} newMessage={newMessage} setNewMessage={setNewMessage} addMessage={addMessage} logOut={logOut} /> */}
                {/*         : <LoginPage setUser={setUser} fetchMessages={fetchMessages} /> */}
                {/* } /> */}
                <Route path="/register" element={<RegistrationPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
