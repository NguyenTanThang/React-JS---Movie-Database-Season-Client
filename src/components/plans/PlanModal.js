import React, { Component } from 'react';
import {Modal} from "antd";
import {withRouter} from "react-router-dom";
import {USDtoVND} from "../../requests/currencyRequests";

class PlanModal extends Component {

    state = { 
        visible: false,
        vndPrice: ""
     };

    async componentDidMount() {
        const {planItem} = this.props;
        const {price} = planItem;
        const vndPrice = await USDtoVND(price);
        
        this.setState({
            vndPrice
        })
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    payWithMomo = () => {
        const {planItem} = this.props;
        const {vndPrice} = this.state;
        console.log(vndPrice);
        localStorage.setItem("amount", vndPrice);
        localStorage.setItem("planID", planItem._id);
        this.props.history.push("/momo-pay");
    }

    payWithVisa = () => {
        const {planItem} = this.props;
        const {price} = planItem;
        localStorage.setItem("amount", Math.round(price * 100));
        localStorage.setItem("planID", planItem._id);
        this.props.history.push("/stripe-pay");
    }

    handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

    render() {
        const {showModal, payWithMomo, payWithVisa} = this;
        const {planItem} = this.props;
        const {name} = planItem;

        return (
            <>
                <button className="price__btn" onClick={showModal}>Choose Plan</button>
                <Modal
                    title={`${name} Plan`}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <button className="momo__btn plan__btn" onClick={payWithMomo}>
                        <i className="fas fa-wallet"></i> 
                        Pay with MoMo
                    </button>
                    <button className="stripe__btn plan__btn" onClick={payWithVisa}>
                        <i className="fab fa-cc-visa"></i> 
                        Pay with VISA
                    </button>
                </Modal>  
            </>
        )
    }
}

export default withRouter(PlanModal);
