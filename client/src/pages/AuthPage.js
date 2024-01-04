import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, NavLink, Row} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils";
import {Context} from "../index";
import {check, login, registration} from "../http/userApi";
import {observer} from "mobx-react-lite";
const AuthPage = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')


    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            user.setIsAuth(true)
            user.setUser(user)
            history(SHOP_ROUTE)
        } catch (e) {
            setError(e.response.data.message.message)
        }
    }

    return (
        <div>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{height: window.innerHeight - 54}}
            >
                <Card style={{width: 600}} className="p-5">
                    <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                    <Form className="d-flex flex-column">
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите ваш email..."
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите ваш пароль..."
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            onKeyPress={e => {
                                if (e.key === 'Enter') {
                                    click();
                                }
                            }}
                        />
                        {error ?
                            <div className="text-danger">
                                {error}
                            </div>
                            :
                            <div></div>
                        }
                        <div className="d-flex justify-content-between mt-4 flex flex-row ">
                            {isLogin ?
                                <div className="flex flex-row d-flex gap-1 ">
                                    Немає аккаунта?
                                    <NavLink className="text-success" to={REGISTRATION_ROUTE} onClick={() => history(REGISTRATION_ROUTE)}
                                    >Зарегистрируйся!
                                    </NavLink>
                                </div>
                                :
                                <div className="flex flex-row d-flex gap-1 ">
                                    Є аккаунт?<NavLink className="text-success" to={LOGIN_ROUTE} onClick={() => history(LOGIN_ROUTE)}>
                                    Увійди
                                </NavLink>

                                </div>
                            }
                            <Button
                                variant={"outline-success"}
                                className=" align-self-end"
                                onClick={() => click()}
                            >
                                {isLogin ? 'Войти' : 'Регистрация'}
                            </Button>
                        </div>

                    </Form>
                </Card>
            </Container>
        </div>
    );
});

export default AuthPage;