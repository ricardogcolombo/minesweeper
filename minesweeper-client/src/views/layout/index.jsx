import React from "react";
import {PageHeader, Layout} from "antd";
import './layout.css'

const {Header, Content} = Layout;

const AppLayout = ({headerContent, children}) => {
    return (
        <Layout>
            <Header style={{padding:"20px",height:'100px'}}>
                <div>MINES WEEPER</div>
            </Header>
            <Content style={{padding: "50px"}}>{children}</Content>
        </Layout>
    );
};

export default AppLayout;
