import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button, Row, Col, Input, Form, FormGroup, Label } from 'reactstrap';
import RoughService from '../services/RoughService';


const planDefaultControls = {
  plan_name: {
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
      rough_name: {
        value: '',
        valid: null,
        touched: false,
        nullValue: null
      },
      status: {
        value: '',
        valid: null,
        touched: false,
        nullValue: null,
        invalidPassword: null
      },
      person: {
        value: '',
        valid: null,
        touched: false,
        nullValue: null,
        invalidPassword: null
      }
    },
    oldStatus: null,
    planControls: [JSON.parse(JSON.stringify(planDefaultControls))],
    planDetail: []
  }

  constructor() {
    super();
  }

  componentDidMount() {
    const { roughData } = this.props;
    const { controls } = this.state;
    const { rough_name, status, person } = controls;
    rough_name.value = roughData.rough_name;
    status.value = roughData.status;

    this.setState({ controls, oldStatus: roughData.status });
    if (roughData.status) {
      this.getPlanDetail(roughData.rough_id)
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

  handlePlanControlChange = (index, e) => {
    const controlName = e.target.name;
    const controlValue = e.target.value;
    const { planControls } = this.state;
    planControls[index][controlName].value = controlValue;
    planControls[index][controlName].touched = true;
    this.setState({ planControls });
    // this.handleValidation();
  }

  addPlanControls = () => {
    const { planControls } = this.state;
    planControls.push(JSON.parse(JSON.stringify(planDefaultControls)));
    this.setState({ planControls });
  }

  removePlanControls = (index) => {
    const { planControls } = this.state;
    planControls.splice(index, 1);
    this.setState({ planControls });
  }

  saveDetail = () => {
    const { controls, planControls, oldStatus, planDetail } = this.state;
    const { roughData } = this.props;

    const { rough_name, status, person } = controls;
    console.log("controls", controls);
    let obj = {
      roughId: roughData.rough_id,
      status: status.value
    }
    const detailData = [];
    if (
      (oldStatus === 'planning' && status.value !== 'planning') ||
      (oldStatus === 'ls' && status.value !== 'ls') ||
      (oldStatus === 'block' && status.value !== 'block')
    ) {
      if (oldStatus === 'planning') {
        for (let i = 0; i < planControls.length; i++) {
          let currentData = planControls[i];
          let planObj = {
            planName: currentData.plan_name.value,
            weight: currentData.weight.value,
            unit: currentData.unit.value
          }
          detailData.push(planObj);
        }
        obj.detailData = detailData;
      } else if ((oldStatus === 'ls' || oldStatus === 'block')) {
        for (let i = 0; i < planDetail.length; i++) {
          let currentData = planDetail[i];
          let planObj = {
            planId: currentData.plan_id
          }
          detailData.push(planObj);
        }
        obj.detailData = detailData;
      }

    }
    console.log("obj", obj);
    // return;
    RoughService.addRoughHistory(obj)
      .then(data => {
        this.props.closeModal(true);
      })
      .catch(e => {

      })
  }

  getPlanDetail = (roughId) => {
    RoughService.getPlanDetail(roughId)
      .then(data => {
        console.log("data", data.data.data.roughs);
        const planDetail = data.data.data.roughs;
        this.setState({ planDetail: data.data.data.roughs });
        // const { planControls } = this.state;
        let planControls = [];
        for (let i = 0; i < planDetail.length; i++) {
          const planObj = JSON.parse(JSON.stringify(planDefaultControls));
          planObj.plan_name.value = planDetail[i].plan_name;
          planObj.weight.value = planDetail[i].weight;
          planObj.unit.value = planDetail[i].unit;
          planControls.push(planObj);
        }
        this.setState({ planControls: planControls });
        // const roughList = data.data.roughs;
        // this.setState({ roughList });
      })
      .catch(e => {

      })
  }

  render() {
    const { controls, planControls, oldStatus, planDetail } = this.state;
    const { rough_name, status, person } = controls;

    const preparePlanControls = planControls.map((pc, index) =>
      <Row>
        <Col sm="3">
          <FormGroup>
            <Label for="plan_name">Ls Label</Label>
            <Input
              type="text"
              id="plan_name"
              name="plan_name"
              value={pc.plan_name.value}
              onChange={this.handlePlanControlChange.bind(this, index)}
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
              value={pc.weight.value}
              onChange={this.handlePlanControlChange.bind(this, index)}
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
              value={pc.unit.value}
              onChange={this.handlePlanControlChange.bind(this, index)}
            ></Input>
          </FormGroup>
        </Col>
        <Col sm="3" onClick={this.removePlanControls.bind(this, index)}>
          remove
        </Col>
      </Row>)

    const planRows = planDetail.map(p => <tr>
      <td>{p.plan_name}</td>
      <td>{p.weight}</td>
      <td>{p.unit}</td>
    </tr>)
    return <Modal isOpen={this.props.show} toggle={this.props.closeModal} >
      <ModalHeader toggle={this.props.closeModal}>Modal title</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="rough_name">Rough Number</Label>
            <Input
              type="text"
              id="rough_name"
              name="rough_name"
              value={rough_name.value}
              onChange={this.handleInputChange}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="status">status</Label>
            <Input
              type="select"
              id="status"
              name="status"
              onChange={this.handleInputChange}
              value={status.value}
            >
              <option value="galaxy">Galaxy</option>
              <option value="galaxy_end">Galaxy End</option>
              <option value="planning">Plannig</option>
              <option value="planning_end">Plannig End</option>
              <option value="ls">Ls</option>
              <option value="ls_end">Ls End</option>
              <option value="hpht">HPHT</option>
              <option value="hpht_end">HPHT End</option>
              <option value="block">Block</option>
              <option value="block_end"> Block End</option>
              <option value="polish">Polish</option>
              <option value="polish_end">Polish End</option>
            </Input>
          </FormGroup>
          {((oldStatus === 'ls' && status.value !== 'ls') || (oldStatus === 'block' && status.value !== 'block')) && <Fragment>
            <table>
              <thead>
                <th>Plan Name</th>
                <th>Weight</th>
                <th>Unit</th>
              </thead>
              <tbody>
                {planRows}
              </tbody>
            </table>
          </Fragment>}

          {oldStatus === 'planning' && status.value !== 'planning' && <Fragment>
            {preparePlanControls}
            <div onClick={this.addPlanControls}>add more</div>
          </Fragment>}
          <FormGroup>
            <Label for="person">Person</Label>
            <Input
              type="select"
              id="person"
              name="person"
              onChange={this.handleInputChange}
              value={person.value}
            >
              <option value="Arpan">Arpan</option>
            </Input>
          </FormGroup>

          <Button onClick={this.saveDetail}>
            Save
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  }
}