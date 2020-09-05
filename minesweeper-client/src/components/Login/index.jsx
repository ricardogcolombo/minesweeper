import React, {useContext} from "react";
import {GoogleLogin, GoogleLogout} from "react-google-login";
import {StateContext} from "../../context/index";
import {LoginWrapper} from './styled'

const Login = (props) => {
    const {state,dispatch} = useContext(StateContext);
    const login = async (response) => {
        let data = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            method: "GET",
            headers: new Headers({
                'Authorization': `Bearer ${response.accessToken}`,
            }),
        });
        data = await data.json();
        dispatch({type: "SET_USER", payload: {userid: data.id}});
    };
    const logout = () => {

        dispatch({type: "SET_USER", payload: {userid: null}});

    };
    const handleLoginFailure = (e) => {};
    const handleLogoutFailure = (e) => {};
    console.log(process.env)
    const loginButton = state.userid? (
        <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_API}
            buttonText="Logout"
            onLogoutSuccess={logout}
            onFailure={handleLogoutFailure}
        />
    ) : (
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_API}
            buttonText="Login with Google"
            onSuccess={login}
            onFailure={handleLoginFailure}
            cookiePolicy={"single_host_origin"}
            responseType="code,token"
        />
    );
    return <LoginWrapper>{loginButton}</LoginWrapper>;
};

export default Login;
