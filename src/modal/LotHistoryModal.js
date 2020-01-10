import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, Card, CardBody, ModalFooter, ModalBody, Button, Row, Col, Input, Form, FormGroup, Label } from 'reactstrap';
// import { Row, Col, Card, CardBody, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import UpdateLotHistory from '../modal/UpdateLotHistory';
import UpdateRoughHistory from '../modal/UpdateRoughHistory';

import { formatDate } from '../utils';

export default class LotHistoryModal extends Component {

  state = {
    isUpdateLotHistoryModalOpen: false,
    isUpdateRoughHistoryModalOpen: false,
    lotHistoryData: null
  }

  constructor() {
    super();
  }

  openUpdateLotHistoryModal = (lotHistoryData) => {
    this.setState({ isUpdateLotHistoryModalOpen: true, lotHistoryData });
  }

  closeUpdateLotHistoryModal = (updateLotHistory) => {
    this.setState({ isUpdateLotHistoryModalOpen: false, lotHistoryData: null });
    if (updateLotHistory) {
      this.props.refreshLotHistory();
    }
  }


  openUpdateRoughHistoryModal = (lotHistoryData) => {
    this.setState({ isUpdateRoughHistoryModalOpen: true, lotHistoryData });
  }

  closeUpdateRoughHistoryModal = (updateLotHistory) => {
    this.setState({ isUpdateRoughHistoryModalOpen: false, lotHistoryData: null });
    if (updateLotHistory) {
      this.props.refreshLotHistory();
    }
  }

  componentWillReceiveProps() {
    // this.setState({ isUpdateLotHistoryModalOpen: true });
    // this.setState({ isUpdateLotHistoryModalOpen: false });
  }

  render() {
    const { roughHistory } = this.props;
    const { roughs, totalLabour, totalWeight } = roughHistory;
    const { isUpdateLotHistoryModalOpen, lotHistoryData, isUpdateRoughHistoryModalOpen } = this.state;
    const roughHistoryRows = roughs.map(rh => <div>
      <br />

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
        <Col onClick={this.openUpdateRoughHistoryModal.bind(this, rh)}>edit</Col>
      </Row>
      {rh.stoneToProcessData && rh.stoneToProcessData.length > 0 && <div style={{ marginTop: '15px' }}>
        <Row>
          <Col sm="3" style={{ fontWeight: 'bold' }}>
            Stone To Process
              </Col>
          <Col>
            <table>
              <tr>
                <th>Stone Name</th>
                <th>Weight</th>
              </tr>
              {rh.stoneToProcessData.map(dd => <tr>
                <td>{dd.stone_name}</td>
                <td>{dd.weight} {dd.unit}</td>
              </tr>)}
            </table>
          </Col>
        </Row>


      </div>}

      {rh.detailData && <div style={{ marginTop: '15px' }}>
        <Row>
          <Col sm="3" style={{ fontWeight: 'bold' }}>
            Result
              </Col>
          <Col>
            <table>
              <tr>
                <th>Stone Name</th>
                <th>Weight</th>
              </tr>
              {rh.detailData.map(dd => <tr>
                <td>{dd.stone_name}</td>
                <td>{dd.weight} {dd.unit}</td>
              </tr>)}
            </table>
          </Col>
        </Row>


      </div>}
    </div>)


    return <Modal id="lot-history" isOpen={this.props.show} toggle={this.props.closeModal} >
      <ModalHeader toggle={this.props.closeModal}>Lot History</ModalHeader>
      <ModalBody>
        {isUpdateLotHistoryModalOpen && <UpdateLotHistory
          show={isUpdateLotHistoryModalOpen}
          closeModal={this.closeUpdateLotHistoryModal}
          lotHistoryData={lotHistoryData}
        ></UpdateLotHistory>}
        {isUpdateRoughHistoryModalOpen && <UpdateRoughHistory
          show={isUpdateRoughHistoryModalOpen}
          closeModal={this.closeUpdateRoughHistoryModal}
          roughData={lotHistoryData}
        ></UpdateRoughHistory>}
        <Row>
          <Col>
            <Card>
              <CardBody>
                {roughs && roughs.length > 0 &&
                  <Fragment>
                    <Row>
                      <Col>Rough Name : {roughs[0].rough_name}</Col>
                      <Col>Lot Name : {roughs[0].lot_name}</Col>
                      <Col>Total Labour: {totalLabour}</Col>
                      <Col>Total Weight: {totalWeight}</Col>
                    </Row>
                    <hr />
                  </Fragment>
                }
                <Row>
                  {/* <Col>Rough Name</Col>
                  <Col>Lot Name</Col> */}
                  <Col>Status</Col>
                  <Col>Start Date</Col>
                  <Col>End Date</Col>
                  <Col>Labour</Col>
                  <Col>Total Weight</Col>
                  <Col>Total Labour</Col>
                  <Col>Dollar</Col>
                  <Col>Person</Col>
                  <Col>Action</Col>
                </Row>
                <hr />
                {roughHistoryRows}
              </CardBody>
            </Card>
          </Col>
        </Row>


      </ModalBody>

    </Modal>
  }
}