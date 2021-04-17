import { dbService, storageService } from "fbInstance";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const NweetFactory = ({ userObj: user }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${user.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const dbNweet = {
      text: nweet,
      createAt: Date.now(),
      creatorId: user.uid,
      attachmentUrl,
    };
    const data = await dbService.collection("nweets").add(dbNweet);

    setNweet("");
    setAttachment("");
  };

  const onChange = (e) => {
    const {
      target: { value, name },
    } = e;
    if (name === "nweet") {
      setNweet(value);
    }
  };
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        target: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearClick = (e) => {
    setAttachment(null);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          maxLength={120}
          placeholder="what's on your mind?"
          name="nweet"
          onChange={onChange}
          value={nweet}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" required />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" alt="loading..." />
            <button onClick={onClearClick}>Clear</button>
          </div>
        )}
      </form>
    </>
  );
};

export default NweetFactory;
