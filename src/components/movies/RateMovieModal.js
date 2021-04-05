import React, {Component} from "react";
import { Modal } from 'antd';
import {
  isObjectEmpty
} from "../../utils/validate";
import {
  authenticationService
} from "../../_services";
import {
  getReviewByCustomerIDAndMovieIDAxios,
  addRating,
  editRating
} from "../../requests/reviewRequests";
import {getAuthStatus} from "../../requests/authRequests";
import {message, Tooltip} from "antd";
import {withRouter} from "react-router-dom";

class RateMovieModal extends Component {
  state = { 
    visible: false, 
    grading: 0, 
    isRated: false, 
    reviewID: "" ,
    loggedIn: "",
    loading: true
  };

  async componentDidMount() {
    let {movieID} = this.props;
    const currentUser = authenticationService.currentUserValue;

    if (!currentUser) {
      return;
    }

    const customerID = currentUser.customerItem._id;

    const review = await getReviewByCustomerIDAndMovieIDAxios(movieID, customerID);

    const loggedIn = await getAuthStatus();

    if (!review) {
      this.setState({
        loggedIn
      })
    } else {
      if (review || !isObjectEmpty(review)) {
        this.setState({
          grading: review.grading,
          isRated: true,
          reviewID: review._id,
          loggedIn,
          loading: false
        })
      }
    }
  }

  showModal = () => {
    const {loggedIn, loading} = this.state;

    if (!loggedIn && !loading) {
      this.props.history.push("/sign-in");
      message.error("You can rate after logging in");
      return this.setState({
        visible: false,
      });
    }

    this.setState({
      visible: true,
    });
  };

  changeGrading = (grading) => {
    this.setState({
        grading
    })
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const {movieID} = this.props;
    const {grading, isRated, reviewID} = this.state;
    const currentUser = authenticationService.currentUserValue;
    if (grading === 0) {
      return message.error("Please select a grade for the film");
    }
    if (!currentUser) {
      return;
    }
    const customerID = currentUser.customerItem._id;
    if (isRated) {
      await editRating(reviewID, {movieID, grading, customerID})
      this.setState({
        visible: false
      })
    } else {
      await addRating({movieID, grading, customerID})
      this.setState({
        visible: false
      })
    }
  }

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  renderStarWidget = () => {
    const {changeGrading} = this;
    const {grading, isRated} = this.state;

    const starInputs = () => {
      let ans = [];
      for (let index = 1; index <= 5; index++) {
        if (index === grading && isRated) {
          ans.push(
            <>
              <input type="radio" onChange={() => changeGrading(index)} name="grading" id={`rate-${index}`} checked/>
              <label for={`rate-${index}`} className="fas fa-star"></label>
            </>
          )
        } else {
          ans.push(
            <>
              <input type="radio" onChange={() => changeGrading(index)} name="grading" id={`rate-${index}`}/>
              <label for={`rate-${index}`} className="fas fa-star"></label>
            </>
          )
        }
      }
      return ans.reverse();
    }

    return (
      <div className="star-widget-container">
        <div className="star-widget">
          {starInputs()}
          <div>
            <header></header>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {changeGrading, onSubmit, renderStarWidget} = this;
    const {grading, isRated} = this.state;

    return (
      <>
      {/*
        <button className="section__btn" onClick={this.showModal}>
            <i className="fas fa-star fa-2x" aria-hidden="true" style={{paddingRight: "10px"}}></i>
            Rate Now
        </button>
        */}
        <Tooltip title={"Rate the film"}>
          <li className="rating-button" onClick={this.showModal}>
            <i className="fa fa-star" aria-hidden="true"></i>
          </li>
        </Tooltip>
        <Modal
          title="Rate the Movie"
          visible={this.state.visible}
          onOk={null}
          onCancel={this.handleCancel}
          okButtonProps={{style: {display: "none"}}}
        >
          <form onSubmit={onSubmit}>
            {renderStarWidget()}
            {/*
            <div className="form-group">
                <label htmlFor="grading">Grading: {grading}/10</label>
                <input name="grading" id="grading" type="range" className="grading-slider" onChange={changeGrading} min="0" max="10" value={grading}/>
            </div>
            */}
            <button type="submit" className="section__btn">{isRated ? "RE-RATE" : "RATE"}</button>
          </form>
        </Modal>
      </>
    );
  }
}

export default withRouter(RateMovieModal);