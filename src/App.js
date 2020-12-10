import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import 'antd/dist/antd.css';
import "video-react/dist/video-react.css";
import "plyr/dist/plyr.css";
import "./App.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Browse from "./pages/Browse";
import Help from "./pages/Help";
import PricingPlan from "./pages/PricingPlan";
import WatchLater from "./pages/WatchLater";
import HistoryPage from "./pages/HistoryPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Logout from "./pages/Logout";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import SeriesDetailsPage from "./pages/SeriesDetailsPage";
import WatchMoviePage from "./pages/WatchMoviePage";
import WatchSeriesPage from "./pages/WatchSeriesPage";
import WatchSeasonPage from "./pages/WatchSeasonPage";
import StripePayPage from "./pages/StripePayPage";
import MomoPaymentPage from "./pages/MomoPaymentPage";
import SeasonDetailsPage from "./pages/SeasonDetailsPage";
import SeasonListPage from "./pages/SeasonListPage";
import Footer from "./components/partials/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={LandingPage}/>
          <Route path="/home" exact component={Home}/>
          <Route path="/browse" component={Browse}/>
          <Route path="/help" component={Help}/>
          <Route path="/pricing" component={PricingPlan}/>
          <Route path="/stripe-pay" component={StripePayPage}/>
          <Route path="/momo-pay" component={MomoPaymentPage}/>
          <Route path="/sign-up" component={SignUp}/>
          <Route path="/sign-in" component={SignIn}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/watch-later" component={WatchLater}/>
          <Route path="/history" component={HistoryPage}/>
          <Route path="/season-list/:seriesID" component={SeasonListPage}/>
          <Route path="/movies-details/:movieID" component={MovieDetailsPage}/>
          <Route path="/series-details/:seriesID" component={SeriesDetailsPage}/>
          <Route path="/season-details/:seasonID" component={SeasonDetailsPage}/>
          <Route path="/watch-movie/:movieID" component={WatchMoviePage} exact/>
          <Route path="/watch-series/:seriesID" component={WatchSeriesPage} exact/>
          <Route path="/watch-season/:seasonID" component={WatchSeasonPage} exact/>
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
