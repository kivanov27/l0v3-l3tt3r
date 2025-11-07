import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CharPick from "./components/CharPick";
import VigziView from "./components/VigziView";
import KrisView from "./components/KrisView";
import type { MessageEntry, NewMessageEntry } from './types';
import { getAllMessages, createMessage } from './services/messageService';
import { useEffect, useState } from 'react';

const App = () => {
    const [messages, setMessages] = useState<MessageEntry[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const [from, setFrom] = useState<string>('');

    useEffect(() => {
        const fetchMessages = async () => {
            const fetchedMessages = await getAllMessages();
            const parsedMessages = fetchedMessages.map(m => ({
                ...m,
                date: m.date ? new Date(m.date) : undefined
            }));
            setMessages(parsedMessages);
        };
        fetchMessages();
    }, []);

    const addMessage = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const msgToAdd: NewMessageEntry = { from, message: newMessage };
        createMessage(msgToAdd);
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CharPick />} />
                <Route 
                    path="/vigzi" 
                    element={
                        <VigziView 
                            messages={messages} 
                            newMessage={newMessage}
                            setNewMessage={setNewMessage} 
                            setFrom={setFrom} 
                            addMessage={addMessage} 
                        />
                    } 
                />
                <Route 
                    path="/kris" 
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
