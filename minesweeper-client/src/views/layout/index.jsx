import React, {useEffect,useState} from "react";
import {Layout} from "antd";

const {Header,Content} = Layout;

const AppLayout = ({headerContent,children}) => {
    return (
        <Layout>
            <Header >{headerContent}</Header>
            <Content style={{padding: "0 50px"}}>{children}</Content>
        </Layout>
    );
};

export default AppLayout;
