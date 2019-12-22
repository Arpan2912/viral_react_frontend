import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button, Row, Col, Input, Form, FormGroup, Label } from 'reactstrap';
import DatePicker from "react-datepicker";

import RoughService from '../services/RoughService';


const defaultRoughNameControls = {
  lot_name: {
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

export default class AddRoughHistory extends Component {

  state = {
    controls: {
      lot_name: {
        value: '',
        valid: null,
        touched: false,
        nullValue: null
      },
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
        value: '',
        valid: null,
        touched: false,
        nullValue: null,
        invalidPassword: null
      }
    },
    roughNameControls: [JSON.parse(JSON.stringify(defaultRoughNameControls))]
  }

  constructor() {
    super();
  }

  componentDidMount() {
    const { roughData } = this.props;
    console.log("roughData", roughData);
    if (roughData) {
      const { controls } = this.state;
      const { rough_name, weight, price, lot_name, unit } = controls;
      rough_name.value = roughData.rough_name;
      weight.value = roughData.weight;
      price.value = roughData.price;
      lot_name.value = roughData.lot_name;
      unit.value = roughData.unit;
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

  handleRoughNameControlChange = (index, e) => {
    const controlName = e.target.name;
    const controlValue = e.target.value;
    const { roughNameControls } = this.state;
    roughNameControls[index][controlName].value = controlValue;
    roughNameControls[index][controlName].touched = true;
    this.setState({ roughNameControls });
    // this.handleValidation();
  }

  handleDateChange = date => {
    const { controls } = this.state;
    const { purchase_date } = controls;
    purchase_date.value = date;
    this.setState({ controls });
  };

  addRoughNameControls = () => {
    const { roughNameControls } = this.state;
    roughNameControls.push(JSON.parse(JSON.stringify(defaultRoughNameControls)));
    this.setState({ roughNameControls });
  }

  removeRoughNameControls = (index) => {
    const { roughNameControls } = this.state;
    roughNameControls.splice(index, 1);
    this.setState({ roughNameControls });
  }

  saveDetail = () => {
    const { controls, roughNameControls } = this.state;
    const { rough_name, price, unit, weight, purchase_date } = controls;
    let roughArray = [];
    for (let i = 0; i < roughNameControls.length; i++) {
      let currentData = roughNameControls[i];
      let obj = {
        lotName: currentData.lot_name.value,
        weight: currentData.weight.value,
        unit: currentData.unit.value
      }
      roughArray.push(obj);
    }
    let purchaseDate = purchase_date.value;
    purchaseDate.setHours(15);
    let reqObj = {
      roughName: rough_name.value,
      weight: weight.value,
      price: price.value,
      unit: unit.value,
      purchaseDate: purchaseDate.toISOString(),
      roughs: roughArray
    }
    RoughService.addRough(reqObj)
      .then(data => {
        this.props.closeModal(true);
      })
      .catch(e => {

      })
  }

  updateDetail = () => {
    const { controls, roughNameControls } = this.state;
    const { lot_name, price, unit, weight, rough_name } = controls;
    const { roughData } = this.props;
    let obj = {
      lotName: lot_name.value,
      roughName: rough_name.value,
      price: price.value,
      weight: weight.value,
      unit: unit.value,
      roughId: roughData.rough_id
    }

    RoughService.updateRough(obj)
      .then(data => {
        this.props.closeModal(true);
      })
      .catch(e => {

      })
  }
  render() {
    const { roughData } = this.props;
    const { controls, roughNameControls } = this.state;
    const { weight, price, unit, rough_name, purchase_date, lot_name } = controls;

    const preparePlanControls = roughNameControls.map((rc, index) =>
      <Row>
        <Col sm="3">
          <FormGroup>
            <Label for="lot_name">Lot Name</Label>
            <Input
              type="text"
              id="lot_name"
              name="lot_name"
              value={rc.lot_name.value}
              onChange={this.handleRoughNameControlChange.bind(this, index)}
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
              value={rc.weight.value}
              onChange={this.handleRoughNameControlChange.bind(this, index)}
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
              value={rc.unit.value}
              onChange={this.handleRoughNameControlChange.bind(this, index)}
            ></Input>
          </FormGroup>
        </Col>
        {index !== 0 && <Col sm="3" onClick={this.removeRoughNameControls.bind(this, index)}>
          remove
        </Col>}
      </Row>)

    return <Modal isOpen={this.props.show} toggle={this.props.closeModal} >
      <ModalHeader toggle={this.props.closeModal}>Add Rough</ModalHeader>
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
          </FormGroup>
          {roughData && <FormGroup>
            <Label for="lot_name">Lot Name</Label>
            <Input
              type="text"
              id="lot_name"
              name="lot_name"
              value={lot_name.value}
              onChange={this.handleInputChange}
            ></Input>
          </FormGroup>}
          <FormGroup>
            <Label for="price">Price</Label>
            <Input
              type="text"
              id="price"
              name="price"
              value={price.value}
              onChange={this.handleInputChange}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="weight">Weight</Label>
            <Input
              type="text"
              id="weight"
              name="weight"
              value={weight.value}
              onChange={this.handleInputChange}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="unit">Unit</Label>
            <Input
              type="text"
              id="unit"
              name="unit"
              value={unit.value}
              onChange={this.handleInputChange}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="purchase_date">Purchase Date</Label>
            <DatePicker
              selected={purchase_date.value}
              onChange={this.handleDateChange}
              dateFormat="dd/MM/yyyy"
            />
          </FormGroup>

          {!roughData && <Fragment>
            {preparePlanControls}
            {<div onClick={this.addRoughNameControls}>add more</div>}
          </Fragment>}
          <Button onClick={roughData ? this.updateDetail : this.saveDetail}>
            Save
          </Button>
        </Form>
      </ModalBody>

    </Modal>
  }
}