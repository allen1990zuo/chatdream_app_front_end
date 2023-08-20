import React from "react";

const HomePageTab = ({ setChatLog, setShowMenu, setAppID }) => {
  return (
    <div
      className="sideMenuButton"
      onClick={() => {
        setChatLog([]);
        setAppID(0);
        setShowMenu(false);
      }}
    >
      Home Page
    </div>
  );
};

export default HomePageTab;
