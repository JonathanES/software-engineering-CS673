import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from "./components/headerComponent/header";
import Footer from "./components/footerComponent/footer";
import Homepage from "./components/pages/homepage";
import Settings from "./components/pages/setting";
import Logout from "./components/pages/logout";
import Projectform from "./components/pages/projectForm";
import Projecttemplate from "./components/pages/projectTemplate";
import "./assets/css/styles.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={Homepage} />
          <Route exact path="/Settings" component={Settings} />
          <Route exact path="/Logout" component={Logout} />
          <Route exact path="/Projectform" component={Projectform} />
          <Route exact path="/Projecttemplate" component={Projecttemplate} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
