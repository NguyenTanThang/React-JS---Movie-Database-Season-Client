import React, { Component } from 'react';
import PlanItem from "./PlanItem";
import PlanItemSpecial from "./PlanItemSpecial";

export default class PlanList extends Component {

    renderPlanItems = () => {
        const {planList} = this.props;
        return planList.map((planItem, index) => {
            const key = `plan-${planItem._id}`

            if (index % 2) {
                return <PlanItemSpecial key={key} planItem={planItem}/>
            }
            return <PlanItem key={key} planItem={planItem}/>
        })
    }

    render() {
        const {renderPlanItems} = this;

        return (
            <div className="row">
                {renderPlanItems()}
            </div>
        )
    }
}
