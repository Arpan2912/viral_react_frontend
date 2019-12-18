import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button, Row, Col, Input, Form, FormGroup, Label } from 'reactstrap';
import RoughService from '../services/RoughService';


const defaultRoughNameControls = {
  rough_name: {
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
    const { lot_name, price, unit, weight } = controls;
    let roughArray = [];
    for (let i = 0; i < roughNameControls.length; i++) {
      let currentData = roughNameControls[i];
      let obj = {
        lotName: lot_name.value,
        roughName: currentData.rough_name.value,
        price: price.value,
        weight: weight.value,
        unit: unit.value
      }
      roughArray.push(obj);
    }

    console.log("controls", roughArray);
    let reqObj = {
      roughs: roughArray
    }
    RoughService.addRough(reqObj)
      .then(data => {
        this.props.closeModal(true);
      })
      .catch(e => {

      })
  }

  render() {
    const { controls, roughNameControls } = this.state;
    const { lot_name, weight, price, unit } = controls;

    const preparePlanControls = roughNameControls.map((rc, index) =>
      <Row>
        <Col sm="9">
          <FormGroup>
            <Label for="rough_name">Rough Name</Label>
            <Input
              type="text"
              id="rough_name"
              name="rough_name"
              value={rc.rough_name.value}
              onChange={this.handleRoughNameControlChange.bind(this, index)}
            ></Input>
          </FormGroup>
        </Col>
        <Col sm="3" onClick={this.removeRoughNameControls.bind(this, index)}>
          remove
        </Col>
      </Row>)

    return <Modal isOpen={this.props.show} toggle={this.props.closeModal} >
      <ModalHeader toggle={this.props.closeModal}>Modal title</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="lot_name">Lot Name</Label>
            <Input
              type="text"
              id="lot_name"
              name="lot_name"
              value={lot_name.value}
              onChange={this.handleInputChange}
            ></Input>
          </FormGroup>
          {preparePlanControls}
          <div onClick={this.addRoughNameControls}>add more</div>
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
          <Button onClick={this.saveDetail}>
            Save
          </Button>
        </Form>
      </ModalBody>

    </Modal>
  }
}