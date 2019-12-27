import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button, Row, Col, Input, Form, FormGroup, Label } from 'reactstrap';
import DatePicker from "react-datepicker";

import ModalService from '../services/ModalService';
import RoughService from '../services/RoughService';
import Validation from '../services/Validation';


export default class UpdateRough extends Component {

  state = {
    controls: {
      rough_name: {
        value: '',
        valid: null,
        touched: false,
        nullValue: null
      },
      price: {
        value: '',
        valid: null,
        touched: false,
        nullValue: null,
        invalidPassword: null
      },
      weight: {
        value: '',
        valid: null,
        touched: false,
        nullValue: null,
        invalidPassword: null
      },
      purchase_date: {
        value: new Date(),
        valid: null,
        touched: false,
        nullValue: null,
        invalidPassword: null
      },
      unit: {
        value: 'cent',
        valid: null,
        touched: false,
        nullValue: null,
        invalidPassword: null
      }
    }
  }

  constructor() {
    super();
  }

  componentDidMount() {
    const { roughData } = this.props;
    console.log("roughData", roughData);
    if (roughData) {
      const { controls } = this.state;
      const { rough_name, weight, price, unit, purchase_date } = controls;
      rough_name.value = roughData.rough_name;
      weight.value = roughData.weight;
      price.value = roughData.price;
      unit.value = roughData.unit;
      purchase_date.value = new Date(roughData.purchase_date);
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
    let { controls, isFormValid, roughNameControls } = this.state;
    let { rough_name, price, purchase_date, unit, weight } = controls;

    if (firstTime === true || weight.touched === true || isSubmit) {
      weight = Validation.notNullValidator(weight);
      weight.valid = !(weight.nullValue);
      if (((isSubmit || weight.touched) && weight.valid === false)) {
        weight.showErrorMsg = true;
      } else {
        weight.showErrorMsg = false;
      }
    }

    if (firstTime === true || unit.touched === true || isSubmit) {
      unit = Validation.notNullValidator(unit);
      unit.valid = !(unit.nullValue);
      if (((isSubmit || unit.touched) && unit.valid === false)) {
        unit.showErrorMsg = true;
      } else {
        unit.showErrorMsg = false;
      }
    }

    if (firstTime === true || price.touched === true || isSubmit) {
      price = Validation.notNullValidator(price);
      price.valid = !(price.nullValue);
      if (((isSubmit || price.touched) && price.valid === false)) {
        price.showErrorMsg = true;
      } else {
        price.showErrorMsg = false;
      }
    }

    if (firstTime === true || rough_name.touched === true || isSubmit) {
      rough_name = Validation.notNullValidator(rough_name);
      rough_name.valid = !(rough_name.nullValue);
      if (((isSubmit || rough_name.touched) && rough_name.valid === false)) {
        rough_name.showErrorMsg = true;
      } else {
        rough_name.showErrorMsg = false;
      }
    }

    if (firstTime === true || purchase_date.touched === true || isSubmit) {
      purchase_date = Validation.notNullValidator(purchase_date);
      purchase_date.valid = !(purchase_date.nullValue);
      if (((isSubmit || purchase_date.touched) && purchase_date.valid === false)) {
        purchase_date.showErrorMsg = true;
      } else {
        purchase_date.showErrorMsg = false;
      }
    }



    if (
      rough_name.valid === true &&
      weight.valid === true &&
      price.valid === true &&
      unit.valid === true &&
      purchase_date.valid === true
    ) {
      isFormValid = true;
    } else {
      isFormValid = false;
    }

    console.log("controls", controls);
    // console.log('controls', controls);
    // console.log('isFormValid', isBusinessFormValid);
    this.setState({ controls, isFormValid, roughNameControls });
    return isFormValid;
  }

  handleDateChange = date => {
    const { controls } = this.state;
    const { purchase_date } = controls;
    purchase_date.value = date;
    this.setState({ controls });
  };

  updateRoughDetail = () => {
    const { controls } = this.state;
    const { price, unit, weight, rough_name, purchase_date } = controls;
    const isFormValid = this.handleValidation(false, true);
    if (isFormValid === false) {
      return;
    }
    const { roughData } = this.props;
    const purchaseDate = purchase_date.value;
    purchaseDate.setHours(15);
    let obj = {
      roughName: rough_name.value,
      price: price.value,
      weight: weight.value,
      unit: unit.value,
      purchaseDate: purchaseDate.toISOString(),
      roughId: roughData.rough_id
    }

    RoughService.updateRough(obj)
      .then(data => {
        const message = data.data && data.data.message ? data.data.message : null;
        if (message) {
          ModalService.openAlert('Rough', message, 'success');
        }
        this.props.closeModal(true);
      })
      .catch(e => {
        const message = e.response && e.response.data && e.response.data.message ? e.response.data.message : 'Something went wrong';
        ModalService.openAlert('Rough', message, 'error');
      })
  }

  render() {
    const { controls } = this.state;
    const { weight, price, unit, rough_name, purchase_date } = controls;

    return <Modal isOpen={this.props.show} toggle={this.props.closeModal} >
      <ModalHeader toggle={this.props.closeModal}>Update Rough</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="rough_name">Rough Name</Label>
            <Input
              type="text"
              id="rough_name"
              name="rough_name"
              value={rough_name.value}
              onChange={this.handleInputChange}
            ></Input>
            {rough_name.showErrorMsg && <div className="error">* Please enter rough name</div>}
          </FormGroup>
          <FormGroup>
            <Label for="price">Price</Label>
            <Input
              type="number"
              id="price"
              name="price"
              value={price.value}
              onChange={this.handleInputChange}
            ></Input>
            {price.showErrorMsg && <div className="error">* Please enter price</div>}
          </FormGroup>
          <FormGroup>
            <Label for="weight">Weight</Label>
            <Input
              type="number"
              id="weight"
              name="weight"
              value={weight.value}
              onChange={this.handleInputChange}
            ></Input>
            {weight.showErrorMsg && <div className="error">* Please enter weight</div>}
          </FormGroup>
          <FormGroup>
            <Label for="unit">Unit</Label>
            <Input
              type="select"
              id="unit"
              name="unit"
              onChange={this.handleInputChange}
              value={unit.value}
            >
              <option value="cent">Cent</option>
              <option value="carat">Carat</option>
            </Input>
            {/* <Input
              type="text"
              id="unit"
              name="unit"
              value={unit.value}
              onChange={this.handleInputChange}
            ></Input> */}
            {unit.showErrorMsg && <div className="error">* Please enter unit</div>}
          </FormGroup>
          <FormGroup>
            <Label for="purchase_date">Purchase Date</Label>
            <DatePicker
              selected={purchase_date.value}
              onChange={this.handleDateChange}
              dateFormat="dd/MM/yyyy"
            />
          </FormGroup>
          <Button onClick={this.updateRoughDetail}>
            Save
          </Button>
        </Form>
      </ModalBody>

    </Modal>
  }
}