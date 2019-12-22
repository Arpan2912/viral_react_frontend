import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button, Row, Col, Input, Form, FormGroup, Label } from 'reactstrap';
import DatePicker from "react-datepicker";

import RoughService from '../services/RoughService';



export default class AddOrUpdateLot extends Component {

  state = {
    controls: {
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
      const { lot_name, weight, unit } = controls;
      lot_name.value = roughData.lot_name;
      weight.value = roughData.weight;
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


  updateLotData = () => {
    const { controls } = this.state;
    const { unit, weight, lot_name } = controls;
    const { roughData } = this.props;
    let obj = {
      lotName: lot_name.value,
      weight: weight.value,
      unit: unit.value,
      lotId: roughData.lot_id
    }

    RoughService.updateLotData(obj)
      .then(data => {
        this.props.closeModal(true);
      })
      .catch(e => {

      })
  }

  render() {
    const { controls } = this.state;
    const { weight, unit, lot_name } = controls;

    return <Modal isOpen={this.props.show} toggle={this.props.closeModal} >
      <ModalHeader toggle={this.props.closeModal}>Update Lot</ModalHeader>
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
          <Button onClick={this.updateLotData}>
            Save
          </Button>
        </Form>
      </ModalBody>

    </Modal>
  }
}