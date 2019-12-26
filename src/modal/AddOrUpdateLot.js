import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button, Row, Col, Input, Form, FormGroup, Label } from 'reactstrap';
import DatePicker from "react-datepicker";

import RoughService from '../services/RoughService';
import Validation from '../services/Validation';


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

  handleValidation = (firstTime, isSubmit) => {
    let { controls, isFormValid, roughNameControls } = this.state;
    let { lot_name, unit, weight } = controls;

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

    if (firstTime === true || lot_name.touched === true || isSubmit) {
      lot_name = Validation.notNullValidator(lot_name);
      lot_name.valid = !(lot_name.nullValue);
      if (((isSubmit || lot_name.touched) && lot_name.valid === false)) {
        lot_name.showErrorMsg = true;
      } else {
        lot_name.showErrorMsg = false;
      }
    }

    if (
      lot_name.valid === true &&
      weight.valid === true &&
      unit.valid === true
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

  addLotData = () => {
    const { controls } = this.state;
    const { isEdit, roughId } = this.props;
    const { unit, weight, lot_name } = controls;
    const isFormValid = this.handleValidation(false, true);
    if (isFormValid === false) {
      return;
    }
    if (isEdit === true) {
      return;
    }
    let obj = {
      lotName: lot_name.value,
      weight: weight.value,
      unit: unit.value,
      roughId
    }

    RoughService.addLotData(obj)
      .then(data => {
        this.props.closeModal(true);
      })
      .catch(e => {

      })
  }

  updateLotData = () => {
    const { controls } = this.state;
    const { unit, weight, lot_name } = controls;
    const isFormValid = this.handleValidation(false, true);
    if (isFormValid === false) {
      return;
    }
    const { isEdit } = this.props;
    const { roughData } = this.props;
    if (isEdit === false) {
      return;
    }
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
    const { isEdit } = this.props;
    return <Modal isOpen={this.props.show} toggle={this.props.closeModal} >
      <ModalHeader toggle={this.props.closeModal}>{isEdit ? 'Update' : 'Add'} Lot</ModalHeader>
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
            {lot_name.showErrorMsg && <div className="error">* Please enter lot name</div>}
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
              type="text"
              id="unit"
              name="unit"
              value={unit.value}
              onChange={this.handleInputChange}
            ></Input>
            {unit.showErrorMsg && <div className="error">* Please enter unit</div>}
          </FormGroup>
          <Button onClick={isEdit ? this.updateLotData : this.addLotData}>
            Save
          </Button>
        </Form>
      </ModalBody>

    </Modal>
  }
}