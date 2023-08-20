import BotResponse from "./BotResponse";
import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { auth, goggleAuthProvider, db } from "../firebase.config.js";
import { domainUrl } from "../domain.config.js";

const Profile = ({
  setButtonClicked,
  buttonClicked,
  setUserCustomerId,
  userCustomerId,
  setUserId,
  userId,
  setUserEmail,
  userEmail,
  setUserToken,
  userToken
}

) => {


  const handleRefreshButtonClick = async () => {
    // existing code...
    setButtonClicked(true);
  };

  const handleButtonClick = async () => {
    const access_token = JSON.parse(localStorage.getItem("user")).stsTokenManager.accessToken;
    try {
      const response = await fetch(domainUrl + "/python/api/create-checkout-session", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ quantity: 1, customerId: userCustomerId, userId: userId }),
      });

      const data = await response.json();
      const checkoutUrl = data.checkout_session;
      // console.log(checkoutUrl);
      // console.log({ quantity: 1, customerId: userCustomerId, userId: userId });
      window.location.href = checkoutUrl;
      // window.open(checkoutUrl, "_blank");
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        const email = user.email;
        const userId = user.uid;

        const usersRef = collection(db, "userInfo");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          // console.log("User not found");
          return false;
        } else {
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            const userEmail = userData.email;
            const userCustomerId = userData.customerId;
            const userToken = userData.token;

            setUserId(userId);
            setUserEmail(userEmail);
            setUserCustomerId(userCustomerId);
            setUserToken(userToken);
          });
          // console.log("User found");
          return true;
        }
      } catch (error) {
        console.error("Error checking user by email:", error);
        return false;
      }
    };
    setButtonClicked(false);
    fetchUserData();
  }, [buttonClicked]);

  return (
    <div id="profile">
      <h1>
        <BotResponse response="User Profile" showButton={false} />
      </h1>
      <button onClick={handleRefreshButtonClick}>Refresh</button>
      {/* <p>User ID: {userId}</p> */}
      <p>User Email: {userEmail}</p>
      {/* <p>User Customer ID: {userCustomerId}</p> */}
      <p>User Token: {userToken}</p>
      <button onClick={handleButtonClick}>Buy Token</button>
    </div>
  );
};

export default Profile;