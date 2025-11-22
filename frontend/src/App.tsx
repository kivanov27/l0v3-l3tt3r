import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from './components/Chat';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import type { User, MessageEntry, NewMessageEntry } from './types';
import { getAllMessages, createMessage, setToken } from './services/messageService';
import { useEffect, useState } from 'react';

const App = () => {
    const [messages, setMessages] = useState<MessageEntry[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const [user, setUser] = useState<User | null>(null);

    const fetchMessages = async () => {
        const fetchedMessages = await getAllMessages();
        const parsedMessages = fetchedMessages.map(m => ({
            ...m,
            date: m.date ? new Date(m.date) : undefined
        }));
        setMessages(parsedMessages);
    };

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loveLetterUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            setToken(user.token);
            fetchMessages();
        }
    }, [messages]);

    const addMessage = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (user) {
            const msgToAdd: NewMessageEntry = { from: user.username, to: '', message: newMessage }; // CHANGE TO
            setNewMessage("");
            createMessage(msgToAdd);
            fetchMessages();
        }
        else {
            console.error("No user.");
        }
    };

    const logOut = () => {
        window.localStorage.removeItem('loveLetterUser');
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    user ? <Chat user={user} messages={messages} newMessage={newMessage} setNewMessage={setNewMessage} addMessage={addMessage} logOut={logOut} />
                        : <LoginPage setUser={setUser} fetchMessages={fetchMessages} />
                } />
                <Route path="/register" element={<RegistrationPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
