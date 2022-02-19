import "./Header.css";
import "../../index.css";
import logo from "../../assets/img/logo.svg";
// import { useState } from "react";
import { useNavigate } from "react-router";

const Header = () => {
  // const [search, setSearch] = useState();
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="logo-img">
        <img src={logo} alt="" />
      </div>
      <div className="btn-header">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          PERSONNAGES
        </button>
        <button
          onClick={() => {
            navigate("/comics");
          }}
        >
          COMICS
        </button>
        <button>FAVORIS</button>
        {/* <button>SIGN IN</button>
        <button>SIGN UP</button> */}
      </div>
      {/* <input
        type="text"
        placeholder="Recherche"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      /> */}
    </div>
  );
};

export default Header;
