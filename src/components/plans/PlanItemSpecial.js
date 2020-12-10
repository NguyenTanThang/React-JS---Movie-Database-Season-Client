import React, { Component } from 'react';
import PlanModal from "./PlanModal";

export default class PlanItem extends Component {
    render() {
        const {planItem} = this.props;
        const {name, price, description} = planItem;

        return (
            <div className="col-12 col-md-6 col-lg-4">
                <div className="price price--premium">
                    <div className="price__item price__item--first"><span>{name}</span> <span>${price}</span></div>
                    <div className="price__item"><span>{description}</span></div>
                    <PlanModal planItem={planItem}/>
                </div>
            </div>
        )
    }
}