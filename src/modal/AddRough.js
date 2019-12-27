import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button, Row, Col, Input, Form, FormGroup, Label } from 'reactstrap';
import DatePicker from "react-datepicker";

import RoughService from '../services/RoughService';
import Validation from '../services/Validation';
import StorageService from '../services/StorageService';
import ModalService from '../services/ModalService';

let isLoading = false;
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
    value: 'cent',
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
        value: 'cent',
        valid: null,
        touched: false,
        nullValue: null,
        invalidPassword: null
      }
    },
    roughNameControls: [JSON.parse(JSON.stringify(defaultRoughNameControls))],
    isLoading: false
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

  handleValidation = (firstTime, isSubmit) => {
    let { controls, isFormValid, roughNameControls } = this.state;
    let { weight, price, unit, rough_name, purchase_date } = controls;

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

    // if (firstTime === true || price.touched === true || isSubmit) {
    //   price = Validation.notNullValidator(price);
    //   price.valid = !(price.nullValue);
    //   if (((isSubmit || price.touched) && price.valid === false)) {
    //     price.showErrorMsg = true;
    //   } else {
    //     price.showErrorMsg = false;
    //   }
    // }

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

    let roughNameControlsValid = true;
    for (let i = 0; i < roughNameControls.length; i++) {
      const currentData = roughNameControls[i];
      let { lot_name, weight, unit } = currentData;

      if (firstTime === true || lot_name.touched === true || isSubmit) {
        lot_name = Validation.notNullValidator(lot_name);
        lot_name.valid = !(lot_name.nullValue);
        if (((isSubmit || lot_name.touched) && lot_name.valid === false)) {
          lot_name.showErrorMsg = true;
        } else {
          lot_name.showErrorMsg = false;
        }
      }


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

      if (lot_name.valid === true &&
        weight.valid === true &&
        unit.valid === true
      ) {
        roughNameControlsValid = roughNameControlsValid && true
      } else {
        roughNameControlsValid = roughNameControlsValid && false
      }

    }

    if (
      rough_name.valid === true &&
      weight.valid === true &&
      // price.valid === true &&
      unit.valid === true &&
      purchase_date.valid === true &&
      roughNameControlsValid
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
    if (isLoading === true) {
      return;
    }
    const isFormValid = this.handleValidation(false, true);
    if (isFormValid === false) {
      return;
    }
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
    this.setState({ isLoading: true });
    isLoading = true;
    RoughService.addRough(reqObj)
      .then(data => {
        console.log("data.data", data.data);
        const message = data.data && data.data.message ? data.data.message : null;
        if (message) {
          ModalService.openAlert('Rough', message, 'success');
        }
        this.setState({ isLoading: false });
        isLoading = false;
        this.props.closeModal(true);
      })
      .catch(e => {
        console.log("e", e.response);
        const message = e.response && e.response.data && e.response.data.message ? e.response.data.message : 'Something went wrong';
        ModalService.openAlert('Rough', message, 'error');
        this.setState({ isLoading: false });
        isLoading = false;
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
    const { weight, price, unit, rough_name, purchase_date } = controls;
    const userDetail = StorageService.getUserDetail();
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
            {rc.lot_name.showErrorMsg && <div className="error">* Please enter lot name</div>}
          </FormGroup>
        </Col>
        <Col sm="3">
          <FormGroup>
            <Label for="weight">Weight</Label>
            <Input
              type="number"
              id="weight"
              name="weight"
              value={rc.weight.value}
              onChange={this.handleRoughNameControlChange.bind(this, index)}
            ></Input>
            {rc.weight.showErrorMsg && <div className="error">* Please enter weight</div>}
          </FormGroup>
        </Col>
        <Col sm="3">
          <FormGroup>
            <Label for="unit">Unit</Label>
            <Input
              type="select"
              id="unit"
              name="unit"
              onChange={this.handleRoughNameControlChange.bind(this, index)}
              value={rc.unit.value}
            >
              <option value="cent">Cent</option>
              <option value="carat">Carat</option>
            </Input>
            {rc.unit.showErrorMsg && <div className="error">* Please enter unit</div>}
            {/* <Input
              type="text"
              id="unit"
              name="unit"
              value={rc.unit.value}
              onChange={this.handleRoughNameControlChange.bind(this, index)}
            ></Input> */}
            {/* {rc.unit.showErrorMsg && <div className="error">* Please enter unit</div>} */}
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
            {rough_name.showErrorMsg && <div className="error">* Please enter rough name</div>}
          </FormGroup>
          {/* {roughData && <FormGroup>
            <Label for="lot_name">Lot Name</Label>
            <Input
              type="text"
              id="lot_name"
              name="lot_name"
              value={lot_name.value}
              onChange={this.handleInputChange}
            ></Input>
          </FormGroup>} */}
          {userDetail && userDetail.type === 'admin' && <FormGroup>
            <Label for="price">Price</Label>
            <Input
              type="nnumber"
              id="price"
              name="price"
              value={price.value}
              onChange={this.handleInputChange}
            ></Input>
            {price.showErrorMsg && <div className="error">* Please enter price</div>}
          </FormGroup>}
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
            {unit.showErrorMsg && <div className="error">* Please enter unit</div>}
            {/* <Input
              type="text"
              id="unit"
              name="unit"
              value={unit.value}
              onChange={this.handleInputChange}
            ></Input> */}
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