import React, { useEffect, useRef, useState } from "react";
import IntroSection from "../components/IntroSection";
import Profile from "../components/Profile";
import NavContent from "../components/NavContent";
import ChatLogWrapper from "../components/ChatLogWrapper";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase.config.js";
import { domainUrl } from "../domain.config.js";

const Home = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [inputPrompt, setInputPrompt] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [err, setErr] = useState(false);
  const [responseFromAPI, setReponseFromAPI] = useState(false);
  const [message, setMessage] = useState("");
  const [appID, setAppID] = useState(0);
  const [userToken, setUserToken] = useState(0);
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userCustomerId, setUserCustomerId] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const chatLogRef = useRef(null);
  // console.log("Home init")

  const fetchUserToken = async () => {
    const currentUser = auth.currentUser;
    // console.log(currentUser.uid)
    setUserId(currentUser.uid)

    const userRef = doc(db, "userInfo", currentUser.uid);
    try {
      const userSnapshot = await getDoc(userRef);
      const token = userSnapshot.data().token;
      setUserToken(token)
      // console.log(token)
    } catch (error) {
      console.error("Error updating token cost:", error);
    }
  };


  const updateTokenCost = async (tokenCost) => {
    const currentUser = auth.currentUser;
    // console.log(currentUser.uid)

    setUserId(currentUser.uid)

    const userRef = doc(db, "userInfo", currentUser.uid);
    try {
      const userSnapshot = await getDoc(userRef);
      const token = userSnapshot.data().token;
      // check if token-tokenCost is NaN 
      if (isNaN(token - tokenCost) || isNaN(tokenCost)) {
        // console.log("Token cost is NaN");
      } else {
        await updateDoc(userRef, {
          token: token - tokenCost
        });
        setUserToken(token - tokenCost)
        // console.log("Token cost updated successfully");
      }
    } catch (error) {
      console.error("Error updating token cost:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!responseFromAPI) {
      if (inputPrompt.trim() !== "") {
        // Set responseFromAPI to true before making the fetch request
        setReponseFromAPI(true);
        setChatLog([...chatLog, { chatPrompt: inputPrompt }]);

        callAPI();
        e.target.querySelector("input").blur();
      }

      async function callAPI() {
        // console.log("inputPrompt", inputPrompt);
        const access_token = JSON.parse(localStorage.getItem("user")).stsTokenManager.accessToken
        // console.log("access_token", access_token)
        await fetchUserToken()
        if (userToken > 500) {
          try {
            // const response = await fetch("https://minibothub.com/api/openai", {
            const response = await fetch(domainUrl + "/python/api/openai", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ app_id: appID, chatLog: chatLog, chatPrompt: inputPrompt }),
            });
            const data = await response.json();
            // console.log("data", data)
            setChatLog(data.chatLog);
            // console.log("tokenCost", data.tokenCost)
            await updateTokenCost(data.tokenCost);

            setErr(false);
          } catch (err) {
            setErr(err);
            // console.log(err);
          }
        } else {
          // console.log(userToken)
          try {
            throw new Error("not enough token");
          }
          catch (err) {
            setErr(err);
            // console.log(err);
          }

        }
        //  Set responseFromAPI back to false after the fetch request is complete
        setReponseFromAPI(false);
      }
    }

    setInputPrompt("");
  };

  useEffect(() => {
    // console.log("Home useeffect");
    const fetchUserToken = async () => {
      const currentUser = auth.currentUser;
      // console.log(currentUser.uid)
      setUserId(currentUser.uid)

      const userRef = doc(db, "userInfo", currentUser.uid);
      try {
        const userSnapshot = await getDoc(userRef);
        const token = userSnapshot.data().token;
        setUserToken(token)
        // console.log(token)
      } catch (error) {
        console.error("Error updating token cost:", error);
      }
    };
    fetchUserToken()

    if (chatLogRef.current) {
      chatLogRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }



    return () => { };
  }, []);

  return (
    <>
      <header>
        <div className="menu">
          <button onClick={() => setShowMenu(true)}>
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="#d9d9e3"
              strokeLinecap="round"
            >
              <path d="M21 18H3M21 12H3M21 6H3" />
            </svg>
          </button>
        </div>
        <h1>TalkBot</h1>
      </header>

      {showMenu && (
        <nav>
          <div className="navItems">
            <NavContent
              chatLog={chatLog}
              setChatLog={setChatLog}
              setShowMenu={setShowMenu}
              setAppID={setAppID}
            />
          </div>
          <div className="navCloseIcon">
            <svg
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              xmlSpace="preserve"
              stroke="#fff"
              width={42}
              height={42}
              onClick={() => setShowMenu(false)}
            >
              <path d="m53.691 50.609 13.467-13.467a2 2 0 1 0-2.828-2.828L50.863 47.781 37.398 34.314a2 2 0 1 0-2.828 2.828l13.465 13.467-14.293 14.293a2 2 0 1 0 2.828 2.828l14.293-14.293L65.156 67.73c.391.391.902.586 1.414.586s1.023-.195 1.414-.586a2 2 0 0 0 0-2.828L53.691 50.609z" />
            </svg>
          </div>
        </nav>
      )}

      <aside className="sideMenu">
        <NavContent
          chatLog={chatLog}
          setChatLog={setChatLog}
          setShowMenu={setShowMenu}
          setAppID={setAppID}
        />
      </aside>

      <section className="chatBox">
        {chatLog.length > 0 ? (
          <ChatLogWrapper chatLog={chatLog} chatLogRef={chatLogRef} err={err} />
        ) : (
          appID !== -1 ? (<IntroSection message={message} setMessage={setMessage} appID={appID} setAppID={setAppID} />) : (
            <Profile setButtonClicked={setButtonClicked} 
              buttonClicked={buttonClicked}
              setUserCustomerId = {setUserCustomerId}
              userCustomerId={userCustomerId} 
              setUserId={setUserId} 
              userId={userId} 
              setUserEmail={setUserEmail} 
              userEmail={userEmail} 
              setUserToken={setUserToken} 
              userToken={userToken} />
          )

        )}
        {appID !== 0 && appID !== -1 && (
          <form onSubmit={handleSubmit}>
            <div className="inputPromptWrapper">
              <input
                name="inputPrompt"
                id=""
                className="inputPrompttTextarea"
                type="text"
                rows="1"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                autoFocus
              ></input>
              <button aria-label="form submit" type="submit">
                <svg
                  fill="#ADACBF"
                  width={15}
                  height={20}
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#212023"
                  strokeWidth={0}
                >
                  <title>{"submit form"}</title>
                  <path
                    d="m30.669 1.665-.014-.019a.73.73 0 0 0-.16-.21h-.001c-.013-.011-.032-.005-.046-.015-.02-.016-.028-.041-.05-.055a.713.713 0 0 0-.374-.106l-.05.002h.002a.628.628 0 0 0-.095.024l.005-.001a.76.76 0 0 0-.264.067l.005-.002-27.999 16a.753.753 0 0 0 .053 1.331l.005.002 9.564 4.414v6.904a.75.75 0 0 0 1.164.625l-.003.002 6.259-4.106 9.015 4.161c.092.043.2.068.314.068H28a.75.75 0 0 0 .747-.695v-.002l2-27.999c.001-.014-.008-.025-.008-.039l.001-.032a.739.739 0 0 0-.073-.322l.002.004zm-4.174 3.202-14.716 16.82-8.143-3.758zM12.75 28.611v-4.823l4.315 1.992zm14.58.254-8.32-3.841c-.024-.015-.038-.042-.064-.054l-5.722-2.656 15.87-18.139z"
                    stroke="none"
                  />
                </svg>
              </button>
            </div>
          </form>
        )}
      </section>
    </>
  );
};

export default Home;
