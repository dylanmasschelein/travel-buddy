import "./App.scss";
import Header from "./components/Header";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import Register from "./components/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/profile' component={ProfilePage} />
        <Route path='/register' component={Register} />
      </Switch>
    </Router>
  );
};

export default App;
