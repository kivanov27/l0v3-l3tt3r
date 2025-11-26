import homeIcon from "../assets/home.png";
import savedIcon from "../assets/saved.png";
import settingsIcon from "../assets/settings.png";
import logoutIcon from "../assets/logout.png";
import { useNavigate } from "react-router-dom";
import type { User } from "../types";

interface SideMenuProps {
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const SideMenu = ({ setUser }: SideMenuProps) => {
    const navigate = useNavigate();

    const logOut = () => {
        setUser(null);
        window.localStorage.removeItem('loveLetterUser');
        navigate('/')
    };

    return (
        <div className="widget-container">
            <img src={homeIcon} className="clickable" onClick={() => navigate('/')} />
            <img src={savedIcon} className="clickable" onClick={() => navigate('/saved')} />
            <img src={settingsIcon} className="clickable" onClick={() => navigate('/settings')} />
            <img src={logoutIcon} className="clickable" onClick={logOut} />
        </div>
    );
};

export default SideMenu;
