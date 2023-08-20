import React from "react";
import NavLinksContainer from "./NavLinksContainer";
import NavPrompt from "./NavPrompt";
import NewChatTab from "./NewChatTab";
import HomePageTab from "./HomePageTab";

const NavContent = ({ chatLog, setChatLog, setShowMenu, setAppID }) => {
  return (

    <>
      <HomePageTab setChatLog={setChatLog} setShowMenu={setShowMenu} setAppID={setAppID}/>
      <NewChatTab setChatLog={setChatLog} setShowMenu={setShowMenu} />
      {/* <div className="navPromptWrapper">
        {chatLog.map(
          (chat, idx) =>
            chat.botMessage && (
              <NavPrompt chatPrompt={chat.chatPrompt} key={idx} />
            )
        )}
      </div> */}
      <NavLinksContainer chatLog={chatLog} setChatLog={setChatLog} setAppID={setAppID} />
    </>
  );
};

export default NavContent;
