import BotResponse from "./BotResponse";
import React, { useEffect } from "react";

const IntroSection = ({ message, setMessage, appID, setAppID }) => {

  const defaultMessage = (
    <>
      <h1>
        <BotResponse response="Introducing miniBotHub" showButton={false} />
      </h1>

      <h2>miniBotHub is a platform for chatGPT-based AI chatbot</h2>
      Apps:
      <ul>
        <li>
          <button onClick={() => { setMessage(dreamMessage); setAppID(1); }}>
            Dream Interpretor
          </button>
        </li>
        <li>
          <button onClick={() => { setMessage(tarotMessage); setAppID(2); }}>
            Tarot Reading
          </button>
        </li>
      </ul>
    </>
  );

  const dreamMessage = (
    <>
      <h1>
        Dream Interpretor
      </h1>
      <h2>Hello, I am your Dream interpreter, please tell me your dream. You may use your own languge.</h2>
      <h2>Please start with your question, skip the "hello" and "hi" part.</h2>
      <h2>For example, I dream about my grandfather, what does that mean?</h2>
      <h2>For example, 我梦到我在过马路的时候一只黑猫在我面前走过 这代表了什么？</h2>
    </>
  );
  const tarotMessage = (
    <>
      <h1>
        Tarot Reading
      </h1>
      <h2>Hello, I am your Tarot interpreter, please tell me your question. You may use your own languge.</h2>
      <h2>Please start with your question, skip the "hello" and "hi" part.</h2>
      <h2>For example, Will I find love in the near future?</h2>
      <h2>For example, 我现在有一个去外地的工作机会 我应该接受吗？</h2>
    </>
  );

  useEffect(() => {
    if (appID === 1) {
      setMessage(dreamMessage);
    } else if (appID === 2) {
      setMessage(tarotMessage);
    } else {
      setMessage(defaultMessage);
    }
  }, [appID]);

  return <div id="introsection">{message}</div>;
};

export default IntroSection;