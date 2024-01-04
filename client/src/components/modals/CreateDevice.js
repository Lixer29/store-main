import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, FormText, Modal, Row} from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import {Context} from "../../index";
import {createDevice, getAllBrands, getAllDevices, getAllTypes} from "../../http/deviceApi";
import {values} from "mobx";
import data from "bootstrap/js/src/dom/data";

const CreateBrand = () => {
    const [selectedType, setSelectedType] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([]);

    const {device} = useContext(Context)
    useEffect(() => {
        getAllTypes().then(data => device.setTypes(data)).catch(data => data.message)
        getAllBrands().then(data => device.setBrands(data)).catch(data => data.message)
    }, []);
    const handleTypeSelect = (type) => setSelectedType(type);
    const handleBrandSelect = (type) => setSelectedBrand(type);
    const selectedFile = (e) => {
        setFile(e.target.files[0])
        console.log(file)
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const postDevice = () => {
        if (!selectedType || !selectedBrand) {
            alert('Виберіть обидва типи і бренди');
            return;
        }

        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', selectedBrand.id)
        formData.append('typeId', selectedType.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(() => handleClose()).catch(e => console.log(e))
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Добавити новий пристрій
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавлення пристрою</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Dropdown className='my-4'>
                        <Dropdown.Toggle aria-required={"true"} variant="success" id="dropdown-basic">
                            {selectedType ? selectedType.name : 'Виберіть тип'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {device.types.map((type) => (
                                <Dropdown.Item key={type.id} onClick={() => handleTypeSelect(type)}>
                                    {type.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>


                    <Dropdown className='my-4'>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {selectedBrand ? selectedBrand.name : 'Виберіть бренд'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {device.brands.map((type) => (
                                <Dropdown.Item key={type.id} onClick={() => handleBrandSelect(type)}>
                                    {type.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>


                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">
                            Введіть назву пристрою
                        </InputGroup.Text>
                        <Form.Control
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">
                            Введіть ціну пристрою
                        </InputGroup.Text>
                        <Form.Control
                            // aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            // type='number'
                            onChange={(event) => setPrice(event.target.value)}
                        />
                    </InputGroup>
                    {/*<FormText className="my-1">Виберіть фото пристрою</FormText>*/}
                    <Form.Control
                        type='file'
                        onChange={(e) => selectedFile(e)}
                    />
                    <Button variant="warning" className="mt-4" onClick={addInfo}>
                        Добавити опис
                    </Button>
                    {info.map(i =>
                        <Row className="mt-3">
                            <Col md={4}>
                                <Form.Control
                                    aria-describedby="inputGroup-sizing-default"
                                    type='text'
                                    placeholder="Назва властивості"
                                    value={i.title}
                                    onChange={e => changeInfo('title', e.target.value, i.number)}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    aria-describedby="inputGroup-sizing-default"
                                    type='text'
                                    placeholder="Опис властивості"
                                    value={i.description}
                                    onChange={e => changeInfo('description', e.target.value, i.number)}

                                />
                            </Col>
                            <Col md={4}>
                                <Button variant="danger"
                                        onClick={() => removeInfo(i.number)}
                                >
                                    Delete
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={postDevice}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CreateBrand;