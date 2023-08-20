import React, { useRef, useEffect } from "react";
import Avatar from "./Avatar";
import BotResponse from "./BotResponse";
import Loading from "./Loading";
import Error from "../components/Error";
import SvgComponent from "../components/SvgComponent";

const ChatLogWrapper = ({ chatLog, chatLogRef, err }) => {
  return (
    <div className="chatLogWrapper">
      {chatLog.length > 0 &&
        chatLog.map((chat, idx) => (
          <div
            className="chatLog"
            key={idx}
            ref={chatLogRef}
            id={`navPrompt-${chat.chatPrompt.replace(/[^a-zA-Z0-9]/g, "-")}`}
          >
            <div className="chatPromptMainContainer">
              <div className="chatPromptWrapper">
                <Avatar bg="#5437DB" className="userSVG">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth={1.9}
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    height={40}
                    width={40}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx={12} cy={7} r={4} />
                  </svg>
                </Avatar>
                <div id="chatPrompt">{chat.chatPrompt}</div>
              </div>
            </div>

            <div className="botMessageMainContainer">
              <div className="botMessageWrapper">
                <Avatar bg="#11a27f" className="openaiSVG">
                  <SvgComponent w={41} h={41} />
                </Avatar>
                {chat.botMessage ? (
                  <div id="botMessage">
                    <BotResponse
                      response={"\n\n" + chat.botMessage}
                      chatLogRef={chatLogRef}
                    />
                  </div>
                ) : err ? (
                  <Error err={err} />
                ) : (
                  <Loading />
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChatLogWrapper;