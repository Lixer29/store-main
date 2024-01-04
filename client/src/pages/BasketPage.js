import React, {useContext, useEffect, useState} from 'react';
import {jwtDecode} from "jwt-decode";
import {getAll, getOne} from "../http/basketApi";
import {Context} from "../index";
import DeviceItem, {DeviceItemPlaceholder} from "../components/DeviceItem";
import {Container, Row, Spinner} from "react-bootstrap";

const BasketPage = () => {
    const [loading, setLoading] = useState(true)

    const token = localStorage.getItem('token')
    const decode = jwtDecode(token)
    const basketId = decode.id

    const {device} = useContext(Context)

    const checkBasket = () => {
        getAll(basketId).then(data => {
            device.setBasketDevices(data)
            console.log(data)
        }).catch(e => console.log(e.message))
            .finally(() => setLoading(false))
    }
    useEffect(() => {
        checkBasket()
    }, [device.basketDevices]);

    if(loading) {
        return (
            <Container>
                <DeviceItemPlaceholder/>
            </Container>
        )
    }
    return (
        <Container>
            <Row className="d-flex">
                {device.basketDevices? (
                    device.basketDevices.map((device) => (
                        <DeviceItem key={device.id} device={device} />
                    ))
                ) : (
                    <p className="text-white">No devices in the basket.</p>
                )}
            </Row>
        </Container>
    );
};

export default BasketPage;