import React from "react";
import AppLayout from "../layout";
import Login from "../../components/Login";
import CreateGame from '../../components/CreateGame'
import Games from "../../components/Games";

const MainView = () => {

    return (
        <AppLayout>
            <CreateGame />
        <Games/>
            <Login />
        </AppLayout>
    );
};

export default MainView;

