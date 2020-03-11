import React, { Component, Fragment } from 'react';
import { Row, Col, FormGroup, Label, Input, Card, CardBody, Button } from 'reactstrap';
import Autosuggest from 'react-autosuggest';
import Select from "react-dropdown-select";
import Ionicons from 'react-ionicons';

import RoughService from '../../services/RoughService';
import PersonService from '../../services/PersonService';
import ModalService from '../../services/ModalService';
import Validation from '../../services/Validation';
import { formatDate } from '../../utils';
import './EndLotHistory.css';

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

const personControl = {
  value: null,
  valid: false,
  touched: false,
  nullValue: null,
}

const defaultControls = {
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
  end_person: {
    value: '',
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
  dollar: {
    value: '',
    valid: null,
    touched: false,
    nullValue: null,
    invalidPassword: null
  },
  isFormValid: false
}

class EndLotHistory extends Component {
  container = [];
  state = {
    // controls: JSON.parse(JSON.stringify(defaultControls)),
    controls: [],
    stoneToProcessControls: [JSON.parse(JSON.stringify(planDefaultControls))],
    resultControls: [],
    planDetail: [],
    stones: [],
    allStones: [],
    isLoading: false,
    lotId: null,
    lots: [],
    value: '',
    endPersonValue: '',
    roughHistory: [],
    persons: [],
    showPersonList: [],
    personName: [],
    personUuid: []
  }

  constructor() {
    super()
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
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

  handleValidation = (firstTime, isSubmit, index) => {
    // const { roughData } = this.props;
    let { controls, stoneToProcessControls, resultControls, stones, roughHistory, personUuid } = this.state;
    const { roughs } = roughHistory;
    let { labour, dollar, isFormValid } = controls[index];

    let roughData = roughs[index];
    let personData = personUuid[index];
    if (firstTime === true || personData.touched === true || isSubmit) {
      personData = Validation.notNullValidator(personData);
      personData.valid = !(personData.nullValue);
      if (((isSubmit || personData.touched) && personData.valid === false)) {
        personData.showErrorMsg = true;
      } else {
        personData.showErrorMsg = false;
      }
    }

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

    let resultControlsValid = true;
    for (let i = 0; i < resultControls[index].length; i++) {
      const currentData = resultControls[index][i];
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

      // if (firstTime === true || unit.touched === true || isSubmit) {
      //   unit = Validation.notNullValidator(unit);
      //   unit.valid = !(unit.nullValue);
      //   if (((isSubmit || unit.touched) && unit.valid === false)) {
      //     unit.showErrorMsg = true;
      //   } else {
      //     unit.showErrorMsg = false;
      //   }
      // }
      // if (firstTime === true || cut.touched === true || isSubmit) {
      //   cut = Validation.notNullValidator(cut);
      //   cut.valid = !(cut.nullValue);
      //   if (((isSubmit || cut.touched) && cut.valid === false)) {
      //     cut.showErrorMsg = true;
      //   } else {
      //     cut.showErrorMsg = false;
      //   }
      // }

      // if (firstTime === true || shape.touched === true || isSubmit) {
      //   shape = Validation.notNullValidator(shape);
      //   shape.valid = !(shape.nullValue);
      //   if (((isSubmit || shape.touched) && shape.valid === false)) {
      //     shape.showErrorMsg = true;
      //   } else {
      //     shape.showErrorMsg = false;
      //   }
      // }

      // if (firstTime === true || color.touched === true || isSubmit) {
      //   color = Validation.notNullValidator(color);
      //   color.valid = !(color.nullValue);
      //   if (((isSubmit || color.touched) && color.valid === false)) {
      //     color.showErrorMsg = true;
      //   } else {
      //     color.showErrorMsg = false;
      //   }
      // }

      // if (firstTime === true || purity.touched === true || isSubmit) {
      //   purity = Validation.notNullValidator(purity);
      //   purity.valid = !(purity.nullValue);
      //   if (((isSubmit || purity.touched) && purity.valid === false)) {
      //     purity.showErrorMsg = true;
      //   } else {
      //     purity.showErrorMsg = false;
      //   }
      // }

      if (stone_name.valid === true &&
        weight.valid === true
        //  &&
        // // unit.valid === true &&
        // cut.valid === true &&
        // shape.valid === true &&
        // color.valid === true &&
        // purity.valid === true
      ) {
        resultControlsValid = resultControlsValid && true
      } else {
        resultControlsValid = resultControlsValid && false
      }
    }

    if (!['planning', 'ls', 'block', 'hpht'].includes(roughData.status)) {
      resultControlsValid = true;
    }

    console.log("planControls.length", stoneToProcessControls.length, "planControlsValid", planControlsValid);
    if (
      // status.valid === true &&
      personData.valid === true &&
      planControlsValid &&
      resultControlsValid
    ) {
      isFormValid = true;
    } else {
      isFormValid = false;
    }

    console.log("controls", controls);
    console.log('stoneToProcessControls', planControlsValid);
    console.log('resultControlsValid', resultControlsValid);
    console.log('isFormValid', isFormValid);
    this.setState({ controls, isFormValid, stoneToProcessControls, personUuid });
    return isFormValid;
  }

  saveDetail = (index) => {
    const {
      controls,
      stoneToProcessControls,
      resultControls,
      planDetail,
      stones,
      lotId,
      roughHistory,
      personUuid
    } = this.state;
    // console.log("controls", controls);
    // console.log("stoneToProcessControls", stoneToProcessControls);
    // console.log("resultControls", resultControls);
    // const { roughData, lotId } = this.props;

    // if (isLoading === true) {
    //   return;
    // }
    const { rough_name, status, start_person, end_person, labour, dollar } = controls[index];
    const { roughs } = roughHistory;
    let roughData = roughs[index];
    const isFormValid = this.handleValidation(false, true, index);
    if (isFormValid === false) {
      return;
    }
    let obj = {
      lotId: lotId,
      status: roughData.status,
      personId: personUuid[index].value,
      historyId: roughData.history_id,
      // startPersonId: start_person.value,
      // endPersonId: end_person.value,
      labourRate: labour.value,
      dollar: dollar.value
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
      obj.stoneToProcess = detailData;
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
    if ((roughData.status === 'planning' || roughData.status === 'ls' || roughData.status === 'block' || roughData.status === 'hpht')) {
      for (let i = 0; i < resultControls[index].length; i++) {
        let currentData = resultControls[index][i];
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
        resultStones.push(planObj);
      }
      obj.detailData = resultStones;
    }
    // return;
    this.setState({ isLoading: true });
    console.log("obj", obj);
    // isLoading = true;
    RoughService.updateRoughHistory(obj)
      .then(data => {
        const message = data.data && data.data.message ? data.data.message : null;
        if (message) {
          ModalService.openAlert('Rough Status', message, 'success');
        }
        this.setState({
          isLoading: false,
        });
        this.getLotHistory(lotId)
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
    this.getLotHistory(suggestion.u_uuid)

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


  /* Auto suggestion  end person methods */
  getEndPersonSuggestionValue = (suggestion) => {
    console.log("suggestion", suggestion);
    // this.setState({ lotId: suggestion.u_uuid })
    // this.getLotHistory(suggestion.u_uuid)
    return suggestion.full_name
  };

  onEndPersonSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    const { controls } = this.state;
    const { end_person } = controls;
    console.log("suggestion", suggestion);
    end_person.value = suggestion.uuid;
    // console.log("suggestion selected",  suggestion, suggestionValue, suggestionIndex, sectionIndex);
    // this.noLotHistoryCalled = 0;
    this.setState({ controls })
    // this.getLotHistory(suggestion.u_uuid)

  }


  renderEndPersonSuggestion = suggestion => (
    <div>
      {suggestion.full_name}
    </div>
  );

  onEndPersonChange = (event, { newValue }) => {
    console.log("event", event);
    console.log("new value", newValue);
    this.setState({
      endPersonValue: newValue
    });
  };


  onEndPersonSuggestionsFetchRequested = ({ value }) => {
    console.log("value", value);
    this.getPersons(value, 'endPerson')
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onEndPersonSuggestionsClearRequested = () => {
    this.setState({
      endPersons: []
    });
  };
  /* Auto suggestion methods end */



  getPersons = (search, personType, index) => {
    PersonService.getPerson(null, null, search.value, 'dropdown')
      .then(data => {
        console.log("data.data", data.data);
        const { persons, showPersonList } = this.state;
        persons[index] = data.data && data.data.data && data.data.data.persons ? data.data.data.persons : [];
        showPersonList[index] = true;
        // const { persons } = data.data.data;
        // if (personType === 'startPerson') {
        //   this.setState({ startPersons: persons })
        // } else if (personType === 'endPerson') {
        this.setState({ persons: persons, showPersonList })
        // }
      })
      .catch(e => {

      })
  }

  handleInputChange = (index, e) => {
    const { roughHistory, controls } = this.state;
    // const { roughs } = roughHistory;
    const roughData = controls[index];
    const controlName = e.target.name;
    const controlValue = e.target.value;
    // const { controls } = this.state;
    roughData[controlName].value = controlValue;
    roughData[controlName].touched = true;
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
  handleEndPersonChange = (values) => {
    console.log("values", values);
    const { controls } = this.state;
    const { end_person } = controls;
    if (values.length > 0) {
      end_person.value = values[0].uuid;
    } else {
      end_person.value = ''
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


  handleResultControlChange = (historyIndex, index, e) => {
    const controlName = e.target.name;
    const controlValue = e.target.value;
    const { resultControls, stones, allStones } = this.state;
    resultControls[historyIndex][index][controlName].value = controlValue;
    resultControls[historyIndex][index][controlName].touched = true;
    if (e.target.name === 'stone_name') {
      const stoneIndex = allStones.findIndex(s => s.stone_name === controlValue);
      if (stoneIndex > -1) {
        const stoneData = allStones[stoneIndex];
        const currentControl = resultControls[historyIndex][index];
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


    this.setState({ resultControls });
    // this.handleValidation();
  }


  addResultControls = (historyIndex, index) => {
    const { resultControls } = this.state;
    const rControls = resultControls[historyIndex];
    rControls.push(JSON.parse(JSON.stringify(planDefaultControls)));
    this.setState({ resultControls, isFromAddControl: true });
    // this.prepareStoneToDisplayInDropDown();
  }

  removeResultControls = (historyIndex, index) => {
    const { resultControls } = this.state;
    const rControls = resultControls[historyIndex];
    rControls.splice(index, 1);
    this.setState({ resultControls });
    // this.prepareStoneToDisplayInDropDown();
  }

  getLotHistory = (lotId) => {
    // const { persons, showPersonList, resultControls, controls } = this.state;
    console.log("getLotHistory", lotId);
    // const lotId = lot.lot_id;
    this.noLotHistoryCalled++;
    this.setState({
      resultControls: [],
      personName: [],
      personUuid: [],
      persons: [],
      controls: [],
      showPersonList: [],
      stoneToProcessControls: [],
      roughHistory: {}
    }, () => {
      RoughService.getLotHistory(lotId)
        .then(data => {
          console.log("data", data.data.data);
          const { persons, showPersonList, resultControls, controls, personUuid } = this.state;
          const roughHistory = data.data.data;
          const { roughs } = roughHistory;
          for (let i = 0; i < roughs.length; i++) {
            let currentData = roughs[i];
            const { stoneToProcessData } = currentData;
            showPersonList.push(false);
            persons.push([]);
            resultControls.push([]);
            controls.push(JSON.parse(JSON.stringify(defaultControls)));
            personUuid.push(JSON.parse(JSON.stringify(personControl)));
            if (stoneToProcessData.length > 0) {
              for (let j = 0; j < stoneToProcessData.length; j++) {
                const planObj = JSON.parse(JSON.stringify(planDefaultControls));
                planObj.stone_name.value = stoneToProcessData[j].stone_name;
                planObj.weight.value = stoneToProcessData[j].weight;
                // planObj.unit.value = stoneToProcessData[j].unit;
                planObj.cut.value = stoneToProcessData[j].cut;
                planObj.shape.value = stoneToProcessData[j].shape;
                planObj.color.value = stoneToProcessData[j].color;
                planObj.purity.value = stoneToProcessData[j].purity;
                resultControls[i].push(planObj);
              }
            } else {
              const planObj = JSON.parse(JSON.stringify(planDefaultControls));
              resultControls[i].push(planObj);
            }
            // resultControls[i].push(JSON.parse(JSON.stringify(planDefaultControls)));
            // resultControls.push(JSON.parse(JSON.stringify(planDefaultControls)));
            console.log(resultControls)
            this.container.push(React.createRef());
            if (!currentData.end_date) {
              currentData.controls = JSON.parse(JSON.stringify(defaultControls));
              currentData.endPersonValue = null;
            }
          }
          // if (dontOpenModal !== true) {
          //     this.openLotHistoryModal(roughHistory, lot);
          // }
          this.setState({ roughHistory, showPersonList, resultControls, persons, controls });
        })
        .catch(e => {
          console.error(e);
        })
    })
  }

  handlePersonSearchChange = (index, e) => {
    console.log("index", index);
    console.log("e", e);
    const { personName, personUuid } = this.state;
    personName[index] = e.target.value;
    personUuid[index].value = null;
    // const value = e.target.value;
    this.setState({ personName, personUuid });
    this.getPersons(e.target.value, null, index);
  }

  onSelectPerson = (person, index, historyIndex) => {
    const { personName, personUuid, showPersonList } = this.state;
    const { full_name, uuid } = person;
    personName[historyIndex] = full_name;
    personUuid[historyIndex].value = uuid;
    showPersonList[historyIndex] = false;
    this.setState({ personName, personUuid, showPersonList });
  }

  togglePersonList = (index) => {
    const { showPersonList } = this.state;
    showPersonList[index] = !this.showPersonList[index];
    console.log(".........................");
    this.setState({ showPersonList })
  }




  handleClickOutside = event => {

    console.log(this.container && this.container.current && this.container);
    for (let i = 0; i < this.container.length; i++) {
      if (this.container[i].current && this.container[i].current.contains(event.target)) {
        // if (!this.container.current ) {
        console.log("setting to hide")
        // this.setState({
        //   showPersonList: false,
        // });
      } else {
        const { showPersonList } = this.state;
        showPersonList[i] = false;
        this.setState({
          showPersonList
        })
      }

      // if (this.container.current && !this.container.current.contains(event.target)) {
      //   // if (!this.container.current ) {
      //   console.log("setting to hide")
      //   this.setState({
      //     showPersonList: false,
      //   });
      // }
    }
  };

  openPersonToggle = (index) => {
    const { showPersonList } = this.state;
    showPersonList[index] = true;
    this.setState({
      showPersonList
    });
  }
  render() {
    const { value, lots, roughHistory, persons, personName, showPersonList, personUuid,
      controls, stones, resultControls, endPersonValue } = this.state;
    // const { status, labour, dollar } = controls;
    console.log("rough history", roughHistory);
    const { roughs = [] } = roughHistory;
    console.log("roughs", roughs);
    // const inputEndPersonProps = {
    //   placeholder: 'Search by person name',
    //   value: endPersonValue,
    //   onChange: this.onEndPersonChange
    // };
    const options = stones.map(s => <option value={s.stone_name}>{s.stone_name}</option>)

    const roughHistoryRows = roughs && roughs.map((rh, index) => {
      // console.log("rh index", index);
      const { labour, dollar } = controls[index];
      let focusButton = false;
      const inputEndPersonProps = {
        placeholder: 'Search by person name',
        value: endPersonValue,
        onChange: this.onEndPersonChange
      };
      if (!rh.end_date
        // && this.noLotHistoryCalled <= 1
      ) {
        focusButton = true;
      } else {
        return <div></div>
      }


      const prepareResultStoneTable = resultControls[index].map((pc, i) => <tr>
        <td>
          <Input
            type="text"
            id="stone_name"
            name="stone_name"
            // autoFocus={isFromAddControl}
            value={pc.stone_name.value}
            onChange={this.handleResultControlChange.bind(this, index, i)}
          >
            {options}
            {/* <option value="galaxy">Galaxy</option> */}
          </Input>
          {pc.stone_name.showErrorMsg && <div className="error">* Please enter stone name</div>}
        </td>
        <td>
          <Input
            type="number"
            id="weight"
            name="weight"
            value={pc.weight.value}
            onChange={this.handleResultControlChange.bind(this, index, i)}
          ></Input>
          {pc.weight.showErrorMsg && <div className="error">* Please enter weight</div>}

        </td>
        <td>
          <Input
            type="text"
            id="cut"
            name="cut"
            value={pc.cut.value}
            onChange={this.handleResultControlChange.bind(this, index, i)}
          ></Input>
          {pc.cut.showErrorMsg && <div className="error">* Please enter cut</div>}

        </td>
        <td>
          <Input
            type="text"
            id="shape"
            name="shape"
            value={pc.shape.value}
            onChange={this.handleResultControlChange.bind(this, index, i)}
          ></Input>
          {pc.shape.showErrorMsg && <div className="error">* Please enter shape</div>}

        </td>
        <td>
          <Input
            type="text"
            id="color"
            name="color"
            value={pc.color.value}
            onChange={this.handleResultControlChange.bind(this, index, i)}
          ></Input>
          {pc.color.showErrorMsg && <div className="error">* Please enter color</div>}

        </td>
        <td>
          <Input
            type="text"
            id="purity"
            name="purity"
            value={pc.purity.value}
            onChange={this.handleResultControlChange.bind(this, index, i)}
          ></Input>
          {pc.purity.showErrorMsg && <div className="error">* Please enter purity</div>}

        </td>
        <td>
          {i === resultControls[index].length - 1 && <Button onClick={this.addResultControls.bind(this, index, i)} className="action-button-table">
            <Ionicons icon="ios-add-circle-outline" color="blue" className="cursor-pointer"></Ionicons>
          </Button>} &nbsp;&nbsp;
          <Button onClick={this.removeResultControls.bind(this, index, i)} className="action-button-table">
            <Ionicons icon="ios-remove-circle-outline" color="blue" className="cursor-pointer"></Ionicons>
          </Button>
        </td>
      </tr>)


      return <div>
        {/* <br /> */}
        <Card className="margin-top-5">
          <CardBody>
            <Row>
              {/* <Col>{rh.rough_name}</Col>
      <Col>{rh.lot_name}</Col> */}
              <Col>{rh.status}</Col>
              <Col>{rh.start_date ? formatDate(rh.start_date) : null}</Col>
              <Col>{rh.end_date ? formatDate(rh.end_date) : null}</Col>
              <Col>{rh.labour_rate}</Col>
              <Col>{rh.total_weight}</Col>
              <Col>{rh.total_labour}</Col>
              <Col>{rh.dollar}</Col>
              <Col>{rh.first_name} {rh.last_name}</Col>
              <Col>{rh.submitted_first_name} {rh.submitted_last_name}</Col>
              {/* <Col>
            {!rh.end_date &&
              <Button onClick={this.openUpdateRoughHistoryModal.bind(this, rh)} autoFocus={focusButton}>
                <span title="End Process">End</span>
              </Button>
            }
            <span onClick={this.openUpdateLotHistoryModal.bind(this, rh)}>Edit</span>
          </Col> */}
            </Row>
            {rh.stoneToProcessData && rh.stoneToProcessData.length > 0 &&
              <div style={{ marginTop: '15px' }}>
                <Row>
                  <Col sm="3" style={{ fontWeight: 'bold' }}>
                    Stone To Process
            </Col>
                  <Col>
                    <table>
                      <tr>
                        <th>Kapan Name</th>
                        <th>Weight</th>
                        <th>Cut</th>
                        <th>Shape</th>
                        <th>Color</th>
                        <th>Purity</th>
                        <th>Action</th>
                      </tr>
                      {rh.stoneToProcessData.map(dd => <tr>
                        <td>{dd.stone_name}</td>
                        <td>{dd.weight} {dd.unit}</td>
                        <td>{dd.cut}</td>
                        <td>{dd.shape}</td>
                        <td>{dd.color}</td>
                        <td>{dd.purity}</td>
                        {/* <td onClick={this.openUpdateStoneToProcessModal.bind(this, dd, rh, false)}>Edit</td> */}
                      </tr>)}
                    </table>
                  </Col>
                </Row>

              </div>
            }
            <Row>
              <Col sm="3">
                <div ref={this.container[index]}>
                  <Label for="status">Person Name</Label>
                  <Input type="text" name="person_name" value={personName[index]} onChange={this.handlePersonSearchChange.bind(this, index)}
                    onFocus={this.openPersonToggle.bind(this, index)}></Input>
                  {personUuid[index].showErrorMsg && <div className="error">* Please enter person name</div>}
                  {showPersonList[index] &&
                    <div className="p-list">
                      {persons[index].map((p, i) =>
                        <Button
                          className="list-button"
                          onClick={this.onSelectPerson.bind(this, p, i, index)}
                        >
                          {p.full_name}
                        </Button>
                      )}
                    </div>
                  }
                </div>

              </Col>
              <Col sm="3">
                <FormGroup>
                  <Label for="labour">Labour</Label>
                  <Input
                    type="number"
                    id="labour"
                    name="labour"
                    value={labour.value}
                    onChange={this.handleInputChange.bind(this, index)}
                  ></Input>
                </FormGroup>
              </Col>
              <Col sm="3">
                <FormGroup>
                  <Label for="dollar">$ rate</Label>
                  <Input
                    type="number"
                    id="dollar"
                    name="dollar"
                    value={dollar.value}
                    onChange={this.handleInputChange.bind(this, index)}
                  ></Input>
                </FormGroup>
              </Col>
            </Row>
            {
              (rh.status === 'planning' || rh.status === 'ls' || rh.status === 'block' || rh.status === 'hpht') && <div>
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
                    {prepareResultStoneTable}
                  </tbody>
                </table>
              </div>
            }
            <Button onClick={this.saveDetail.bind(this, index)}>End Process</Button>
          </CardBody>
        </Card>
      </div >
    })


    const inputProps = {
      placeholder: 'Search by lot name',
      value,
      onChange: this.onChange
    };

    return (
      <div style={{ marginLeft: '10px', marginRight: '10px' }} >

        <Row className="margin-top-20">
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
            />

          </Col>
        </Row>
        {/* <Row> */}
        <div>End Process</div>
        {roughHistoryRows}
        {/* </Row> */}
        <Button onClick={this.saveDetail}>Save</Button>
      </div >
    );
  }
}

export default EndLotHistory;