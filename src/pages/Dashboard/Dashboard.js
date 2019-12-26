import React, { Component, Fragment } from 'react';
import { Row, Col, Card, CardBody, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';
// import  Ionicons from 'react-ionicons';

import Pagination from '../../components/Pagination/Pagination';

import RoughService from '../../services/RoughService';

import AddRoughHistory from '../../modal/AddRoughHistory';

import { formatDate } from '../../utils';

import './Dashboard.css';
import { throws } from 'assert';

const pageSize = 1;

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
        totalRecords: 0
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
            this.getRoughList(this.state.page);
        }
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


    getRoughList = (page) => {
        RoughService.getRoughs(page, pageSize)
            .then(data => {
                const roughList = data.data.data.roughs;
                const totalRecords = data.data.data.count;
                console.log("roughList", roughList);
                this.setState({ roughList, totalRecords });
            })
            .catch(e => {

            })
    }

    getLotHistory = (lotId) => {
        RoughService.getLotHistory(lotId)
            .then(data => {
                console.log("data", data.data.data);
                const roughHistory = data.data.data.roughs;
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

    addRough = () => {

    }

    addRoughHistory = () => {

    }

    saveDetail = () => {
        const { controls } = this.state;
        const { rough_number, stage, person } = controls;
        console.log("controls", controls);
    }

    handlePageChange = (page) => {
        this.setState({ page: page });
        this.getRoughList(page);
        // this.getAllDealerReport(page, null, false, uuid);
    }

    render() {
        const { controls, roughList, roughHistory, planControls,
            isAddRoughHistoryModalOpen, selectedRoughData, page, totalRecords } = this.state;
        const { rough_number, stage, person } = controls;

        const roughListRows = roughList.map(rl => <tr>
            <td>{rl.lot_name}</td>
            <td>{rl.rough_name}</td>
            <td>{rl.lot_weight} {rl.lot_unit}</td>
            <th>{rl.price}</th>
            <td>{rl.status}</td>
            <td>{rl.start_date ? formatDate(rl.start_date) : null}</td>
            <td>{rl.end_date ? formatDate(rl.end_date) : null}</td>
            <td>{rl.first_name} {rl.last_name}</td>
            <td>
                {rl.status !== 'sale' && <span onClick={this.openAddRoughHistoryModal.bind(this, rl)}>
                    Edit
                    {/* <Ionicons iconName="md-create"></Ionicons> */}
                </span>}&nbsp;
                <span onClick={this.getLotHistory.bind(this, rl.lot_id)}>History</span>
            </td>
        </tr>)

        /* 
        end_date: "2019-12-18T18:50:18.480Z"
        first_name: "yash"
        id: 6
        last_name: "shah"
        start_date: "2019-12-18T18:50:18.480Z"
        status: "polish"
        u_uuid: "73e2a956-c54e-4c76-87d1-a19903370bd2"
        */
        const roughHistoryRows = roughHistory.map(rh => <div>
            <br />

            <Row>
                <Col>{rh.lot_name}</Col>
                <Col>{rh.rough_name}</Col>
                <Col>{rh.status}</Col>
                <Col>{rh.start_date ? formatDate(rh.start_date) : null}</Col>
                <Col>{rh.end_date ? formatDate(rh.end_date) : null}</Col>
                <Col>{rh.first_name} {rh.last_name}</Col>
            </Row>
            {rh.detailData && <div style={{ marginTop: '15px' }}>
                <Row>
                    <Col sm="3" style={{ fontWeight: 'bold' }}>
                        Result
                    </Col>
                    <Col>
                        <table>
                            <tr>
                                <th>Plan Name</th>
                                <th>Weight</th>
                            </tr>
                            {rh.detailData.map(dd => <tr>
                                <td>{dd.stone_name}</td>
                                <td>{dd.weight} {dd.unit}</td>
                            </tr>)}
                        </table>
                    </Col>
                </Row>


            </div>}
        </div>)

        const preparePlanControls = planControls.map((pc, index) =>
            <Row>
                <Col sm="3">
                    <FormGroup>
                        <Label for="plan_name">Ls Label</Label>
                        <Input
                            type="text"
                            id="plan_name"
                            name="plan_name"
                            value={pc.plan_name.value}
                            onChange={this.handlePlanControlChange.bind(this, index)}
                        ></Input>
                    </FormGroup>
                </Col>
                <Col sm="3">
                    <FormGroup>
                        <Label for="weight">Weight</Label>
                        <Input
                            type="text"
                            id="weight"
                            name="weight"
                            value={pc.weight.value}
                            onChange={this.handlePlanControlChange.bind(this, index)}
                        ></Input>
                    </FormGroup>
                </Col>
                <Col sm="3">
                    <FormGroup>
                        <Label for="unit">Unit</Label>
                        <Input
                            type="text"
                            id="unit"
                            name="unit"
                            value={pc.unit.value}
                            onChange={this.handlePlanControlChange.bind(this, index)}
                        ></Input>
                    </FormGroup>
                </Col>
                <Col sm="3" onClick={this.removePlanControls.bind(this, index)}>
                    remove
                </Col>
            </Row>)
        return (
            <div id="dashboard">
                {isAddRoughHistoryModalOpen && <AddRoughHistory
                    show={isAddRoughHistoryModalOpen}
                    closeModal={this.closeAddRoughHistoryModal}
                    roughData={selectedRoughData}
                >
                </AddRoughHistory>}
                <Row>
                    <Col xl="8">
                        <Card>
                            <CardBody>
                                <Table className="width-100">
                                    <thead>
                                        <tr>
                                            <th>Lot No</th>
                                            <th>R No</th>
                                            <th>Weight</th>
                                            <th>Price</th>
                                            <th>Process</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Person</th>
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
                <Row>
                    <Col sm="8">
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
                </Row>

            </div>
        );
    }
}

export default Dashboard;