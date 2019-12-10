import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './Person.css';

class Person extends Component {
    state = {
        controls: {
            name: {
                value: '',
                valid: null,
                touched: false,
                nullValue: null
            },
            number: {
                value: '',
                valid: null,
                touched: false,
                nullValue: null,
                invalidPassword: null
            },
            designation: {
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
        const { name, number, designation } = controls;
        console.log("controls", controls);
    }
    render() {
        const { controls } = this.state;
        const { name, number, designation } = controls;
        return (
            <div id="person">
                <Row>
                    <Col xl="6">
                        <Card>
                            <CardBody>
                                <Table className="width-100">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Number</th>
                                            <th>Designation</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>0.5</td>
                                            <td>Galaxy</td>
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
                                <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name.value}
                                    onChange={this.handleInputChange}
                                ></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="number">Mobile Number</Label>
                                <Input
                                    type="text"
                                    id="number"
                                    name="number"
                                    value={number.value}
                                    onChange={this.handleInputChange}
                                ></Input>
                            </FormGroup>
                          
                            <FormGroup>
                                <Label for="designation">Designation</Label>
                                <Input
                                    type="text"
                                    id="designation"
                                    name="designation"
                                    value={designation.value}
                                    onChange={this.handleInputChange}
                                ></Input>
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

export default Person;