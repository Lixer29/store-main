import React, {Fragment, useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, ListGroup, Row, Image, Pagination} from "react-bootstrap";
import {Context} from "../index";
import DeviceItem from "../components/DeviceItem";
import {observer} from "mobx-react-lite";
import {getAllBrands, getAllDevices, getAllTypes} from "../http/deviceApi";
import {useLocation} from "react-router-dom";

const ShopPage = observer (() => {
    const {device} = useContext(Context)

    const location = useLocation()

    useEffect(() => {
        getAllTypes().then(data => device.setTypes(data))
        getAllBrands().then(data => device.setBrands(data))
        getAllDevices(null, null, device.page, device.limit).then(data => {
            console.log(data)
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        getAllDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page, device.selectedType, device.selectedBrand, location])


    const pageCount = Math.ceil(device.totalCount / device.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Container>
            <Row className="mt-4" >
                <Col md={3}>
                    <ListGroup className="border-success" style={{cursor: 'pointer'}}>
                        {device.types.map((types) => (
                            <ListGroup.Item
                                onClick={() => device.setSelectedType(types)}
                                style={{
                                    borderWidth: '2px',
                                    background: types.id === device.selectedType.id ? 'green' : '',
                                    color: types.id === device.selectedType.id ? 'white' : '',
                                    border: types.id === device.selectedType.id ? 'black' : '',
                                }}
                                className="border-black"
                                active={types.id === device.selectedType.id}

                            >{types.name}</ListGroup.Item>
                        ))}

                    </ListGroup>
                </Col>
                <Col md={9}>
                    <div className="d-flex flex-row gap-2" style={{cursor: 'pointer'}}>
                        {device.brands.map((brand) => (
                            <Card
                                onClick={() => device.setSelectedBrand(brand)}
                                style={{
                                    borderWidth: '2px',
                                    borderRadius: '20px',
                                    backgroundColor: brand.id === device.selectedBrand.id ? 'green' : '',
                                    color: brand.id === device.selectedBrand.id ? 'white' : 'green',
                                    border: brand.id === device.selectedBrand.id ? 'none' : '',
                                }}
                                className="border-success"
                                key={brand.id}
                            >
                                <Card.Body>{brand.name}</Card.Body>
                            </Card>

                        ))}
                    </div>

                    <Row className="d-flex">
                        {device.devices.map(device =>
                            <DeviceItem key={device.id} device={device}/>
                        )}
                    </Row>
                    <Pagination className="mt-5" style={{color: 'green'}}>
                        <Pagination.Prev onClick={() => device.setPage(device.page - 1)} disabled={device.page === 1} />
                        {pages.map(page => (
                            <Pagination.Item
                                key={page}
                                active={device.page === page}
                                onClick={() => device.setPage(page)}
                                className="text-success"
                                style={{color: 'green !important'}}
                            >
                                {page}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => device.setPage(device.page + 1)} disabled={device.page === pageCount} />
                    </Pagination>
                    <Fragment></Fragment>
                </Col>

            </Row>
        </Container>
    );
});

export default ShopPage;