import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import PersonService from '../../services/PersonService';
import Validation from '../../services/Validation';

import AddPerson from '../../modal/AddPerson';
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

let defaultControls = {
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
    company: {
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
    },
}
class Person extends Component {
    state = {
        // controls: {
        //     first_name: {
        //         value: '',
        //         valid: null,
        //         touched: false,
        //         nullValue: null
        //     },
        //     last_name: {
        //         value: '',
        //         valid: null,
        //         touched: false,
        //         nullValue: null
        //     },
        //     phone: {
        //         value: '',
        //         valid: null,
        //         touched: false,
        //         nullValue: null,
        //         invalidPassword: null
        //     },
        //     email: {
        //         value: '',
        //         valid: null,
        //         touched: false,
        //         nullValue: null,
        //         invalidPassword: null
        //     },
        //     address: {
        //         value: '',
        //         valid: null,
        //         touched: false,
        //         nullValue: null,
        //         invalidPassword: null
        //     },
        //     designation: {
        //         value: '',
        //         valid: null,
        //         touched: false,
        //         nullValue: null,
        //         invalidPassword: null
        //     }
        // },
        controls: JSON.parse(JSON.stringify(defaultControls)),
        persons: [],
        selectedPersonToUpdate: null,
        isAddPersonModalOpen: false
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


    handleValidation = (firstTime, isSubmit) => {
        let { controls, isFormValid } = this.state;
        const { first_name, last_name, phone, email, address, designation, company } = controls;

        if (firstTime === true || first_name.touched === true || isSubmit) {
            first_name = Validation.notNullValidator(first_name);
            first_name.valid = !(first_name.nullValue);
            if (((isSubmit || first_name.touched) && first_name.valid === false)) {
                first_name.showErrorMsg = true;
            } else {
                first_name.showErrorMsg = false;
            }
        }

        if (firstTime === true || last_name.touched === true || isSubmit) {
            last_name = Validation.notNullValidator(last_name);
            last_name.valid = !(last_name.nullValue);
            if (((isSubmit || last_name.touched) && last_name.valid === false)) {
                last_name.showErrorMsg = true;
            } else {
                last_name.showErrorMsg = false;
            }
        }

        if (firstTime === true || phone.touched === true || isSubmit) {
            phone = Validation.notNullValidator(phone);
            phone.valid = !(phone.nullValue);
            if (((isSubmit || phone.touched) && phone.valid === false)) {
                phone.showErrorMsg = true;
            } else {
                phone.showErrorMsg = false;
            }
        }


        if (firstTime === true || email.touched === true || isSubmit) {
            email = Validation.notNullValidator(email);
            email = Validation.emailValidator(email);
            email.valid = !(email.invalidEmail);
            if (((isSubmit || email.touched) && email.valid === false)) {
                email.showErrorMsg = true;
            } else {
                email.showErrorMsg = false;
            }
        }

        if (firstTime === true || address.touched === true || isSubmit) {
            address = Validation.notNullValidator(address);
            address.valid = !(address.nullValue);
            if (((isSubmit || address.touched) && address.valid === false)) {
                address.showErrorMsg = true;
            } else {
                address.showErrorMsg = false;
            }
        }

        if (firstTime === true || designation.touched === true || isSubmit) {
            designation = Validation.notNullValidator(designation);
            designation.valid = !(designation.nullValue);
            if (((isSubmit || designation.touched) && designation.valid === false)) {
                designation.showErrorMsg = true;
            } else {
                designation.showErrorMsg = false;
            }
        }

        if (
            first_name.valid === true &&
            last_name.valid === true &&
            email.valid === true &&
            phone.valid === true &&
            email.valid === true &&
            address.valid === true &&
            designation.valid === true
        ) {
            isFormValid = true;
        } else {
            isFormValid = false;
        }

        console.log("controls", controls);
        // console.log('controls', controls);
        // console.log('isFormValid', isBusinessFormValid);
        this.setState({ controls, isFormValid });
        return isFormValid;
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
        const { first_name, last_name, phone, email, address, designation, company } = controls;
        const isFormValid = this.handleValidation(false, true);
        if (isFormValid === false) {
            return;
        }
        let obj = {
            firstName: first_name.value,
            lastName: last_name.value,
            phone: phone.value,
            email: email.value,
            address: address.value,
            company: company.value,
            designation: designation.value
        }
        PersonService.addPerson(obj)
            .then(data => {
                this.getPerson();
                this.resetControls();
            })
            .catch(e => {

            })
    }

    editPerson = (person) => {
        const { controls } = this.state;
        const { first_name, last_name, phone, email, address, designation, company } = controls;
        first_name.value = person.first_name;
        last_name.value = person.last_name;
        phone.value = person.phone;
        email.value = person.email;
        address.value = person.address;
        designation.value = person.designation;
        company.value = person.company;
        this.setState({ controls, selectedPersonToUpdate: person });
    }

    updatePerson = () => {
        const { controls, selectedPersonToUpdate } = this.state;
        const { first_name, last_name, phone, email, address, designation, company } = controls;
        console.log("controls", controls);
        let obj = {
            firstName: first_name.value,
            lastName: last_name.value,
            phone: phone.value,
            email: email.value,
            address: address.value,
            designation: designation.value,
            company: company.value,
            personId: selectedPersonToUpdate.uuid
        }
        PersonService.updatePerson(obj)
            .then(data => {
                this.getPerson();
                this.resetControls();
            })
            .catch(e => {

            })
    }

    resetControls = () => {
        const controls = JSON.parse(JSON.stringify(defaultControls));
        this.setState({ controls, selectedPersonToUpdate: null });
    }

    openAddPersonModal = (personData) => {
        this.setState({ isAddPersonModalOpen: true, selectedPersonToUpdate: personData });
    }
    closeAddPersonModal = (reload) => {
        this.setState({ isAddPersonModalOpen: false, selectedPersonToUpdate: null });
        if (reload) {
            this.getPerson();
        }
    }

    render() {
        const { controls, persons, selectedPersonToUpdate, isAddPersonModalOpen } = this.state;
        const { first_name, last_name, phone, email, address, designation, company } = controls;
        const prepareRows = persons.map(p => <tr>
            <td>{p.first_name}{' '}{p.last_name}</td>
            <td>{p.phone}</td>
            <td>{p.email}</td>
            <td>{p.address}</td>
            <td>{p.company}</td>
            <td>{p.designation}</td>
            <td onClick={this.openAddPersonModal.bind(this, p)}>edit</td>
        </tr>)
        return (
            <div id="person">
                {isAddPersonModalOpen &&
                    <AddPerson
                        show={isAddPersonModalOpen}
                        closeModal={this.closeAddPersonModal}
                        personData={selectedPersonToUpdate}>
                    </AddPerson>}
                <div onClick={this.openAddPersonModal.bind(this, null)}>Add Person</div>
                <Row>
                    <Col xl="10">
                        <Card>
                            <CardBody>
                                <Table className="width-100">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Phone</th>
                                            <th>Email</th>
                                            <th>Address</th>
                                            <th>Company</th>
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
                </Row>

            </div>
        );
    }
}

export default Person;