import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button, Row, Col, Input, Form, FormGroup, Label } from 'reactstrap';
import RoughService from '../services/RoughService';
import PersonService from '../services/PersonService';
import Validation from '../services/Validation';

const planDefaultControls = {
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
        value: 'galaxy',
        valid: null,
        touched: false,
        nullValue: null,
        invalidPassword: null
      },
      labour: {
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
    planDetail: [],
    persons: []
  }

  constructor() {
    super();
  }


  componentDidMount() {
    const { roughData } = this.props;
    const { controls } = this.state;
    const { rough_name, status, person } = controls;
    rough_name.value = roughData.rough_name;
    if (roughData.status) {
      status.value = roughData.status;
    }
    if (roughData.person_id) {
      person.value = roughData.person_id;
    }
    this.setState({ controls, oldStatus: roughData.status });
    if (roughData.status) {
      this.getLotStoneList(roughData.lot_id)
    }
    // if (roughData.status) {
    //   this.getPlanDetail(roughData.lot_id)
    // }
    // if (roughData.status) {
    //   this.getPlanDetail(roughData.lot_id)
    // }
    this.getPersons();
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

  handleValidation = (firstTime, isSubmit) => {
    const { roughData } = this.props;
    let { controls, isFormValid, planControls } = this.state;
    let { status, labour, person, rough_name } = controls;

    if (firstTime === true || status.touched === true || isSubmit) {
      status = Validation.notNullValidator(status);
      status.valid = !(status.nullValue);
      if (((isSubmit || status.touched) && status.valid === false)) {
        status.showErrorMsg = true;
      } else {
        status.showErrorMsg = false;
      }
    }

    if (firstTime === true || person.touched === true || isSubmit) {
      person = Validation.notNullValidator(person);
      person.valid = !(person.nullValue);
      if (((isSubmit || person.touched) && person.valid === false)) {
        person.showErrorMsg = true;
      } else {
        person.showErrorMsg = false;
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

    let planControlsValid = true;
    for (let i = 0; i < planControls.length; i++) {
      const currentData = planControls[i];
      let { stone_name, weight, unit } = currentData;

      if (firstTime === true || stone_name.touched === true || isSubmit) {
        stone_name = Validation.notNullValidator(stone_name);
        stone_name.valid = !(stone_name.nullValue);
        if (((isSubmit || stone_name.touched) && stone_name.valid === false)) {
          stone_name.showErrorMsg = true;
        } else {
          stone_name.showErrorMsg = false;
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

      if (stone_name.valid === true &&
        weight.valid === true &&
        unit.valid === true
      ) {
        planControlsValid = planControlsValid && true
      } else {
        planControlsValid = planControlsValid && false
      }
    }

    if (
      !((roughData.status === 'planning' && status.value !== 'planning') ||
        (roughData.status === 'ls' && status.value !== 'ls') ||
        (roughData.status === 'block' && status.value !== 'block'))
    ) {
      planControlsValid = true;
    }

    if (
      status.valid === true &&
      person.valid === true &&
      rough_name.valid === true &&
      planControlsValid
    ) {
      isFormValid = true;
    } else {
      isFormValid = false;
    }

    console.log("controls", controls);
    console.log('planControls', planControls);
    // console.log('isFormValid', isBusinessFormValid);
    this.setState({ controls, isFormValid, planControls });
    return isFormValid;
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

    const { rough_name, status, person, labour } = controls;
    const isFormValid = this.handleValidation(false, true);
    if (isFormValid === false) {
      return;
    }
    console.log("roughData", roughData);
    let obj = {
      lotId: roughData.lot_id,
      status: status.value,
      personId: person.value
    }
    const detailData = [];
    if (
      (oldStatus === 'planning' && status.value !== 'planning') ||
      (oldStatus === 'ls' && status.value !== 'ls') ||
      (oldStatus === 'block' && status.value !== 'block')
    ) {
      // if (oldStatus === 'planning') {
      for (let i = 0; i < planControls.length; i++) {
        let currentData = planControls[i];
        let planObj = {
          stoneName: currentData.stone_name.value,
          weight: currentData.weight.value,
          unit: currentData.unit.value
        }
        detailData.push(planObj);
      }
      obj.detailData = detailData;
      // } else if ((oldStatus === 'ls' || oldStatus === 'block')) {
      //   for (let i = 0; i < planDetail.length; i++) {
      //     let currentData = planDetail[i];
      //     let planObj = {
      //       planId: currentData.plan_id
      //     }
      //     detailData.push(planObj);
      //   }
      //   obj.detailData = detailData;
      // }

    }

    if (
      oldStatus && oldStatus !== status.value && !oldStatus.includes('end') &&
      !(labour.value === '' || labour.value === null)
    ) {
      // count labour cost
      let totalWeight = 0;
      let labourHistorId = null;
      if (planDetail && Array.isArray(planDetail) && planDetail.length > 0) {
        for (let i = 0; i < planDetail.length; i++) {
          let currentData = planDetail[i];
          labourHistorId = currentData.history_uuid;
          let weight = parseFloat(currentData.weight);
          if (currentData.unit === 'carat') {
            weight = weight * 100;
          }
          totalWeight = totalWeight + weight;
        }
        let labourRate = parseFloat(labour.value);
        let totalLabour = (labourRate * totalWeight) / 100;
        obj.labourRate = labourRate;
        obj.totalLabour = totalLabour;
        obj.labourHistorId = labourHistorId;
      } else {
        let weight = parseFloat(roughData.weight);
        if (roughData.unit === 'carat') {
          weight = weight * 100;
        }
        let labourRate = parseFloat(labour.value);
        let totalLabour = (labourRate * weight) / 100;
        obj.labourRate = labourRate;
        obj.totalLabour = totalLabour;
      }
    }
    // return;
    RoughService.addRoughHistory(obj)
      .then(data => {
        this.props.closeModal(true);
      })
      .catch(e => {

      })
  }

  getPlanDetail = (lotId) => {
    RoughService.getPlanDetail(lotId)
      .then(data => {
        console.log("data", data.data.data.roughs);
        const planDetail = data.data.data.roughs;
        this.setState({ planDetail: data.data.data.roughs });
        // const { planControls } = this.state;
        let planControls = [];
        if (planDetail.length > 0) {
          for (let i = 0; i < planDetail.length; i++) {
            const planObj = JSON.parse(JSON.stringify(planDefaultControls));
            planObj.stone_name.value = planDetail[i].stone_name;
            planObj.weight.value = planDetail[i].weight;
            planObj.unit.value = planDetail[i].unit;
            planControls.push(planObj);
          }
        } else {
          const planObj = JSON.parse(JSON.stringify(planDefaultControls));
          planControls.push(planObj);
        }
        this.setState({ planControls: planControls });
        // const roughList = data.data.roughs;
        // this.setState({ roughList });
      })
      .catch(e => {

      })
  }


  getLsDetail = (lotId) => {
    RoughService.getLsDetail(lotId)
      .then(data => {
        console.log("data", data.data.data.roughs);
        const planDetail = data.data.data.roughs;
        this.setState({ planDetail: data.data.data.roughs });
        // const { planControls } = this.state;
        let planControls = [];
        if (planDetail.length > 0) {
          for (let i = 0; i < planDetail.length; i++) {
            const planObj = JSON.parse(JSON.stringify(planDefaultControls));
            planObj.stone_name.value = planDetail[i].stone_name;
            planObj.weight.value = planDetail[i].weight;
            planObj.unit.value = planDetail[i].unit;
            planControls.push(planObj);
          }
        } else {
          const planObj = JSON.parse(JSON.stringify(planDefaultControls));
          planControls.push(planObj);
        }
        this.setState({ planControls: planControls });
        // const roughList = data.data.roughs;
        // this.setState({ roughList });
      })
      .catch(e => {

      })
  }

  getLotStoneList = (lotId) => {
    RoughService.getLotStoneList(lotId)
      .then(data => {
        const planDetail = data.data.data.roughs;
        this.setState({ planDetail: data.data.data.roughs });
        // const { planControls } = this.state;
        let planControls = [];
        if (planDetail.length > 0) {
          for (let i = 0; i < planDetail.length; i++) {
            const planObj = JSON.parse(JSON.stringify(planDefaultControls));
            planObj.stone_name.value = planDetail[i].stone_name;
            planObj.weight.value = planDetail[i].weight;
            planObj.unit.value = planDetail[i].unit;
            planControls.push(planObj);
          }
        } else {
          const planObj = JSON.parse(JSON.stringify(planDefaultControls));
          planControls.push(planObj);
        }
        this.setState({ planControls: planControls });
        // const roughList = data.data.roughs;
        // this.setState({ roughList });
      })
      .catch(e => {

      })
  }

  getBlockDetail = (lotId) => {
    RoughService.getBlockDetail(lotId)
      .then(data => {
        console.log("data", data.data.data.roughs);
        const planDetail = data.data.data.roughs;
        this.setState({ planDetail: data.data.data.roughs });
        // const { planControls } = this.state;
        let planControls = [];
        if (planDetail.length > 0) {
          for (let i = 0; i < planDetail.length; i++) {
            const planObj = JSON.parse(JSON.stringify(planDefaultControls));
            planObj.stone_name.value = planDetail[i].stone_name;
            planObj.weight.value = planDetail[i].weight;
            planObj.unit.value = planDetail[i].unit;
            planControls.push(planObj);
          }
        } else {
          const planObj = JSON.parse(JSON.stringify(planDefaultControls));
          planControls.push(planObj);
        }
        this.setState({ planControls: planControls });
        // const roughList = data.data.roughs;
        // this.setState({ roughList });
      })
      .catch(e => {

      })
  }
  getPersons = () => {
    PersonService.getPerson()
      .then(data => {
        console.log("data.data", data.data);
        const { persons } = data.data.data;
        this.setState({ persons })
      })
      .catch(e => {

      })
  }

  render() {
    const { controls, planControls, oldStatus, planDetail, persons } = this.state;
    const { rough_name, status, person, labour } = controls;

    const preparePlanControls = planControls.map((pc, index) =>
      <Row>
        <Col sm="3">
          <FormGroup>
            <Label for="stone_name">Stone Label</Label>
            <Input
              type="text"
              id="stone_name"
              name="stone_name"
              value={pc.stone_name.value}
              onChange={this.handlePlanControlChange.bind(this, index)}
            ></Input>
            {pc.stone_name.showErrorMsg && <div className="error">* Please enter stone name</div>}

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
            {pc.weight.showErrorMsg && <div className="error">* Please enter weight</div>}
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
            {pc.unit.showErrorMsg && <div className="error">* Please enter unit</div>}
          </FormGroup>
        </Col>
        {index !== 0 && <Col sm="3" onClick={this.removePlanControls.bind(this, index)}>
          remove
        </Col>}
      </Row>)

    const preparePersons = persons.map(p =>
      <option value={p.uuid}>{p.first_name} {p.last_name}</option>
    )
    return <Modal isOpen={this.props.show} toggle={this.props.closeModal} >
      <ModalHeader toggle={this.props.closeModal}>Update Rough Status</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="rough_name">Rough Number</Label>
            <Input
              type="text"
              id="rough_name"
              name="rough_name"
              value={rough_name.value}
              disabled
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
            {status.showErrorMsg && <div className="error">* Please enter status</div>}
          </FormGroup>
          {/* {((oldStatus === 'ls' && status.value !== 'ls') || (oldStatus === 'block' && status.value !== 'block')) && <Fragment>
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
          </Fragment>} */}

          {((oldStatus === 'planning' && status.value !== 'planning') ||
            (oldStatus === 'ls' && status.value !== 'ls') ||
            (oldStatus === 'block' && status.value !== 'block')) &&
            <Fragment>
              {preparePlanControls}
              <div onClick={this.addPlanControls}>add more</div>
            </Fragment>}
          {oldStatus && oldStatus !== status.value && !oldStatus.includes('end') && (<FormGroup>
            <Label for="labour">Labour</Label>
            <Input
              type="text"
              id="labour"
              name="labour"
              value={labour.value}
              onChange={this.handleInputChange}
            ></Input>
          </FormGroup>)}
          <FormGroup>
            <Label for="person">Person</Label>
            <Input
              type="select"
              id="person"
              name="person"
              onChange={this.handleInputChange}
              value={person.value}
            >
              <option value=''>Select Person</option>
              {preparePersons}
              {/* <option value="Arpan">Arpan</option> */}
            </Input>
            {person.showErrorMsg && <div className="error">* Please select person</div>}

          </FormGroup>

          <Button onClick={this.saveDetail}>
            Save
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  }
}