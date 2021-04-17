import React, { useState } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";
const AppRouter = ({ isLogged, userObj, refreshUser }) => {
  return (
    <Router>
      {isLogged && <Navigation userObj={userObj} />}
      <Switch>
        {isLogged ? (
          <>
            <Route path="/" exact={true}>
              <Home userObj={userObj} />
            </Route>
            <Route path="/profile" exact={true}>
              <Profile userObj={userObj} refreshUser={refreshUser} />
            </Route>
          </>
        ) : (
          <>
            <Route path="/" exact={true}>
              <Auth />
            </Route>
            <Redirect from="*" to="/" />
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
