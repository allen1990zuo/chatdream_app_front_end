import React from "react";

const NewChatTab = ({ setChatLog, setShowMenu }) => {
  return (
    <div
      className="sideMenuButton"
      onClick={() => {
        setChatLog([]);
        setShowMenu(false);
      }}
    >
      {/* <span>+</span> */}
      {/* New chat */}
      Clear Converstaion
    </div>
  );
};

export default NewChatTab;
