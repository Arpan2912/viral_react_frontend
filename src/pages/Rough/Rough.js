import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import AddRough from '../../modal/AddRough';
import UpdateRough from '../../modal/UpdateRough';
import AddOrUpdateLot from '../../modal/AddOrUpdateLot';
import RoughService from '../../services/RoughService';
import './Rough.css';
import { formatDate } from '../../utils';

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
        isUpdateRoughModalOpen: false,
        isLotModalOpen: false,
        selectedRoughData: null,
        selectedLotData: null,
        lotLists: []
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

    openUpdateRoughModal = (roughData) => {
        this.setState({ isUpdateRoughModalOpen: true, selectedRoughData: roughData });
    }
    closeUpdateRoughModal = (reload) => {
        this.setState({ isUpdateRoughModalOpen: false, selectedRoughData: null });
        if (reload) {
            this.getRoughList();
        }
    }

    openLotModal = (lotData) => {
        this.setState({ isLotModalOpen: true, selectedLotData: lotData });
    }
    closeLotModal = (reload) => {
        if (reload) {
            const selectedLotData = this.state.selectedLotData;
            console.log("selectedLotData", selectedLotData);
            this.getLotList(selectedLotData.rough_id);
        }
        this.setState({ isLotModalOpen: false, selectedLotData: null });
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

    getLotList = (roughId) => {
        RoughService.getLotList(roughId)
            .then(data => {
                console.log(data.data.data);
                const lotLists = data.data.data;
                this.setState({ lotLists });
            })
            .catch(e => {

            })
    }


    render() {
        const {
            roughs, isAddRoughModalOpen,
            selectedRoughData, lotLists, isUpdateRoughModalOpen,
            isLotModalOpen, selectedLotData
        } = this.state;
        const prepareRows = roughs.map(p => <tr>
            <td onClick={this.getLotList.bind(this, p.rough_id)} >{p.rough_name}</td>
            <td>{p.price}</td>
            <td>{p.weight} {p.unit}</td>
            <td>{formatDate(p.purchase_date)}</td>
            <td onClick={this.openUpdateRoughModal.bind(this, p)}
            >edit
            </td>
        </tr>)
        const prepareLotsListRows = lotLists.map(p => <tr>
            <td>{p.lot_name}</td>
            <td>{p.weight} {p.unit}</td>
            <td onClick={this.openLotModal.bind(this, p)}
            >edit
            </td>
        </tr>)
        return (
            <div id="person">
                {isAddRoughModalOpen && <AddRough show={isAddRoughModalOpen} closeModal={this.closeAddRoughModal} roughData={selectedRoughData}></AddRough>}
                {isUpdateRoughModalOpen && <UpdateRough show={isUpdateRoughModalOpen} closeModal={this.closeUpdateRoughModal} roughData={selectedRoughData}></UpdateRough>}
                {isLotModalOpen && <AddOrUpdateLot show={isLotModalOpen} closeModal={this.closeLotModal} roughData={selectedLotData}></AddOrUpdateLot>}
                <div onClick={this.openAddRoughModal.bind(this, null)}>Add Rough</div>
                <Row>
                    <Col xl="6">
                        <Card>
                            <CardBody>
                                <Table className="width-100">
                                    <thead>
                                        <tr>
                                            <th>Rough Name</th>
                                            <th>Price</th>
                                            <th>Weight</th>
                                            <th>Purchase Date</th>
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
                    <Col xl="6">
                        <Card>
                            <CardBody>
                                {lotLists && lotLists.length > 0 && <div>Rough Name : {lotLists[0].rough_name}</div>}
                                <Table className="width-100">
                                    <thead>
                                        <tr>
                                            <th>Lot Name</th>
                                            <th>Weight</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {prepareLotsListRows}
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