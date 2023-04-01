import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import NewUser from "./pages/NewUser";
import Password from "./pages/Password";
import MainPage from "./pages/MainPage";
import WatchVideos from "./pages/WatchVideos";
import Privete from "./pages/Privete";
import PageFake from "./pages/PageFake";
import PriveteFake from "./pages/PrivateFake";

function App() {
  return (
   <div>
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/about" component={ MainPage } />
      <Route path="/privacy-policy" component={ PrivacyPolicy } />
      <Route path="/terms" component={ TermsOfUse } />
      <Route path="/new-user" component={ NewUser } />
      <Route path="/watchVieos" component={ WatchVideos } />
      <Route path="/password" component={ Password } />
      <Route path="/simulation/:id" render={ (props) => <PageFake { ...props } /> } />
      <Route path="/privete" component={ Privete } />
      <Route path="/privete-simulation/:id" render={ (props) => <PriveteFake { ...props } /> } />
    </Switch>
   </div>
  );
}

export default App;
