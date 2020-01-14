import React, { Component, Fragment } from 'react';
import { Row, Col, Card, CardBody, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Ionicons from 'react-ionicons';

import Pagination from '../../components/Pagination/Pagination';

import RoughService from '../../services/RoughService';

import AddRoughHistory from '../../modal/AddRoughHistory';
import LotHistoryModal from '../../modal/LotHistoryModal';

import { formatDate } from '../../utils';

import './Dashboard.css';

const pageSize = 10;

const planDefaultControls = {
    plan_name: {
        value: '',
        valid: null,
        touched: false,
        nullValue: null
    },
    weight: {
        value: '',
        valid: null,
        touched: false,
        nullValue: null
    },
    unit: {
        value: '',
        valid: null,
        touched: false,
        nullValue: null
    }
}

class Dashboard extends Component {
    state = {
        controls: {
            rough_number: {
                value: '',
                valid: null,
                touched: false,
                nullValue: null
            },
            stage: {
                value: '',
                valid: null,
                touched: false,
                nullValue: null,
                invalidPassword: null
            },
            person: {
                value: '',
                valid: null,
                touched: false,
                nullValue: null,
                invalidPassword: null
            }
        },
        planControls: [JSON.parse(JSON.stringify(planDefaultControls))],
        roughList: [],
        roughHistory: [],
        isAddRoughHistoryModalOpen: false,
        page: 1,
        totalRecords: 0,
        search: null,
        isLotHistoryModalOpen: false
    }

    componentDidMount() {
        this.getRoughList(this.state.page);
    }


    openAddRoughHistoryModal = (roughData) => {
        this.setState({ isAddRoughHistoryModalOpen: true, selectedRoughData: roughData })
    }

    closeAddRoughHistoryModal = (reload) => {
        this.setState({ isAddRoughHistoryModalOpen: false, selectedRoughData: null });
        if (reload) {
            this.getRoughList(this.state.page, this.state.search);
        }
    }

    refreshLotHistory = () => {
        const { roughHistory, selectedRoughData } = this.state;
        console.log("selectedRoughData", selectedRoughData);
        // const { roughs = [] } = roughHistory;
        // if (roughs && roughs.length > 0) {
        // let lotId = selectedRoughData.lot_id;
        this.getLotHistory(selectedRoughData, true);
        // }
    }

    openLotHistoryModal = (roughData, lot) => {
        this.setState({ isLotHistoryModalOpen: true, roughHistory: roughData, selectedRoughData: lot })
    }

    closeLotHistoryModal = () => {
        this.setState({ isLotHistoryModalOpen: false, roughHistory: [], selectedRoughData: null });

    }

    handleInputChange = (e) => {
        const controlName = e.target.name;
        const controlValue = e.target.value;
        const { controls } = this.state;
        controls[controlName].value = controlValue;
        controls[controlName].touched = true;
        this.setState({ controls });
        // this.handleValidation();
    }

    handlePlanControlChange = (index, e) => {
        const controlName = e.target.name;
        const controlValue = e.target.value;
        const { planControls } = this.state;
        planControls[index][controlName].value = controlValue;
        planControls[index][controlName].touched = true;
        this.setState({ planControls });
        // this.handleValidation();
    }

    addPlanControls = () => {
        const { planControls } = this.state;
        planControls.push(JSON.parse(JSON.stringify(planDefaultControls)));
        this.setState({ planControls });
    }

    removePlanControls = (index) => {
        const { planControls } = this.state;
        planControls.splice(index, 1);
        this.setState({ planControls });
    }


    getRoughList = (page, search = null) => {
        RoughService.getRoughs(page, pageSize, search)
            .then(data => {
                const roughList = data.data.data.roughs;
                const totalRecords = data.data.data.count;
                console.log("roughList", roughList);
                this.setState({ roughList, totalRecords });
            })
            .catch(e => {

            })
    }

    getLotHistory = (lot, dontOpenModal) => {
        console.log("getLotHistory", lot);
        const lotId = lot.lot_id;
        RoughService.getLotHistory(lotId)
            .then(data => {
                console.log("data", data.data.data);
                const roughHistory = data.data.data;
                if (dontOpenModal !== true) {
                    this.openLotHistoryModal(roughHistory, lot);
                }
                this.setState({ roughHistory });
            })
            .catch(e => {

            })
    }

    getPlanDetail = (roughId) => {
        RoughService.getPlanDetail(roughId)
            .then(data => {
                const roughList = data.data.roughs;
                this.setState({ roughList });
            })
            .catch(e => {

            })
    }

    getLsDetail = (roughId) => {
        RoughService.getLsDetail(roughId)
            .then(data => {
                const roughList = data.data.roughs;
                this.setState({ roughList });
            })
            .catch(e => {

            })
    }

    getBlockDetail = (roughId) => {
        RoughService.getBlockDetail(roughId)
            .then(data => {
                const roughList = data.data.roughs;
                this.setState({ roughList });
            })
            .catch(e => {

            })
    }

    saveDetail = () => {
        const { controls } = this.state;
        const { rough_number, stage, person } = controls;
        console.log("controls", controls);
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
        const { controls, roughList, roughHistory, planControls, search,
            isAddRoughHistoryModalOpen, selectedRoughData, page, totalRecords,
            isLotHistoryModalOpen
        } = this.state;
        const roughListRows = roughList.map(rl => <tr>
            <td>{rl.rough_name}</td>
            <td>{rl.lot_name}</td>
            <td>{rl.lot_weight} {rl.lot_unit}</td>
            <td>{rl.price}</td>
            <td>{rl.dollar}</td>
            <td>{rl.status}</td>
            <td>{rl.start_date ? formatDate(rl.start_date) : null}</td>
            <td>{rl.end_date ? formatDate(rl.end_date) : null}</td>
            <td>{rl.first_name} {rl.last_name}</td>
            <td>{rl.submitted_first_name} {rl.submitted_last_name}</td>
            <td>
                {/* <span className="cursor-pointer" title="edit"
                    onClick={this.openAddRoughHistoryModal.bind(this, rl)}>
                    <Ionicons icon="md-create" color="#ababab"></Ionicons>
                </span> */}
                <span className="cursor-pointer"
                    onClick={this.getLotHistory.bind(this, rl)} title="history">
                    <Ionicons icon="ios-list-box" color="#ababab"></Ionicons>
                </span>
            </td>
        </tr>)

        return (
            <div id="dashboard">
                {/* {isAddRoughHistoryModalOpen && <AddRoughHistory
                    show={isAddRoughHistoryModalOpen}
                    closeModal={this.closeAddRoughHistoryModal}
                    roughData={selectedRoughData}
                >
                </AddRoughHistory>} */}
                {isLotHistoryModalOpen && <LotHistoryModal
                    show={isLotHistoryModalOpen}
                    closeModal={this.closeLotHistoryModal}
                    roughHistory={roughHistory}
                    refreshLotHistory={this.refreshLotHistory}
                    roughData={selectedRoughData}
                >
                </LotHistoryModal>}
                <Row>
                    <Col>
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
                                </Row>

                                <Table className="width-100 margin-top-10">
                                    <thead>
                                        <tr>
                                            <th>R No</th>
                                            <th>Lot No</th>
                                            <th>Weight</th>
                                            <th>Price</th>
                                            <th>Dollar</th>
                                            <th>Process</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Person</th>
                                            <th>End Person</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {roughListRows}
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
                    {/* <Col sm="2"></Col> */}

                </Row>
                <br />
                {/* <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col>Lot Name</Col>
                                    <Col>Rough Name</Col>
                                    <Col>Status</Col>
                                    <Col>Start Date</Col>
                                    <Col>End Date</Col>
                                    <Col>Person</Col>
                                </Row>
                                <hr />
                                {roughHistoryRows}
                            </CardBody>
                        </Card>
                    </Col>
                </Row> */}

            </div>
        );
    }
}

export default Dashboard;