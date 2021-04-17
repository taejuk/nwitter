import { authService, dbService } from "fbInstance";
import React, { useEffect, useState } from "react";

const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = async () => {
    await authService.signOut();
  };
  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createAt")
      .get();
    console.log(nweets.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyNweets();
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({ displayName: newDisplayName });
      refreshUser();
    }
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Enter the display name"
          value={newDisplayName}
          onChange={onChange}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>LogOut</button>
    </>
  );
};
export default Profile;
