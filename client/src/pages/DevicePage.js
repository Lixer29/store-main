import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import bigStar from "../assets/Star 1.png"
import {getOneDevices} from "../http/deviceApi";
import {jwtDecode} from "jwt-decode";
import {addBasket, deleteBasket, getOne} from "../http/basketApi";
const DevicePage = () => {
    const [device, setDevice] = useState({info: []})
    const [isAdded, setIsAdded] = useState(false)
    const [show, setShow] = useState(false);
    const [content, setContent] = useState(false);

    const {id} = useParams()
    const token = localStorage.getItem('token')
    const decode = jwtDecode(token)
    const basketId = decode.id


    const checkBasket = () => {
        getOne(id, basketId).then(bool => setIsAdded(bool)).catch(e => console.log(e.message))
    }
    const createBasketDevice = () => {
        addBasket(id, {basketId}).then(data => {
            setShow(true)
            setContent(data.message)
            setTimeout(() => setShow(false), 5000);
        }).catch(e => console.log('add', e.message))
    }
    const deleteBasketDevice = () => {
        deleteBasket(id, {basketId}).then(data => {
            setShow(true)
            setContent(data.message)
            setTimeout(() => setShow(false), 5000);
        }).catch(e => console.log('add', e.message))
    }

    useEffect(() => {
        getOneDevices(id)
            .then(data => setDevice(data))
            .catch(data => console.log(data))
        checkBasket()
    }, [deleteBasketDevice]);

    return (
        <Container>

            <Row  className="mt-5">
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex justify-content-center">
                        <h2 className="d-flex justify-content-center text-white">{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{background: `url(${bigStar}) no-repeat center center`, width:210, height: 200, backgroundSize: 'cover', fontSize:64}}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card style={{ height: '300px', background: 'rgba(255, 255, 255, 0.9)', borderWidth: '2px'}} className="border-success d-flex justify-content-between px-5 py-4">
                        <h3 className="d-flex justify-content-center">від
                            {device.price}
                            грн.</h3>
                        {isAdded ?
                            <Button onClick={deleteBasketDevice}>
                            Видалити з корзини
                            </Button>
                            :
                            <Button onClick={createBasketDevice}>
                            Добавити в корзину
                            </Button>
                        }

                    </Card>
                    <Alert className="mt-3 position-absolute" style={{opacity: '0.7', textAlign: 'center', padding: '8px 20px'}} show={show} variant="success">
                        <Alert.Heading>{content}</Alert.Heading>
                    </Alert>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3 gap-1">
                <h1 className="my-4 text-white">Характеристики</h1>
                {device.info.length > 0 ? (
                    device.info.map((info, index) => (
                        <Row
                            key={info.id}
                            style={{
                                background: index % 2 === 0 ? 'lightgray' : '',
                                color: index % 2 === 0 ? '' : 'white',
                                padding: '10px',
                                borderRadius: '10px'
                            }}
                        >
                            {info.title}: {info.description}
                        </Row>
                    ))
                ) : (
                    <div className="text-white pt-4" style={{fontSize: '20px'}} >Характеристик немає</div>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;