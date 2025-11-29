import type { User } from "../types";
import SideMenu from "./SideMenu";
import { updateUser } from "../services/userService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SettingsProps {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Settings = ({ user, setUser }: SettingsProps) => {
    const [iconUrl, setIconUrl] = useState<string>('');
    const [bgColor, setBgColor] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        if (user.iconUrl) {
            setIconUrl(user.iconUrl);
        }
        if (user.bgColor) {
            setBgColor(user.bgColor);
        }
    }, [user.iconUrl, user.bgColor]);

    const update = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const newUser = {
            ...user,
            iconUrl,
            bgColor,
            friends: user.friends?.map(f => f.id),
            requests: user.requests?.map(r => r.id)
        }
        const updatedUser = await updateUser(user.id, newUser);
        setUser(updatedUser);
        navigate('/');
    };

    return (
        <div className="container">
            <div className="box">
                <SideMenu setUser={setUser} />
                <form className="friends-container settings-container" onSubmit={update}>
                    <h1>settings</h1>
                    <div className="settings-input">
                        <label htmlFor="user-iconUrl">icon url</label>
                        <input 
                            id="user-iconUrl"
                            type="text" 
                            value={iconUrl}
                            onChange={({ target }) => setIconUrl(target.value)}
                        />
                    </div>
                    <div className="settings-input">
                        <label htmlFor="user-bgColor">background color</label>
                        <input 
                            id="user-bgColor"
                            type="text" 
                            value={bgColor}
                            onChange={({ target }) => setBgColor(target.value)}
                        />
                    </div>
                    <button type="submit">save</button>
                </form>
            </div>
        </div>
    );
};

export default Settings;
