import React from "react";
import AppLayout from "../layout";
import CreateGame from "../../components/CreateGame";
import Games from "../../components/Games";
import MineLogin from "../../components/Login";

const MainView = () => {
    return (
        <AppLayout>
            <CreateGame />
            <Games />
            <MineLogin />
        </AppLayout>
    );
};

export default MainView;
