import { dbService, storageService } from "fbInstance";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("are you sure you delete this?");
    console.log(ok);
    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      await storageService.refFromURL(nweetObj.attachmentUrl).delete();
    }
  };
  const toggleEdit = () => setEditing((prev) => !prev);
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewNweet(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({ text: newNweet });
    setEditing(false);
  };
  return (
    <div key={nweetObj.id}>
      {editing ? (
        <form onSubmit={onSubmit}>
          <input type="text" value={newNweet} onChange={onChange} />
          <input type="submit" value="Edit" />
        </form>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} alt={nweetObj.id} />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEdit}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
