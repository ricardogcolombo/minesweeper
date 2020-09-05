import React,{useContext} from "react";
import AppLayout from "../layout";
import Login from "../../components/Login";
import CreateGame from '../../components/CreateGame'

const MainView = () => {

    return (
        <AppLayout>
            <CreateGame />
            <Login />
        </AppLayout>
    );
};

export default MainView;

