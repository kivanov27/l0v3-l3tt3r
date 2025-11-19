import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import KrisView from "./components/KrisView";
import { User, type MessageEntry, type NewMessageEntry } from './types';
import { getAllMessages, createMessage } from './services/messageService';
import { useEffect, useState } from 'react';
import LoginPage from './components/LoginPage';

const App = () => {
    const [messages, setMessages] = useState<MessageEntry[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const [from, setFrom] = useState<string>('');
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
        fetchMessages();
    }, [messages]);

    const addMessage = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const msgToAdd: NewMessageEntry = { from, message: newMessage };
        setNewMessage("");
        createMessage(msgToAdd);
        fetchMessages();
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage setUser={setUser} />} />
                <Route 
                    path="/chat" 
                    element={
                        <KrisView 
                            messages={messages} 
                            newMessage={newMessage}
                            setNewMessage={setNewMessage} 
                            setFrom={setFrom} 
                            addMessage={addMessage} 
                        />
                    } 
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
