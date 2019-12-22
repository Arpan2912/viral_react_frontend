import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button, Row, Col, Input, Form, FormGroup, Label } from 'reactstrap';
import PersonService from '../services/PersonService';


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
export default class AddPerson extends Component {

  state = {
    controls: JSON.parse(JSON.stringify(defaultControls))
  }

  constructor() {
    super();
  }


  componentDidMount() {
    const { personData } = this.props;
    console.log("personData", personData);
    if (personData) {
      const { controls } = this.state;
      const { first_name, last_name, phone, email, address, company, designation } = controls;
      first_name.value = personData.first_name;
      last_name.value = personData.last_name;
      phone.value = personData.phone;
      email.value = personData.email;
      address.value = personData.address;
      company.value = personData.company;
      designation.value = personData.designation;
      this.setState({ controls });
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
    const { first_name, last_name, phone, email, address, designation, company } = controls;
    console.log("controls", controls);
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
        this.props.closeModal(true);
        // this.resetControls();
      })
      .catch(e => {

      })
  }

  updatePerson = () => {
    const { personData } = this.props;
    const { controls } = this.state;
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
      personId: personData.uuid
    }
    PersonService.updatePerson(obj)
      .then(data => {
        this.props.closeModal(true);
        // this.getPerson();
        // this.resetControls();
      })
      .catch(e => {

      })
  }

  render() {
    const { personData } = this.props;
    const { controls } = this.state;
    const { first_name, last_name, phone, email, address, designation, company } = controls;


    return <Modal isOpen={this.props.show} toggle={this.props.closeModal} >
      <ModalHeader toggle={this.props.closeModal}>Add Person</ModalHeader>
      <ModalBody>
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
            <Label for="company">Company</Label>
            <Input
              type="text"
              id="company"
              name="company"
              value={company.value}
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

          <Button onClick={personData ? this.updatePerson : this.saveDetail}>
            Save
          </Button>
        </Form>
      </ModalBody>

    </Modal>
  }
}