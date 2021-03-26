import React, { Component } from 'react';
import PlanItem from "./PlanItem";
import PlanItemSpecial from "./PlanItemSpecial";
import Loading from "../partials/Loading";
import {getVNDRate} from "../../requests/currencyRequests";

export default class PlanList extends Component {

    state = {
        vndRate: ""
    }

    async componentDidMount() {
        const vndRate = await getVNDRate();
        this.setState({
            vndRate
        })
    }

    renderPlanItems = () => {
        const {planList} = this.props;
        const {vndRate} = this.state;

        if (!vndRate || !planList) {
            return (<>
                <Loading/>
            </>)
        }

        return planList.map((planItem, index) => {
            const key = `plan-${planItem._id}`

            if (index % 2) {
                return <PlanItemSpecial key={key} planItem={planItem} vndRate={vndRate}/>
            }
            return <PlanItem key={key} planItem={planItem} vndRate={vndRate}/>
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
