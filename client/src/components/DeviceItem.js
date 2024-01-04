import React from 'react';
import {Card, Col, Container} from "react-bootstrap";
import Placeholder from 'react-bootstrap/Placeholder';
import Image from "react-bootstrap/Image"
import {useNavigate} from "react-router-dom"
import {DEVICE_ROUTE} from "../utils";
import img from "../assets/placeholder.svg"

const DeviceItem = ({device}) => {
    const navigate = useNavigate()
    return (
        <Col md={3} className={"mt-3"}>
            <Card style={{cursor: 'pointer', padding: '25px', borderWidth: '3px', borderRadius: '20px'}} className="border-success device-item" onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
                <Image src={process.env.REACT_APP_API_URL + device.img} style={{ borderRadius: '15px' }}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>Samsung...</div>
                    <div className="d-flex align-items-center">
                        <div>{device.rating}</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 14 13" fill="none" className="mx-1" style={{opacity: '0.7'}}>
                            <path
                                d="M13.1891 4.51715L9.22189 3.94058L7.44845 0.34527C7.40001 0.246832 7.32033 0.167144 7.22189 0.118707C6.97501 -0.00316805 6.67501 0.0983945 6.55158 0.34527L4.77814 3.94058L0.810952 4.51715C0.701577 4.53277 0.601577 4.58433 0.525014 4.66246C0.432454 4.75759 0.38145 4.88558 0.383207 5.0183C0.384965 5.15103 0.439342 5.27762 0.534389 5.37027L3.4047 8.16871L2.72658 12.1203C2.71067 12.2122 2.72085 12.3067 2.75594 12.3932C2.79103 12.4796 2.84964 12.5545 2.92512 12.6093C3.0006 12.6641 3.08993 12.6967 3.18298 12.7033C3.27603 12.71 3.36908 12.6904 3.45158 12.6468L7.00001 10.7812L10.5485 12.6468C10.6453 12.6984 10.7578 12.7156 10.8656 12.6968C11.1375 12.65 11.3203 12.3921 11.2735 12.1203L10.5953 8.16871L13.4656 5.37027C13.5438 5.29371 13.5953 5.19371 13.611 5.08433C13.6531 4.81089 13.4625 4.55777 13.1891 4.51715ZM9.38751 7.77496L9.95158 11.0609L7.00001 9.5109L4.04845 11.0625L4.61251 7.77652L2.22501 5.4484L5.52501 4.96871L7.00001 1.97964L8.47501 4.96871L11.775 5.4484L9.38751 7.77496Z"
                                fill="black"/>
                        </svg>
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    );
};
export const DeviceItemPlaceholder = ({device}) => {
    return (
        <Container>
            <Col md={3} className="mt-3">
                <Card style={{cursor: 'pointer', padding: '25px', borderWidth: '3px', borderRadius: '20px'}} className="border-success device-item">
                    <Image src={img} style={{ borderRadius: '15px' }} />

                    <div className="mt-5 text-black-50 mt-1 d-flex justify-content-between align-items-center">
                        <Placeholder xs={4} />
                        <div className="d-flex align-items-center" style={{width: '40px'}}>
                            <Placeholder xs={4} />
                            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 14 13" fill="none" className="mx-1" style={{opacity: '0.7'}}>
                                <path
                                    d="M13.1891 4.51715L9.22189 3.94058L7.44845 0.34527C7.40001 0.246832 7.32033 0.167144 7.22189 0.118707C6.97501 -0.00316805 6.67501 0.0983945 6.55158 0.34527L4.77814 3.94058L0.810952 4.51715C0.701577 4.53277 0.601577 4.58433 0.525014 4.66246C0.432454 4.75759 0.38145 4.88558 0.383207 5.0183C0.384965 5.15103 0.439342 5.27762 0.534389 5.37027L3.4047 8.16871L2.72658 12.1203C2.71067 12.2122 2.72085 12.3067 2.75594 12.3932C2.79103 12.4796 2.84964 12.5545 2.92512 12.6093C3.0006 12.6641 3.08993 12.6967 3.18298 12.7033C3.27603 12.71 3.36908 12.6904 3.45158 12.6468L7.00001 10.7812L10.5485 12.6468C10.6453 12.6984 10.7578 12.7156 10.8656 12.6968C11.1375 12.65 11.3203 12.3921 11.2735 12.1203L10.5953 8.16871L13.4656 5.37027C13.5438 5.29371 13.5953 5.19371 13.611 5.08433C13.6531 4.81089 13.4625 4.55777 13.1891 4.51715ZM9.38751 7.77496L9.95158 11.0609L7.00001 9.5109L4.04845 11.0625L4.61251 7.77652L2.22501 5.4484L5.52501 4.96871L7.00001 1.97964L8.47501 4.96871L11.775 5.4484L9.38751 7.77496Z"
                                    fill="black"/>
                            </svg>
                        </div>
                    </div>
                    <Placeholder className="mt-3" xs={4} size={"lg"} />
                </Card>
            </Col>
        </Container>
    );
};

export default DeviceItem;