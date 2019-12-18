import React, { Component, Fragment } from 'react';
import { Row, Col, Card, CardBody, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import RoughService from '../../services/RoughService';

import './Dashboard.css';

const roughListSampleArray = [
    {
        lot_name: "1",
        rough_name: "Shah",
        Weight: "500",
        unit: "cent",
        price: "100",
        process: 'galaxy',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        person: "Arpan"
    }
]

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
        roughList: [],
        roughHistory: []
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

    componentDidMount() {
        this.getRoughList();
    }

    getRoughList = () => {
        RoughService.getRoughList()
            .then(data => {
                const roughList = data.data.data.roughs;
                console.log("roughList", roughList);
                this.setState({ roughList });
            })
            .catch(e => {

            })
    }

    getRoughHistory = (roughId) => {
        RoughService.getRoughHistory(roughId)
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
    render() {
        const { controls, roughList, roughHistory } = this.state;
        const { rough_number, stage, person } = controls;

        const roughListRows = roughList.map(rl => <tr>
            <td>{rl.lot_name}</td>
            <td>{rl.rough_name}</td>
            <td>{rl.weight} {rl.unit}</td>
            <th>{rl.price}</th>
            <td>{rl.status}</td>
            <td>{rl.start_date}</td>
            <td>{rl.end_date}</td>
            <td>{rl.first_name} {rl.last_name}</td>
            <td>
                <span>Edit</span>
                <span onClick={this.getRoughHistory.bind(this, rl.rough_id)}>History</span>
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
            <div>
                <span>{rh.status} {rh.start_date}{rh.end_date} -> {rh.first_name} {rh.last_name}</span>
            </div>
            {rh.detailData && <div>
                {rh.detailData.map(dd => <div>
                    {dd.plan_name} {dd.weight} {dd.unit}
                </div>)}
            </div>}
        </div>)
        return (
            <div id="dashboard">
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
                            </CardBody>
                        </Card>
                    </Col>
                    {/* <Col sm="2"></Col> */}
                    <Col sm="4">
                        <Form>
                            <FormGroup>
                                <Label for="rough_number">Rough Number</Label>
                                <Input
                                    type="text"
                                    id="rough_number"
                                    name="rough_number"
                                    value={rough_number.value}
                                    onChange={this.handleInputChange}
                                ></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="stage">Stage</Label>
                                <Input
                                    type="select"
                                    id="stage"
                                    name="stage"
                                    onChange={this.handleInputChange}
                                    value={stage.value}
                                >
                                    <option value="galaxy">Galaxy</option>
                                    <option value="galaxy_end">Galaxy End</option>
                                    <option value="planning">Plannig</option>
                                    <option value="planning_end">Plannig End</option>
                                    <option value="ls">Ls</option>
                                    <option value="ls_end">Ls End</option>
                                    <option value="hpht">HPHT</option>
                                    <option value="hpht_end">HPHT End</option>
                                    <option value="block">Block</option>
                                    <option value="block_end"> Block End</option>
                                    <option value="polish">Polish</option>
                                    <option value="polish_end">Polish End</option>
                                </Input>
                            </FormGroup>
                            {stage.value === 'ls_end' && <Fragment>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label for="rough_number">Ls Label</Label>
                                            <Input
                                                type="text"
                                                id="rough_number"
                                                name="rough_number"
                                                value={rough_number.value}
                                                onChange={this.handleInputChange}
                                            ></Input>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="rough_number">Weight</Label>
                                            <Input
                                                type="text"
                                                id="rough_number"
                                                name="rough_number"
                                                value={rough_number.value}
                                                onChange={this.handleInputChange}
                                            ></Input>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="rough_number">Unit</Label>
                                            <Input
                                                type="text"
                                                id="rough_number"
                                                name="rough_number"
                                                value={rough_number.value}
                                                onChange={this.handleInputChange}
                                            ></Input>
                                        </FormGroup>
                                    </Col>


                                </Row>
                            </Fragment>}
                            {stage.value === 'block_end' && <Fragment>
                                <FormGroup>
                                    <Label for="rough_number">Block Label</Label>
                                    <Input
                                        type="text"
                                        id="rough_number"
                                        name="rough_number"
                                        value={rough_number.value}
                                        onChange={this.handleInputChange}
                                    ></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="rough_number">Weight</Label>
                                    <Input
                                        type="text"
                                        id="rough_number"
                                        name="rough_number"
                                        value={rough_number.value}
                                        onChange={this.handleInputChange}
                                    ></Input>
                                </FormGroup>
                            </Fragment>}
                            <FormGroup>
                                <Label for="person">Person</Label>
                                <Input
                                    type="select"
                                    id="person"
                                    name="person"
                                    onChange={this.handleInputChange}
                                    value={person.value}
                                >
                                    <option value="Arpan">Arpan</option>
                                </Input>
                            </FormGroup>

                            <Button onClick={this.saveDetail}>
                                Save
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xl="6">
                        <Card>
                            <CardBody>
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