import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Button, Row, Col, Input, Form, FormGroup, Label } from 'reactstrap';

import RoughService from '../services/RoughService';
import Validation from '../services/Validation';
import ModalService from '../services/ModalService';

let isLoading = false;

export default class UpdateStoneToProcess extends Component {

  state = {
    controls: {
      stone_name: {
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
      },
      cut: {
        value: '',
        valid: null,
        touched: false,
        nullValue: null
      },
      shape: {
        value: '',
        valid: null,
        touched: false,
        nullValue: null
      },
      color: {
        value: '',
        valid: null,
        touched: false,
        nullValue: null
      },
      purity: {
        value: '',
        valid: null,
        touched: false,
        nullValue: null
      },
    },
    isLoading: false
  }

  constructor() {
    super();
  }


  componentDidMount() {
    const { stoneToProcessData } = this.props;
    console.log("lotHistoryData", stoneToProcessData);
    if (stoneToProcessData) {
      const { controls } = this.state;
      const { color, purity, cut, shape, stone_name, weight, unit } = controls;
      stone_name.value = stoneToProcessData.stone_name;
      weight.value = stoneToProcessData.weight;
      unit.value = stoneToProcessData.unit;
      cut.value = stoneToProcessData.cut;
      shape.value = stoneToProcessData.shape;
      color.value = stoneToProcessData.color;
      purity.value = stoneToProcessData.purity;
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
    let { labour, dollar } = controls;



    // if (
    //   first_name.valid === true &&
    //   last_name.valid === true &&
    //   email.valid === true &&
    //   phone.valid === true &&
    //   email.valid === true &&
    //   address.valid === true &&
    //   designation.valid === true
    // ) {
    //   isFormValid = true;
    // } else {
    //   isFormValid = false;
    // }

    // console.log("controls", controls);
    // // console.log('controls', controls);
    // // console.log('isFormValid', isBusinessFormValid);
    // this.setState({ controls, isFormValid });
    // return isFormValid;
  }

  saveDetail = () => {
    const { stoneToProcessData, roughData, isResult } = this.props;
    const { controls } = this.state;
    const { shape, color, stone_name, cut, weight, unit, purity } = controls;
    console.log("this.props", this.props);
    if (isLoading === true) {
      return;
    }
    if (isResult === null) {
      return;
    }
    // const isFormValid = this.handleValidation(false, true);
    // if (isFormValid === false) {
    //   return;
    // }
    console.log("controls", controls);
    let obj = {
      stoneName: stone_name.value,
      weight: weight.value,
      unit: unit.value,
      cut: cut.value,
      shape: shape.value,
      color: color.value,
      purity: purity.value,
      status: stoneToProcessData.status,
      lotId: roughData.lot_id,
      historyId: stoneToProcessData.history_id,
      stoneToProcessId: stoneToProcessData.uuid,
      resultId: stoneToProcessData.uuid
    }
    this.setState({ isLoading: true });
    isLoading = true;
    let func = null;
    if (isResult === true) {
      func = RoughService.updateStatusEndResult(obj)
    } else if (isResult === false) {
      func = RoughService.updateStoneToProcess(obj)
    }
    if (func === null) {
      return;
    }
    func
      .then(data => {
        const message = data.data && data.data.message ? data.data.message : null;
        if (message) {
          ModalService.openAlert('Lot', message, 'success');
        }
        this.setState({ isLoading: false });
        isLoading = false;
        this.props.closeModal(true);
        // this.resetControls();
      })
      .catch(e => {
        this.setState({ isLoading: false });
        isLoading = false;
      })
  }

  render() {
    const { stoneToProcessData } = this.props;
    const { controls } = this.state;
    const { stone_name, weight, unit, cut, shape, color, purity } = controls;


    return <Modal isOpen={this.props.show} toggle={this.props.closeModal} >
      <ModalHeader toggle={this.props.closeModal}>Update Stone Detail</ModalHeader>
      <ModalBody>
        <Form>
          <Row>
            <Col>
              <FormGroup>
                <Label for="stone_name">Kapan</Label>
                <Input
                  type="text"
                  id="stone_name"
                  name="stone_name"
                  value={stone_name.value}
                  disabled
                  onChange={this.handleInputChange}
                ></Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="weight">Weight</Label>
                <Input
                  type="number"
                  id="weight"
                  name="weight"
                  value={weight.value}
                  onChange={this.handleInputChange}
                ></Input>
                {/* {dollar.showErrorMsg && <div className="error">* Please enter last name</div>} */}
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="unit">Unit</Label>
                <Input
                  type="text"
                  id="unit"
                  name="unit"
                  value={unit.value}
                  onChange={this.handleInputChange}
                ></Input>
                {/* {dollar.showErrorMsg && <div className="error">* Please enter last name</div>} */}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="cut">Cut</Label>
                <Input
                  type="text"
                  id="cut"
                  name="cut"
                  value={cut.value}
                  onChange={this.handleInputChange}
                ></Input>
                {/* {dollar.showErrorMsg && <div className="error">* Please enter last name</div>} */}
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="shape">Shape</Label>
                <Input
                  type="text"
                  id="shape"
                  name="shape"
                  value={shape.value}
                  onChange={this.handleInputChange}
                ></Input>
                {/* {dollar.showErrorMsg && <div className="error">* Please enter last name</div>} */}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="color">Color</Label>
                <Input
                  type="text"
                  id="color"
                  name="color"
                  value={color.value}
                  onChange={this.handleInputChange}
                ></Input>
                {/* {dollar.showErrorMsg && <div className="error">* Please enter last name</div>} */}
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="purity">Purity</Label>
                <Input
                  type="text"
                  id="purity"
                  name="purity"
                  value={purity.value}
                  onChange={this.handleInputChange}
                ></Input>
                {/* {dollar.showErrorMsg && <div className="error">* Please enter last name</div>} */}
              </FormGroup>
            </Col>
          </Row>

          <Button onClick={this.saveDetail}>
            Save
          </Button>
        </Form>
      </ModalBody>

    </Modal >
  }
}