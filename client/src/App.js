import "./App.scss";
import Header from "./components/Header";
import BlogPage from "./components/pages/BlogPage";
import HomePage from "./components/pages/HomePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/profile' component={BlogPage} />
      </Switch>
    </Router>
  );
}

export default App;
