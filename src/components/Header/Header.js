import "./Header.css";
import logo from "../../assets/img/logo.svg";

const Header = () => {
  return (
    <div>
      <img src={logo} alt="" />
      <button>PERSONNAGES</button>
      <button>COMICS</button>
      <button>FAVORIS</button>
    </div>
  );
};

export default Header;
