import React, { Component, Fragment } from 'react';
import { Row, Col, FormGroup, Label, Input, Card, CardBody, Button } from 'reactstrap';
import Autosuggest from 'react-autosuggest';
import Ionicons from 'react-ionicons';

import RoughService from '../../services/RoughService';
import PersonService from '../../services/PersonService';
import ModalService from '../../services/ModalService';
import Validation from '../../services/Validation';

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
  // unit: {
  //   value: 'cent',
  //   valid: null,
  //   touched: false,
  //   nullValue: null
  // },
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
  isFromAddControl: false
}

const defaultControls = {
  rough_name: {
    value: '',
    valid: null,
    touched: false,
    nullValue: null
  },
  lot_name: {
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
  start_person: {
    value: '',
    valid: null,
    touched: false,
    nullValue: null,
    invalidPassword: null
  }
}

class AddLotHistory extends Component {

  state = {
    controls: JSON.parse(JSON.stringify(defaultControls)),
    stoneToProcessControls: [JSON.parse(JSON.stringify(planDefaultControls))],
    resultControls: [JSON.parse(JSON.stringify(planDefaultControls))],
    planDetail: [],
    startPersons: [],
    stones: [],
    allStones: [],
    isLoading: false,
    lotId: null,
    lots: [],
    value: '',
    startPersonValue: '',
  }

  constructor() {
    super();
    this.lotRef = React.createRef();
  }

  componentDidMount() {
    // this.getPersons();
    this.lotRef.focus();
  }

  autoSuggestLotNameRef = autosuggest => {
    if (autosuggest !== null) {
      this.lotRef = autosuggest.input;
    }
  }
  getAllLotList = (search) => {
    console.log("search", search);
    RoughService.getAllLotList(search.value)
      .then(data => {
        const lots = data.data && data.data.data ? data.data.data : [];
        this.setState({ lots });
      })
      .catch(e => {

      })
  }

  getStoneList = (lotId) => {
    RoughService.getStoneList(lotId)
      .then(data => {
        const stones = data.data.data;
        let planControls = [];
        if (stones.length > 0) {
          for (let i = 0; i < stones.length; i++) {
            const planObj = JSON.parse(JSON.stringify(planDefaultControls));
            planObj.stone_name.value = stones[i].stone_name;
            planObj.weight.value = stones[i].weight;
            // planObj.unit.value = stones[i].unit;
            planObj.cut.value = stones[i].cut;
            planObj.shape.value = stones[i].shape;
            planObj.color.value = stones[i].color;
            planObj.purity.value = stones[i].purity;
            planControls.push(planObj);
          }
        } else {
          const planObj = JSON.parse(JSON.stringify(planDefaultControls));
          planControls.push(planObj);
        }
        this.setState({ stoneToProcessControls: JSON.parse(JSON.stringify(planControls)), resultControls: JSON.parse(JSON.stringify(planControls)), stones, allStones: stones });
      })
      .catch(e => {

      })
  }


  handleValidation = (firstTime, isSubmit) => {
    const { roughData } = this.props;
    let { controls, isFormValid, stoneToProcessControls, resultControls, stones } = this.state;
    let { status, labour, start_person, end_person, rough_name, dollar } = controls;

    if (firstTime === true || status.touched === true || isSubmit) {
      status = Validation.notNullValidator(status);
      status.valid = !(status.nullValue);
      if (((isSubmit || status.touched) && status.valid === false)) {
        status.showErrorMsg = true;
      } else {
        status.showErrorMsg = false;
      }
    }

    if (firstTime === true || start_person.touched === true || isSubmit) {
      start_person = Validation.notNullValidator(start_person);
      start_person.valid = !(start_person.nullValue);
      if (((isSubmit || start_person.touched) && start_person.valid === false)) {
        start_person.showErrorMsg = true;
      } else {
        start_person.showErrorMsg = false;
      }
    }



    // if (firstTime === true || rough_name.touched === true || isSubmit) {
    //   rough_name = Validation.notNullValidator(rough_name);
    //   rough_name.valid = !(rough_name.nullValue);
    //   if (((isSubmit || rough_name.touched) && rough_name.valid === false)) {
    //     rough_name.showErrorMsg = true;
    //   } else {
    //     rough_name.showErrorMsg = false;
    //   }
    // }

    let planControlsValid = true;
    for (let i = 0; i < stoneToProcessControls.length; i++) {
      const currentData = stoneToProcessControls[i];
      let { stone_name, weight, unit, cut, shape, color, purity } = currentData;

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


      if (stone_name.valid === true &&
        weight.valid === true
        //  &&
        // // unit.valid === true &&
        // cut.valid === true &&
        // shape.valid === true &&
        // color.valid === true &&
        // purity.valid === true
      ) {
        planControlsValid = planControlsValid && true
      } else {
        planControlsValid = planControlsValid && false
      }
    }

    if (stones.length === 0) {
      planControlsValid = true;
    }

    console.log("planControls.length", stoneToProcessControls.length, "planControlsValid", planControlsValid);
    if (
      status.valid === true &&
      start_person.valid === true &&
      // rough_name.valid === true &&
      planControlsValid
    ) {
      isFormValid = true;
    } else {
      isFormValid = false;
    }

    console.log("controls", controls);
    console.log('stoneToProcessControls', planControlsValid);
    console.log('isFormValid', isFormValid);
    this.setState({ controls, isFormValid, stoneToProcessControls });
    return isFormValid;
  }

  saveDetail = () => {
    const { controls, stoneToProcessControls, planDetail, stones, lotId } = this.state;
    // console.log("controls", controls);
    // console.log("stoneToProcessControls", stoneToProcessControls);
    // console.log("resultControls", resultControls);
    // const { roughData, lotId } = this.props;

    // if (isLoading === true) {
    //   return;
    // }
    const { status, start_person } = controls;
    const isFormValid = this.handleValidation(false, true);
    if (isFormValid === false) {
      return;
    }
    let obj = {
      lotId: lotId,
      status: status.value,
      personId: start_person.value,
    }
    const detailData = [];
    const resultStones = [];
    if (stones.length > 0) {
      // if (oldStatus === 'planning') {
      for (let i = 0; i < stoneToProcessControls.length; i++) {
        let currentData = stoneToProcessControls[i];
        let planObj = {
          stoneName: currentData.stone_name.value,
          weight: currentData.weight.value,
          unit: 'carat',
          // unit: currentData.unit.value,
          cut: currentData.cut.value,
          shape: currentData.shape.value,
          color: currentData.color.value,
          purity: currentData.purity.value
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

    console.log("obj", obj);
    // return;
    this.setState({ isLoading: true });
    // isLoading = true;
    RoughService.addRoughHistory(obj)
      .then(data => {
        const message = data.data && data.data.message ? data.data.message : null;
        if (message) {
          ModalService.openAlert('Rough Status', message, 'success');
        }
        this.setState({
          isLoading: false,
          controls: JSON.parse(JSON.stringify(defaultControls)),
          stoneToProcess: [JSON.parse(JSON.stringify(planDefaultControls))],
          value: '',
          startPersonValue: '',
          startPersons: [],
          stones: []
        });
        this.lotRef.focus();
        // isLoading = false;
      })
      .catch(e => {
        console.error("e", e);
        const message = e.response && e.response.data && e.response.data.message ? e.response.data.message : 'Something went wrong';
        ModalService.openAlert('Rough Status', message, 'error');
        this.setState({ isLoading: false });
        // isLoading = false;
      })
  }


  /* Auto suggestion lot methods */
  getSuggestionValue = (suggestion) => {
    console.log("suggestion", suggestion);
    // this.setState({ lotId: suggestion.u_uuid })
    // this.getLotHistory(suggestion.u_uuid)
    return suggestion.lot_name
  };

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    // console.log("suggestion selected",  suggestion, suggestionValue, suggestionIndex, sectionIndex);
    this.noLotHistoryCalled = 0;
    this.setState({ lotId: suggestion.u_uuid })
    this.getStoneList(suggestion.u_uuid);
    // this.getLotHistory(suggestion.u_uuid)

  }


  renderSuggestion = suggestion => (
    <div>
      Lot {suggestion.lot_name}(Rough {suggestion.rough_name})
    </div>
  );

  onChange = (event, { newValue }) => {
    console.log("new value", newValue);
    this.setState({
      value: newValue
    });
  };


  onSuggestionsFetchRequested = ({ value }) => {
    console.log("value", value);
    this.getAllLotList(value)
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      lots: []
    });
  };
  /* Auto suggestion methods end */


  /* Auto suggestion  start person methods */
  getStartPersonSuggestionValue = (suggestion) => {
    console.log("suggestion", suggestion);
    // this.setState({ lotId: suggestion.u_uuid })
    // this.getLotHistory(suggestion.u_uuid)
    return suggestion.full_name
  };

  onStartPersonSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    const { controls } = this.state;
    const { start_person } = controls;
    console.log("suggestion", suggestion);
    start_person.value = suggestion.uuid;
    // console.log("suggestion selected",  suggestion, suggestionValue, suggestionIndex, sectionIndex);
    // this.noLotHistoryCalled = 0;
    this.setState({ controls })
    // this.getStoneList(suggestion.u_uuid);
    // this.getLotHistory(suggestion.u_uuid)

  }


  renderStartPersonSuggestion = suggestion => (
    <div>
      {suggestion.full_name}
    </div>
  );

  onStartPersonChange = (event, { newValue }) => {
    console.log("new value", newValue);
    const { controls } = this.state;
    const { start_person } = controls;
    start_person.value = null;
    this.setState({
      startPersonValue: newValue,
      controls
    });
  };


  onStartPersonSuggestionsFetchRequested = ({ value }) => {
    console.log("value", value);
    this.getPersons(value, 'startPerson')
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onStartPersonSuggestionsClearRequested = () => {
    this.setState({
      startPersons: []
    });
  };
  /* Auto suggestion methods end */

  getPersons = (search) => {
    PersonService.getPerson(null, null, search.value, 'dropdown')
      .then(data => {
        console.log("data.data", data.data);
        const { persons } = data.data.data;
        this.setState({ startPersons: persons })
      })
      .catch(e => {

      })
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

  handleStartPersonChange = (values) => {
    console.log("values", values);
    const { controls } = this.state;
    const { start_person } = controls;
    if (values.length > 0) {
      start_person.value = values[0].uuid;
    } else {
      start_person.value = ''
    }
  }


  handleStoneToProcessControlChange = (index, e) => {
    const controlName = e.target.name;
    const controlValue = e.target.value;
    const { stoneToProcessControls, stones, allStones } = this.state;
    stoneToProcessControls[index][controlName].value = controlValue;
    stoneToProcessControls[index][controlName].touched = true;
    if (e.target.name === 'stone_name') {
      const stoneIndex = allStones.findIndex(s => s.stone_name === controlValue);
      if (stoneIndex > -1) {
        const stoneData = allStones[stoneIndex];
        const currentControl = stoneToProcessControls[index];
        currentControl.stone_name.value = stoneData.stone_name;
        currentControl.weight.value = stoneData.weight;
        // currentControl.unit.value = stoneData.unit;
        currentControl.cut.value = stoneData.cut;
        currentControl.shape.value = stoneData.shape;
        currentControl.color.value = stoneData.color;
        currentControl.purity.value = stoneData.purity;
      }
      // this.prepareStoneToDisplayInDropDown();
    }


    this.setState({ stoneToProcessControls });
    // this.handleValidation();
  }


  addStoneToProcessControls = () => {
    const { stoneToProcessControls } = this.state;
    stoneToProcessControls.push(JSON.parse(JSON.stringify(planDefaultControls)));
    this.setState({ stoneToProcessControls, isFromAddControl: true });
    // this.prepareStoneToDisplayInDropDown();
  }

  removeStoneToProcessControls = (index) => {
    const { stoneToProcessControls } = this.state;
    stoneToProcessControls.splice(index, 1);
    this.setState({ stoneToProcessControls });
    // this.prepareStoneToDisplayInDropDown();
  }

  render() {
    const { value, lots, startPersons, endPersons, person, lotId,
      controls, stones, stoneToProcessControls, resultControls, startPersonValue, endPersonValue } = this.state;
    const { status, labour, dollar, start_person } = controls;
    const options = stones.map(s => <option value={s.stone_name}>{s.stone_name}</option>)

    const inputProps = {
      placeholder: 'Search by lot name',
      value,
      onChange: this.onChange
    };

    const inputStartPersonProps = {
      placeholder: 'Search by person name',
      value: startPersonValue,
      onChange: this.onStartPersonChange
    };

    const prepareStoneTable = stoneToProcessControls.map((pc, index) => <tr>
      <td>
        <Input
          type="select"
          id="stone_name"
          name="stone_name"
          // autoFocus={isFromAddControl}
          value={pc.stone_name.value}
          onChange={this.handleStoneToProcessControlChange.bind(this, index)}
        >
          {options}
          {pc.stone_name.showErrorMsg && <div className="error">* Please enter stone name</div>}
          {/* <option value="galaxy">Galaxy</option> */}
        </Input>
      </td>
      <td>
        <Input
          type="number"
          id="weight"
          name="weight"
          value={pc.weight.value}
          onChange={this.handleStoneToProcessControlChange.bind(this, index)}
        ></Input>
        {pc.weight.showErrorMsg && <div className="error">* Please enter weight</div>}
      </td>
      <td>
        <Input
          type="text"
          id="cut"
          name="cut"
          value={pc.cut.value}
          onChange={this.handleStoneToProcessControlChange.bind(this, index)}
        ></Input>
        {pc.cut.showErrorMsg && <div className="error">* Please enter cut</div>}
      </td>
      <td>
        <Input
          type="text"
          id="shape"
          name="shape"
          value={pc.shape.value}
          onChange={this.handleStoneToProcessControlChange.bind(this, index)}
        ></Input>
        {pc.shape.showErrorMsg && <div className="error">* Please enter shape</div>}
      </td>
      <td>
        <Input
          type="text"
          id="color"
          name="color"
          value={pc.color.value}
          onChange={this.handleStoneToProcessControlChange.bind(this, index)}
        ></Input>
        {pc.color.showErrorMsg && <div className="error">* Please enter color</div>}
      </td>
      <td>
        <Input
          type="text"
          id="purity"
          name="purity"
          value={pc.purity.value}
          onChange={this.handleStoneToProcessControlChange.bind(this, index)}
        ></Input>
        {pc.purity.showErrorMsg && <div className="error">* Please enter purity</div>}
      </td>
      <td>
        {index === stoneToProcessControls.length - 1 && <Button onClick={this.addStoneToProcessControls.bind(this, index)}>
          <Ionicons icon="ios-add-circle-outline" color="blue" className="cursor-pointer"></Ionicons>
        </Button>}
        <Button onClick={this.removeStoneToProcessControls.bind(this, index)}>
          <Ionicons icon="ios-remove-circle-outline" color="blue" className="cursor-pointer"></Ionicons>
        </Button>
      </td>
    </tr>)

    return (
      <div style={{ marginLeft: '10px', marginRight: '10px' }}>
        <Row>
          <Col>
            <div>Start Process</div>
            <Card>
              <CardBody>
                <Row>


                  <Col sm="3">
                    <Label for="status">Lot Name</Label>

                    <Autosuggest
                      suggestions={lots}
                      onSuggestionsFetchRequested={this.getAllLotList}
                      onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                      getSuggestionValue={this.getSuggestionValue}
                      onSuggestionSelected={this.onSuggestionSelected}
                      renderSuggestion={this.renderSuggestion}
                      inputProps={inputProps}
                      ref={this.autoSuggestLotNameRef}
                    />
                    {!lotId && <div className="error">* Please select lot name</div>}

                  </Col>

                  <Col sm="3">
                    <FormGroup>
                      <Label for="status">status</Label>
                      <Input
                        type="select"
                        id="status"
                        name="status"
                        innerRef={(ref => this.statusRef = ref)}
                        onChange={this.handleInputChange}
                        value={status.value}
                      >
                        <option value="galaxy">Galaxy</option>
                        {/* <option value="galaxy_end">Galaxy End</option> */}
                        <option value="planning">Planning</option>
                        {/* <option value="planning_end">Planning End</option> */}
                        <option value="ls">Ls</option>
                        {/* <option value="ls_end">Ls End</option> */}
                        <option value="hpht">HPHT</option>
                        {/* <option value="hpht_end">HPHT End</option> */}
                        <option value="block">Block</option>
                        {/* <option value="block_end"> Block End</option> */}
                        <option value="polish">Polish</option>
                        {/* <option value="polish_end">Polish End</option> */}
                        <option value="gia">Gia</option>
                        {/* <option value="gia_end">Gia End</option> */}
                        <option value="iga">Iga</option>
                        {/* <option value="iga_end">Iga End</option> */}
                        <option value="sale">Sale</option>
                      </Input>
                      {/* {status.showErrorMsg && <div className="error">* Please enter status</div>} */}
                    </FormGroup>
                  </Col>
                  <Col sm="3">
                    <Label for="status">Person Name</Label>

                    <Autosuggest
                      suggestions={startPersons}
                      onSuggestionsFetchRequested={this.onStartPersonSuggestionsFetchRequested}
                      onSuggestionsClearRequested={this.onStartPersonSuggestionsClearRequested}
                      getSuggestionValue={this.getStartPersonSuggestionValue}
                      onSuggestionSelected={this.onStartPersonSuggestionSelected}
                      renderSuggestion={this.renderStartPersonSuggestion}
                      inputProps={inputStartPersonProps}
                    />
                    {start_person.showErrorMsg && <div className="error">* Please enter person name</div>}
                  </Col>
                </Row>
                {stones.length > 0 && <Fragment>
                  <Row>
                    Stone to Process
                </Row>
                  <Row>
                    <div>
                      <table>
                        <thead>
                          <tr>
                            <th>Kapan Name</th>
                            <th>Weight</th>
                            <th>Cut</th>
                            <th>Shape</th>
                            <th>Color</th>
                            <th>Purity</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {prepareStoneTable}
                        </tbody>
                      </table>
                    </div>
                  </Row>
                </Fragment>}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Button onClick={this.saveDetail}>Save</Button>
      </div>
    );
  }
}

export default AddLotHistory;