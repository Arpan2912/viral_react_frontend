import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import PersonService from '../../services/PersonService';
import './Person.css';

const personSampleArray = [
    {
        first_name: "Arpan",
        last_name: "Shah",
        phone: "9033340163",
        email: "shaharpan05@gmail.com",
        address: "Surat",
        designation: "employee"
    }
]
class Person extends Component {
    state = {
        controls: {
            first_name: {
                value: '',
                valid: null,
                touched: false,
                nullValue: null
            },
            last_name: {
                value: '',
                valid: null,
                touched: false,
                nullValue: null
            },
            phone: {
                value: '',
                valid: null,
                touched: false,
                nullValue: null,
                invalidPassword: null
            },
            email: {
                value: '',
                valid: null,
                touched: false,
                nullValue: null,
                invalidPassword: null
            },
            address: {
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
        },
        persons: []
    }

    componentDidMount() {
        this.getPerson();
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

    getPerson = () => {
        PersonService.getPerson()
            .then(data => {
                console.log(data.data);
                const persons = data.data.data.persons;
                this.setState({ persons });
            })
            .catch(e => {

            })
    }

    saveDetail = () => {
        const { controls } = this.state;
        const { first_name, last_name, phone, email, address, designation } = controls;
        console.log("controls", controls);
        let obj = {
            firstName: first_name.value,
            lastName: last_name.value,
            phone: phone.value,
            email: email.value,
            address: address.value,
            designation: designation.value
        }
        PersonService.addPerson(obj)
            .then(data => {
                this.getPerson();
            })
            .catch(e => {

            })
    }

    editPerson = (person) => {
        const { controls } = this.state;
        const { first_name, last_name, phone, email, address, designation } = controls;
        first_name.value = person.first_name;
        last_name.value = person.last_name;
        phone.value = person.phone;
        email.value = person.email;
        address.value = person.address;
        designation.value = person.designation;
        this.setState({ controls });
    }

    render() {
        const { controls, persons } = this.state;
        const { first_name, last_name, phone, email, address, designation } = controls;
        const prepareRows = persons.map(p => <tr>
            <td>{p.first_name}{' '}{p.last_name}</td>
            <td>{p.phone}</td>
            <td>{p.email}</td>
            <td>{p.address}</td>
            <td>{p.designation}</td>
            <td onClick={this.editPerson.bind(this, p)}>edit</td>
        </tr>)
        return (
            <div id="person">
                <Row>
                    <Col xl="7">
                        <Card>
                            <CardBody>
                                <Table className="width-100">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Phone</th>
                                            <th>Email</th>
                                            <th>Address</th>
                                            <th>Designation</th>
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
                    <Col sm="1"></Col>
                    <Col sm="4">
                        <Form>
                            <FormGroup>
                                <Label for="name">First Name</Label>
                                <Input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    value={first_name.value}
                                    onChange={this.handleInputChange}
                                ></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Last Name</Label>
                                <Input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    value={last_name.value}
                                    onChange={this.handleInputChange}
                                ></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="phone">Mobile Number</Label>
                                <Input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={phone.value}
                                    onChange={this.handleInputChange}
                                ></Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={email.value}
                                    onChange={this.handleInputChange}
                                ></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="address">Address</Label>
                                <Input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={address.value}
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