import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const NavLinks = ({ svg, link, text, setChatLog, setAppID }) => {
  const { dispatch } = useContext(AuthContext);

  const handleClick = async (text) => {
    if (text === "Clear Conversations") setChatLog([]);
    if (text === "Profile") { setChatLog([]); setAppID(-1);  }
    if (text === "Log out") {
      try {
        let logOut = await signOut(auth);
        // console.log("logOut", logOut);
        dispatch({ type: "LOGOUT" });
      } catch (error) {
        // console.log("error happen during sign out", error);
      }
    }
  };

  return (
    <Link
      to={link}
      target={link && "_blank"}
      rel="noreferrer"
      style={{ textDecoration: "none" }}
      onClick={() => handleClick(text)}
    >
      <div className="navPrompt">
        {svg}
        <p>{text}</p>
      </div>
    </Link>
  );
};

export default NavLinks;
