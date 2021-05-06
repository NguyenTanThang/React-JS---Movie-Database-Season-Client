import React, {Component} from "react";
import { Modal, message, Tooltip } from 'antd';
import {avatarList} from "../../_helpers"
import {withRouter} from "react-router-dom";

class RateMovieModal extends Component {

  onAvatarClicked = async (avatarURL) => {
    this.props.onChange("avatar", avatarURL)
    this.props.changeModalVisible()
  }

  handleCancel = e => {
    this.props.changeModalVisible()
  };

  renderAvatarList = () => {
      const {onAvatarClicked} = this;
      return avatarList.map((avatarItem, index) => {
        const {avatarURL, name} = avatarItem;
        return <div className="avatar-item col-lg-2 col-md-4 col-sm-6 col-6" key={index} onClick={() => onAvatarClicked(avatarURL)}>
            <img src={avatarURL} className="img-fluid" alt={name}/>
        </div>
      })
  }

  render() {

    return (
      <>
        <Modal
          title="Select an Avatar"
          visible={this.props.visible}
          onOk={null}
          onCancel={this.handleCancel}
          okButtonProps={{style: {display: "none"}}}
          width="1028"
        >
          <div className="row avatar-list">
              {this.renderAvatarList()}
          </div>
        </Modal>
      </>
    );
  }
}

export default withRouter(RateMovieModal);