import { Link } from "react-router-dom";

const CharPick = () => {
  return (
    <div className="charPick-container">
      <Link
        to="/vigzi"
        className="charPick vigzi vigzi-hover"
      >
        Vigzi
      </Link>
      <Link
        to="/kris"
        className="charPick kris"
      >
        Kris
      </Link>
    </div>
  );
};

export default CharPick;
