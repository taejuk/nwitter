import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbInstance";

function App() {
  const [init, setInit] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [userObj, setUserObj] = useState(null);
  //firebase가 초기화할 때까지 기다려주는 것이다.
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLogged(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setIsLogged(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    console.log(authService.currentUser.displayName);
    setUserObj(authService.currentUser);
  };

  return (
    <div>
      {init ? (
        <AppRouter
          isLogged={isLogged}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        "initializing..."
      )}
    </div>
  );
}

export default App;
