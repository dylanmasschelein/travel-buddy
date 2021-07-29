import "./App.scss";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import Register from "./components/Register";
import Login from "./components/Login";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps,
} from "react-router-dom";

const App: React.FC = () => {
  const [user, setUser] = useState<any | null>(null);
  console.log(user);
  useEffect(() => {}, [user]);

  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/' exact component={HomePage} />

        <Route
          path='/profile'
          render={(props: RouteComponentProps<any>) => (
            <ProfilePage {...props} user={user} />
          )}
        />

        <Route path='/register' component={Register} />
        <Route
          path='/login'
          render={(props: RouteComponentProps<any>) => (
            <Login {...props} setUser={setUser} />
          )}
        />
      </Switch>
    </Router>
  );
};

export default App;
