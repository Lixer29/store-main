import React from 'react';
import {Button, Container, Row} from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateType from "../components/modals/CreateType";
import CreateDevice from "../components/modals/CreateDevice";

const AdminPage = () => {
    return (
        <Container>
            <div className="d-flex flex-column gap-3 m-auto mt-5" style={{width: '30%'}}>
                <CreateBrand/>
                <CreateType/>
                <CreateDevice/>
            </div>
        </Container>
    );
};

export default AdminPage;