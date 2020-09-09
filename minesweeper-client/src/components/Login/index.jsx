import React, {useEffect, useState, useContext} from "react";
import {StateContext} from "../../context/index";
import {LoginWrapper} from "./styled";

import {Tabs, Form, Input, Button, Alert} from "antd";
import {login, register} from "../../hooks";
const {TabPane} = Tabs;

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

const MineLogin = (props) => {
    const {
        state: {userData},
        dispatch,
    } = useContext(StateContext);
    const [errorAlert, setErrorAlert] = useState(null);
    const [successAlert, setSuccesAlert] = useState(null);
    const [signinForm] = Form.useForm();
    const [signupForm] = Form.useForm();

    useEffect(() => {
        let user = localStorage.getItem("user");
        if (user) {
            dispatch({type: "SET_USER", payload: {userData: JSON.parse(user)}});
        }
    }, []);
    const onSignin = ({username, password}) => {
        login(username, password).then((resp) => {
            if (resp.accessToken) {
                localStorage.setItem("user", JSON.stringify(resp));
                dispatch({type: "SET_USER", payload: {userData: resp}});
            } else {
                setErrorAlert(resp.message);
            }
        });
    };
    const logout = () => {
        localStorage.setItem("user", JSON.stringify({}));
        dispatch({type: "SET_USER", payload: {userData: null}});
    };
    const onRegister = ({username, email, password}) => {
        register(username, email, password)
            .then((resp) => {
                if (resp.type === "error") {
                    setSuccesAlert(null);
                    setErrorAlert(resp.message);
                } else {
                    setSuccesAlert(resp.message);
                    setErrorAlert(null);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const onFinishFailed = (err) => {
        console.log(err);
    };
    // TODO Create Component for login tabs
    return (
        <LoginWrapper>
            <div>
                {!userData && (
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Sign in" key="1">
                            <Form
                                {...layout}
                                form={signinForm}
                                name="basic"
                                initialValues={{remember: true}}
                                onFinish={onSignin}
                                onFinishFailed={onFinishFailed}
                            >
                                <Form.Item
                                    label="Username"
                                    name="username"
                                    rules={[{required: true, message: "Please input your username!"}]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[{required: true, message: "Please input your password!"}]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit">
                                        SIGN IN
                                    </Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                        <TabPane tab="Sign up" key="2">
                            <Form
                                {...layout}
                                name="basic"
                                form={signupForm}
                                initialValues={{remember: true}}
                                onFinish={onRegister}
                                onFinishFailed={onFinishFailed}
                            >
                                <Form.Item
                                    label="Username"
                                    name="username"
                                    rules={[{required: true, message: "Please input your username!"}]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[
                                        {
                                            required: true,
                                            type: "email",
                                            message: "Please input your email!",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[{required: true, message: "Please input your password!"}]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit">
                                        SIGN UP
                                    </Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                    </Tabs>
                )}
            </div>
            <div>{errorAlert && <Alert type="error" message={errorAlert} />}</div>
            <div>{successAlert && <Alert type="success" message={successAlert} />}</div>
            <div>
                {userData && (
                    <Button type="primary" onClick={logout} block>
                        LOGOUT
                    </Button>
                )}
            </div>
        </LoginWrapper>
    );
};

export default MineLogin;
