import React, { Component } from 'react';
import PlanModal from "./PlanModal";

export default class PlanItem extends Component {

    renderDescription = () => {
        const {planItem} = this.props;
        const {description} = planItem;
        let splitDescription = description.split(", ");

        return splitDescription.map(splitDescriptionItem => {
            return (<div key={splitDescriptionItem} className="price__item">
                <span>{splitDescriptionItem}</span>
            </div>)
        })
    }

    render() {
        const {planItem, vndRate, subStatus, subscription} = this.props;
        const {name, price} = planItem;

        return (
            <div className="col-12 col-md-6 col-lg-4">
                <div className="price">
                    <div className="price__item price__item--first"><span>{name}</span> <span>${price}</span></div>
                    {this.renderDescription()}
                    <PlanModal subStatus={subStatus} vndRate={vndRate} planItem={planItem} subscription={subscription}/>
                </div>
            </div>
        )
    }
}
