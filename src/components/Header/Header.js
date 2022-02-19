import "./Header.css";
import "../../index.css";
import logo from "../../assets/img/logo.svg";
import { useState } from "react";

const Header = () => {
  // const [search, setSearch] = useState();
  return (
    <div className="header">
      <div className="logo-img">
        <img src={logo} alt="" />
      </div>
      <div className="btn-header">
        <button>PERSONNAGES</button>
        <button>COMICS</button>
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
