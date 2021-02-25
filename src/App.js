import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'antd/dist/antd.css';
//import "video-react/dist/video-react.css";
import "plyr/dist/plyr.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import IdleTimer from 'react-idle-timer'
import {message} from 'antd'
import ScrollToTop from "./components/partials/ScrollToTop";

/*
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
*/
import MasterPage from "./pages/MasterPage";
import Browse from "./pages/Browse";
import Help from "./pages/Help";
import PricingPlan from "./pages/PricingPlan";
import WatchLater from "./pages/WatchLater";
import HistoryPage from "./pages/HistoryPage";
import SignIn from "./pages/SignIn";
import ChangePassword from "./pages/ChangePassword";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";
import Logout from "./pages/Logout";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import SeriesDetailsPage from "./pages/SeriesDetailsPage";
import WatchMoviePage from "./pages/WatchMoviePage";
import WatchSeriesPage from "./pages/WatchSeriesPage";
import WatchSeasonPage from "./pages/WatchSeasonPage";
import StripePayPage from "./pages/StripePayPage";
import MomoPaymentPage from "./pages/MomoPaymentPage";
import ZaloPaymentPage from "./pages/ZaloPaymentPage";
import SeasonDetailsPage from "./pages/SeasonDetailsPage";
import SeasonListPage from "./pages/SeasonListPage";
import NotFoundPage from "./pages/NotFoundPage";
import Footer from "./components/partials/Footer";
import BigLoading from "./components/partials/BigLoading";

/*Utils*/
import { authenticationService } from "./_services";
import {sessionAutoRefreshMechanic} from "./requests/authRequests";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.idleTimer = null
    this.handleOnAction = this.handleOnAction.bind(this)
    this.handleOnActive = this.handleOnActive.bind(this)
    this.handleOnIdle = this.handleOnIdle.bind(this)

    this.state = {
        currentUser: null
    };
  }

  async componentDidMount() {
      authenticationService.currentUser.subscribe(x => this.setState({
          currentUser: x
      }));
      await sessionAutoRefreshMechanic();
  }

  logout() {
      authenticationService.logout();
  }

  handlePauseIdle = () => {
    this.idleTimer.reset();
    this.idleTimer.pause();
  }

  async handleOnAction (event) {
    //console.log('user did something', event)
  }

  async handleOnActive (event) {
    /*
    console.log('user is active', event)
    console.log('time remaining', this.idleTimer.getRemainingTime())
    */
  }

  handleOnIdle (event) {
    /*
    console.log('user is idle', event)
    console.log('last active', this.idleTimer.getLastActiveTime())
    */

    if (authenticationService.currentUserValue) {
      authenticationService.logout();
      //window.location.replace('/sign-in');
      //history.push('/sign-in');
      message.error("Due to the lack of interactivity your session has been terminated. Please login again");
      setTimeout(() => {
        window.location.replace('/sign-in');
      }, 2500);
    }
    
  }

  render() {
    return (
      <div className="App">
      <IdleTimer
          ref={ref => { this.idleTimer = ref }}
          timeout={1000 * 60 * 10}
          onActive={this.handleOnActive}
          onIdle={this.handleOnIdle}
          onAction={this.handleOnAction}
          debounce={250}
        />
      <AnimatePresence exitBeforeEnter>
        <Router>
        <ScrollToTop>
            <Switch>
              <Route path="/" exact>
                <MasterPage/>
              </Route>
              <Route path="/browse" component={Browse}/>
              <Route path="/help" component={Help}/>
              <Route path="/pricing" component={PricingPlan}/>
              <Route path="/stripe-pay" component={StripePayPage}/>
              <Route path="/momo-pay" component={MomoPaymentPage}/>
              <Route path="/zalo-pay" component={ZaloPaymentPage}/>
              <Route path="/sign-up" component={SignUp}/>
              <Route path="/sign-in" component={SignIn}/>
              <Route path="/change-password" component={ChangePassword}/>
              <Route path="/forgot-password" component={ForgotPassword}/>
              <Route path="/reset-password/:token" component={ResetPassword}/>
              <Route path="/logout" component={Logout}/>
              <Route path="/watch-later" component={WatchLater}/>
              <Route path="/history" component={HistoryPage}/>
              <Route path="/season-list/:seriesID" component={SeasonListPage}/>
              <Route path="/movies-details/:movieID" component={MovieDetailsPage}/>
              <Route path="/series-details/:seriesID" component={SeriesDetailsPage}/>
              <Route path="/season-details/:seasonID" component={SeasonDetailsPage}/>
              <Route path="/watch-movie/:movieID" component={WatchMoviePage} exact/>
              <Route path="/watch-season/:seasonID" component={WatchSeasonPage} exact/>
              <Route path="/loading" component={BigLoading} exact/>
              <Route component={NotFoundPage} />
            </Switch>
          <Footer/>
        </ScrollToTop>
        </Router>
        </AnimatePresence>
      </div>
    );
  }
}

/*
<Route path="/watch-series/:seriesID" component={WatchSeriesPage} exact/>
*/

export default App;
