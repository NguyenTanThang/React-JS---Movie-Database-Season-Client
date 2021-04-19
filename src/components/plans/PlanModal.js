import React, { Component } from 'react';
import {Modal, message} from "antd";
import {withRouter} from "react-router-dom";
import {USDtoVNDWithRate} from "../../requests/currencyRequests";
import Paypal from '../partials/Paypal';
import PaypalV2 from '../partials/PaypalV2';
import {authenticationService} from "../../_services/authentication.service";

/*
<Paypal
    toPay={price}
    onSuccess={transactionSuccess}
    transactionError={transactionError}
    transactionCanceled={transactionCanceled}
/>
*/

class PlanModal extends Component {

    state = { 
        visible: false,
        vndPrice: ""
     };

    componentDidMount() {
        const {vndRate, planItem} = this.props;
        const {price} = planItem;
        const vndPrice = USDtoVNDWithRate(price, vndRate);
        
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
        localStorage.setItem("amount", parseInt(vndPrice));
        localStorage.setItem("planID", planItem._id);
        this.props.history.push("/momo-pay");
    }

    payWithZalo = () => {
        const {planItem} = this.props;
        const {vndPrice} = this.state;
        localStorage.setItem("amount", parseInt(vndPrice));
        localStorage.setItem("planID", planItem._id);
        this.props.history.push("/zalo-pay");
    }

    payWithVisa = () => {
        const {planItem} = this.props;
        const {price} = planItem;
        localStorage.setItem("amount", Math.round(price * 100));
        localStorage.setItem("planID", planItem._id);
        this.props.history.push("/stripe-pay");
    }

    renderPaypalButton = () => {
        const {planItem, subStatus} = this.props;
        const {name, price, _id} = planItem;

        const currentUser = authenticationService.currentUserValue

        if (!currentUser) {
            return (
                <button className="paypal__btn plan__btn" onClick={(e) => {
                    message.error("You need to login to use this feature")
                }}>
                    <i class="fab fa-paypal"></i>
                    Pay with Paypal
                </button>
            );
        }

        if (subStatus === "active") {
            return (
                <button className="paypal__btn plan__btn" onClick={(e) => {
                    message.error("Your subscription is still valid")
                }}>
                    <i class="fab fa-paypal"></i>
                    Pay with Paypal
                </button>
            );
        }
            
        const currentUserItem = currentUser.customerItem;

        return (
            <PaypalV2
                total={price}
                planID={_id}
                customerID={currentUserItem._id}
            />
        )
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

    transactionSuccess = (data) => {
        console.log(data);
    }

    transactionError = () => {
        console.log('Paypal error')
    }

    transactionCanceled = () => {
        console.log('Transaction canceled')
    }

    render() {
        const {showModal, payWithMomo, payWithVisa, payWithZalo, transactionSuccess, transactionError, transactionCanceled, renderPaypalButton} = this;
        const {planItem} = this.props;
        const {name, price, _id} = planItem;

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
                    <button className="zalo__btn plan__btn" onClick={payWithZalo}>
                        <i className="fas fa-wallet"></i> 
                        Pay with ZaloPay
                    </button>
                    {/*
                    <button className="momo__btn plan__btn" onClick={payWithMomo}>
                        <i className="fas fa-wallet"></i> 
                        Pay with MoMo
                    </button>
                    */}
                    <button className="stripe__btn plan__btn" onClick={payWithVisa}>
                        <i className="fab fa-cc-visa"></i> 
                        Pay with VISA
                    </button>

                    {renderPaypalButton()}
                </Modal>  
            </>
        )
    }
}

export default withRouter(PlanModal);
