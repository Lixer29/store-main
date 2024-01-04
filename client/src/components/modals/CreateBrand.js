import React, {useContext, useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import {Context} from "../../index";
import {createBrand, createType} from "../../http/deviceApi";


const CreateBrand = () => {
    const [show, setShow] = useState(false);
    const [brand, setBrand] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const postBrand = () => {
        if(brand > 0) {
            createBrand({name: brand}).then(data => {
                setBrand('')
                handleClose()
            }).catch(e => alert(e.response.data.message))
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Добавити новий бранд
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавлення бренду</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">
                            Введіть назву бренду
                        </InputGroup.Text>
                        <Form.Control
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            aria-placeholder='Введіть назву бренду'
                            onChange={(event) => setBrand(event.target.value)}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    postBrand()
                                }
                            }}
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={postBrand}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CreateBrand;