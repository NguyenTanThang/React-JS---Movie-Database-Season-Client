import React, { Component } from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export default class TabGenerator extends Component {

    renderTabPanes = () => {
        const {tabContents, tabHeaders} = this.props;
        return tabContents.map((tabContent, index) => {
            return (
                <React.Fragment key={tabHeaders[index]}>
                    <TabPane tab={tabHeaders[index]} key={index}>
                        {tabContent}
                    </TabPane>
                </React.Fragment>
            )
        })
    }

    render() {
        const {renderTabPanes} = this;

        return (
            <Tabs defaultActiveKey="0">
                {renderTabPanes()}
            </Tabs>
        )
    }
}
