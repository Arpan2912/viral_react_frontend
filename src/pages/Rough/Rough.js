import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import AddRough from '../../modal/AddRough';
import UpdateRough from '../../modal/UpdateRough';
import AddOrUpdateLot from '../../modal/AddOrUpdateLot';
import RoughService from '../../services/RoughService';

import Pagination from '../../components/Pagination/Pagination';

import './Rough.css';
import { formatDate } from '../../utils';

const pageSize = 10;
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
        lotLists: [],
        isEditLot: false,
        roughIdToAddLot: null,
        page: 1,
        totalRecords: 0,
        search: null
    }

    componentDidMount() {
        this.getRoughList(this.state.page);
    }

    openAddRoughModal = (roughData) => {
        this.setState({ isAddRoughModalOpen: true, selectedRoughData: roughData });
    }
    closeAddRoughModal = (reload) => {
        this.setState({ isAddRoughModalOpen: false, selectedRoughData: null });
        if (reload) {
            this.getRoughList(this.state.page, this.state.search);
        }
    }

    openUpdateRoughModal = (roughData) => {
        this.setState({ isUpdateRoughModalOpen: true, selectedRoughData: roughData });
    }
    closeUpdateRoughModal = (reload) => {
        this.setState({ isUpdateRoughModalOpen: false, selectedRoughData: null });
        if (reload) {
            this.getRoughList(this.state.page, this.state.search);
        }
    }

    openLotModal = (lotData, isEdit) => {
        this.setState({ isLotModalOpen: true, selectedLotData: lotData, isEditLot: isEdit });
    }

    closeLotModal = (reload) => {
        if (reload) {
            const roughId = this.state.selectedLotData &&
                this.state.selectedLotData.rough_id ?
                this.state.selectedLotData.rough_id :
                this.state.roughIdToAddLot;

            this.getLotList(roughId);
        }
        this.setState({ isLotModalOpen: false, selectedLotData: null, isEditLot: false });
    }

    getRoughList = (page, search = null) => {
        RoughService.getRoughList(page, pageSize, search)
            .then(data => {
                console.log(data.data.data);
                const roughs = data.data.data.roughs;
                const totalRecords = data.data.data.count;
                this.setState({ roughs, totalRecords });
            })
            .catch(e => {

            })
    }

    getLotList = (roughId) => {
        RoughService.getLotList(roughId)
            .then(data => {
                console.log(data.data.data);
                const lotLists = data.data.data;
                this.setState({ lotLists, roughIdToAddLot: roughId });
            })
            .catch(e => {

            })
    }

    handlePageChange = (page) => {
        this.setState({ page: page });
        this.getRoughList(page, this.state.search);
        // this.getAllDealerReport(page, null, false, uuid);
    }

    handleSearchInput = (e) => {
        const value = e.target.value;
        this.setState({ search: value });
        this.searchRoughData(value);
    }

    searchRoughData = (search) => {
        this.setState({ page: 1 });
        this.getRoughList(1, search);
    }

    render() {
        const {
            roughs, isAddRoughModalOpen, search,
            selectedRoughData, lotLists, isUpdateRoughModalOpen,
            isLotModalOpen, selectedLotData, isEditLot, roughIdToAddLot, page, totalRecords
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
            <td onClick={() => this.openLotModal(p, true)}
            >edit
            </td>
        </tr>)
        return (
            <div id="person">

                {isAddRoughModalOpen &&
                    <AddRough
                        show={isAddRoughModalOpen}
                        closeModal={this.closeAddRoughModal}
                        roughData={selectedRoughData}>
                    </AddRough>
                }

                {isUpdateRoughModalOpen &&
                    <UpdateRough
                        show={isUpdateRoughModalOpen}
                        closeModal={this.closeUpdateRoughModal}
                        roughData={selectedRoughData}>
                    </UpdateRough>
                }

                {isLotModalOpen &&
                    <AddOrUpdateLot
                        show={isLotModalOpen}
                        closeModal={this.closeLotModal}
                        roughData={selectedLotData}
                        isEdit={isEditLot}
                        roughId={roughIdToAddLot}
                    >
                    </AddOrUpdateLot>
                }

                <Row>
                    <Col xl="6">

                        <Card>
                            <CardBody>
                                <Row>
                                    <Col sm="4">
                                        <Input
                                            name="search"
                                            id="search"
                                            type="text"
                                            placeholder="Enter rough name"
                                            onChange={this.handleSearchInput}
                                            value={search}
                                        ></Input>
                                    </Col>
                                    <Col className="text-align-right">
                                        <span className="cursor-pointer" onClick={this.openAddRoughModal.bind(this, null)}>Add Rough</span>
                                    </Col>
                                </Row>

                                <Table className="width-100 margin-top-10">
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
                                {<Pagination
                                    margin={2}
                                    page={page}
                                    pageSize={pageSize}
                                    totalRecords={totalRecords}
                                    onPageChange={this.handlePageChange}
                                ></Pagination>}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="6">
                        <Card>
                            <CardBody>
                                {lotLists && lotLists.length > 0 && <div>Rough Name : {lotLists[0].rough_name}</div>}
                                {roughIdToAddLot && <div className="text-align-right">
                                    <span onClick={() => this.openLotModal(null, false)}>Add Lot</span>
                                </div>
                                }
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