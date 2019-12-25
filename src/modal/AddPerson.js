import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button, Row, Col, Input, Form, FormGroup, Label } from 'reactstrap';

import PersonService from '../services/PersonService';
import Validation from '../services/Validation';

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

  handleValidation = (firstTime, isSubmit) => {
    let { controls, isFormValid } = this.state;
    let { first_name, last_name, phone, email, address, designation, company } = controls;

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

  saveDetail = () => {
    const { controls } = this.state;
    const { first_name, last_name, phone, email, address, designation, company } = controls;
    const isFormValid = this.handleValidation(false, true);
    if (isFormValid === false) {
      return;
    }
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
    const isFormValid = this.handleValidation(false, true);
    if (isFormValid === false) {
      return;
    }
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
            {first_name.showErrorMsg && <div className="error">* Please enter first name</div>}

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
            {last_name.showErrorMsg && <div className="error">* Please enter last name</div>}
          </FormGroup>
          <FormGroup>
            <Label for="phone">Mobile Number</Label>
            <Input
              type="number"
              id="phone"
              name="phone"
              value={phone.value}
              onChange={this.handleInputChange}
            ></Input>
            {phone.showErrorMsg && <div className="error">* Please enter phone number</div>}

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
            {email.showErrorMsg && <div className="error">* Please enter valid email address</div>}

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
            {address.showErrorMsg && <div className="error">* Please enter  address</div>}

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
            {designation.showErrorMsg && <div className="error">* Please enter designation</div>}

          </FormGroup>

          <Button onClick={personData ? this.updatePerson : this.saveDetail}>
            Save
          </Button>
        </Form>
      </ModalBody>

    </Modal>
  }
}