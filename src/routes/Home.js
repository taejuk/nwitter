import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import { dbService, storageService } from "fbInstance";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const Home = ({ userObj: user }) => {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetsArray = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => (a.createAt < b.createAt ? -1 : 1));
      setNweets(nweetsArray);
    });
  }, []); // nweets가 등록될 때마다 실행해야 한다.

  return (
    <div>
      <NweetFactory userObj={user} />
      {nweets.map((nweet) => (
        <Nweet
          nweetObj={nweet}
          key={nweet.id}
          isOwner={user.uid === nweet.creatorId}
        />
      ))}
    </div>
  );
};
export default Home;
