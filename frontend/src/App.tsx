import './App.css'
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import Friends from './components/Friends';
import Chat from './components/Chat';
import type { User, MessageEntry, NewMessageEntry } from './types';
import { getAllMessages, setToken, createMessage } from './services/messageService';
import { getUser } from './services/userService';

const App = () => {
    const [user, setUser] = useState<User | null>(null);
    const [recipient, setRecipient] = useState<User | null>(null);
    const [messages, setMessages] = useState<MessageEntry[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');

    useEffect(() => {
        const fetchUser = async (id: string) => {
            const user = await getUser(id);
            setUser(user);
        };

        const fetchMessages = async () => {
            if (user && recipient) {
                const fetchedMessages = await getAllMessages(user.username, recipient.username);
                const parsedMessages = fetchedMessages.map(m => ({
                    ...m,
                    date: m.date ? new Date(m.date) : undefined
                }));
                setMessages(parsedMessages);
            }
            else {
                console.error("You somehow got here without a user or recipient");
            }
        };

        const loggedUserJSON = window.localStorage.getItem('loveLetterUser');
        if (loggedUserJSON) {
            const userToken = JSON.parse(loggedUserJSON);
            setToken(userToken.token);
            fetchUser(userToken.id);
            fetchMessages();
        }
    }, [user, recipient]);

    const addMessage = (event: React.SyntheticEvent) => { 
        event.preventDefault();
        if (user && recipient) {
            const msgToAdd: NewMessageEntry = { from: user.username, to: recipient.username, message: newMessage };
            setNewMessage("");
            createMessage(msgToAdd);
            // fetchMessages();
        }
        else {
            console.error("No user or recipient.");
        }
    };

    const logOut = () => {
        setUser(null);
        window.localStorage.removeItem('loveLetterUser');
    }

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
                {user && recipient &&
                    <Route path="/chat" element={
                        <Chat 
                            user={user} 
                            recipient={recipient} 
                            messages={messages} 
                            newMessage={newMessage} 
                            setNewMessage={setNewMessage} 
                            addMessage={addMessage} 
                            logOut={logOut}
                        /> 
                    } />
                }
            </Routes>
        </BrowserRouter>
    );
};

export default App;
