import React, {Component} from "react";
import { Modal } from 'antd';
import {
  isObjectEmpty
} from "../../utils/validate";
import {
  getReviewByCustomerIDAndMovieIDAxios,
  addRating,
  editRating
} from "../../requests/reviewRequests";
import {getAuthStatus} from "../../requests/authRequests";
import {message} from "antd";
import {withRouter} from "react-router-dom";

const customerID = localStorage.getItem("userID")

class RateMovieModal extends Component {
  state = { 
    visible: false, 
    grading: 0, 
    isRated: false, 
    reviewID: "" ,
    loggedIn: ""
  };

  async componentDidMount() {
    const {movieID} = this.props;
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
          loggedIn
        })
      }
    }
    
  }

  showModal = () => {
    const {loggedIn} = this.state;
    if (!loggedIn) {
      this.props.history.push("/sign-in");
      message.error("You can rate a movie after logging in");
      return this.setState({
        visible: false,
      });
    }

    this.setState({
      visible: true,
    });
  };

  changeGrading = (e) => {
    this.setState({
        grading: e.target.value
    })
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const {movieID} = this.props;
    const {grading, isRated, reviewID} = this.state;
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

  render() {
    const {changeGrading, onSubmit} = this;
    const {grading, isRated} = this.state;

    return (
      <>
        <button className="section__btn" onClick={this.showModal}>
            <i className="fas fa-star fa-2x" aria-hidden="true" style={{paddingRight: "10px"}}></i>
            Rate Now
        </button>
        <Modal
          title="Rate the Movie"
          visible={this.state.visible}
          onOk={null}
          onCancel={this.handleCancel}
          okButtonProps={{style: {display: "none"}}}
        >
          <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="grading">Grading: {grading}/10</label>
                <input name="grading" id="grading" type="range" className="grading-slider" onChange={changeGrading} min="0" max="10" value={grading}/>
            </div>
            <button type="submit" className="section__btn">{isRated ? "RE-RATE" : "RATE"}</button>
          </form>
        </Modal>
      </>
    );
  }
}

export default withRouter(RateMovieModal);