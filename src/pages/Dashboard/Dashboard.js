import React, { Component, Fragment } from 'react';
import { Row, Col, Card, CardBody, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './Dashboard.css';

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


    saveDetail = () => {
        const { controls } = this.state;
        const { rough_number, stage, person } = controls;
        console.log("controls", controls);
    }
    render() {
        const { controls } = this.state;
        const { rough_number, stage, person } = controls;
        return (
            <div id="dashboard">
                <Row>
                    <Col xl="6">
                        <Card>
                            <CardBody>
                                <Table className="width-100">
                                    <thead>
                                        <tr>
                                            <th>R No</th>
                                            <th>Carat</th>
                                            <th>Process</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Person</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>0.5</td>
                                            <td>Galaxy</td>
                                            <td>10/12/19</td>
                                            <td>19/12/19</td>
                                            <td>Arpan</td>
                                            <td>Edit</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="2"></Col>
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

            </div>
        );
    }
}

export default Dashboard;