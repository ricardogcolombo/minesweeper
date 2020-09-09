import React from "react";
import {Layout} from "antd";
import './layout.css'

const {Header, Content} = Layout;

const AppLayout = ({ children}) => {
    return (
        <Layout>
            <Header style={{padding:"20px",height:'100px'}}>
                <div className='AppTitle'>MINES WEEPER</div>
            </Header>
            <Content style={{padding: "50px"}}>{children}</Content>
        </Layout>
    );
};

export default AppLayout;
