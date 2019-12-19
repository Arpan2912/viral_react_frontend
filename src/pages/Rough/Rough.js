import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import AddRough from '../../modal/AddRough';

import RoughService from '../../services/RoughService';
import './Rough.css';

const personSampleArray = [
    {
        first_name: "Arpan",
        last_name: "Shah",
        phone: "9033340163",
        email: "shaharpan05@gmail.com",
        address: "Surat",
        designation: "employee"
    }
];

class Rough extends Component {
    state = {
        roughs: [],
        isAddRoughModalOpen: false,
        selectedRoughData: null
    }

    componentDidMount() {
        this.getRoughList();
    }

    openAddRoughModal = (roughData) => {
        this.setState({ isAddRoughModalOpen: true, selectedRoughData: roughData });
    }
    closeAddRoughModal = (reload) => {
        this.setState({ isAddRoughModalOpen: false, selectedRoughData: null });
        if (reload) {
            this.getRoughList();
        }
    }

    getRoughList = () => {
        RoughService.getRoughList()
            .then(data => {
                console.log(data.data.data);
                const roughs = data.data.data;
                this.setState({ roughs });
            })
            .catch(e => {

            })
    }


    render() {
        const { roughs, isAddRoughModalOpen, selectedRoughData } = this.state;
        const prepareRows = roughs.map(p => <tr>
            <td>{p.lot_name}</td>
            <td>{p.rough_name}</td>
            <td>{p.price}</td>
            <td>{p.weight} {p.unit}</td>
            <td
                onClick={this.openAddRoughModal.bind(this, p)}
            >edit
            </td>
        </tr>)
        return (
            <div id="person">
                {isAddRoughModalOpen && <AddRough show={isAddRoughModalOpen} closeModal={this.closeAddRoughModal} roughData={selectedRoughData}></AddRough>}
                <div onClick={this.openAddRoughModal.bind(this, null)}>Add Rough</div>
                <Row>
                    <Col xl="7">
                        <Card>
                            <CardBody>
                                <Table className="width-100">
                                    <thead>
                                        <tr>
                                            <th>Lot Name</th>
                                            <th>Rough Name</th>
                                            <th>Price</th>
                                            <th>Weight</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {prepareRows}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Rough;