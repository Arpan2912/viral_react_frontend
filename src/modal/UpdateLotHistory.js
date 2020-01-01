import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button, Row, Col, Input, Form, FormGroup, Label } from 'reactstrap';

import RoughService from '../services/RoughService';
import Validation from '../services/Validation';
import ModalService from '../services/ModalService';

let isLoading = false;

let defaultControls = {
  labour: {
    value: '',
    valid: null,
    touched: false,
    nullValue: null
  },
  dollar: {
    value: '',
    valid: null,
    touched: false,
    nullValue: null
  },

}
export default class UpdateLotHistory extends Component {

  state = {
    controls: JSON.parse(JSON.stringify(defaultControls)),
    isLoading: false
  }

  constructor() {
    super();
  }


  componentDidMount() {
    const { lotHistoryData } = this.props;
    console.log("lotHistoryData", lotHistoryData);
    if (lotHistoryData) {
      const { controls } = this.state;
      const { labour, dollar } = controls;
      labour.value = lotHistoryData.labour_rate;
      dollar.value = lotHistoryData.dollar;
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
    const { lotHistoryData } = this.props;
    const { controls } = this.state;
    const { labour, dollar } = controls;
    if (isLoading === true) {
      return;
    }
    // const isFormValid = this.handleValidation(false, true);
    // if (isFormValid === false) {
    //   return;
    // }
    console.log("controls", controls);
    let obj = {
      labour: labour.value,
      dollar: dollar.value,
      historyId: lotHistoryData.history_id
    }
    this.setState({ isLoading: true });
    isLoading = true;
    RoughService.updateLotHistory(obj)
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
    const { lotHistoryData } = this.props;
    const { controls } = this.state;
    const { labour, dollar } = controls;


    return <Modal isOpen={this.props.show} toggle={this.props.closeModal} >
      <ModalHeader toggle={this.props.closeModal}>Add Person</ModalHeader>
      <ModalBody>
        <Form>
          <Row>
            <Col>
              <FormGroup>
                <Label for="labour">Labour</Label>
                <Input
                  type="number"
                  id="labour"
                  name="labour"
                  value={labour.value}
                  onChange={this.handleInputChange}
                ></Input>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="dollar">Last Name</Label>
                <Input
                  type="text"
                  id="dollar"
                  name="dollar"
                  value={dollar.value}
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

    </Modal>
  }
}