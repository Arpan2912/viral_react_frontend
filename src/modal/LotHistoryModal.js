import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, Card, CardBody, ModalFooter, ModalBody, Button, Row, Col, Input, Form, FormGroup, Label } from 'reactstrap';
// import { Row, Col, Card, CardBody, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { formatDate } from '../utils';

export default class LotHistoryModal extends Component {

  state = {

  }

  constructor() {
    super();
  }

  render() {
    const { roughHistory } = this.props;
    const { roughs, totalLabour } = roughHistory;
    const roughHistoryRows = roughs.map(rh => <div>
      <br />

      <Row>
        {/* <Col>{rh.rough_name}</Col>
        <Col>{rh.lot_name}</Col> */}
        <Col>{rh.status}</Col>
        <Col>{rh.start_date ? formatDate(rh.start_date) : null}</Col>
        <Col>{rh.end_date ? formatDate(rh.end_date) : null}</Col>
        <Col>{rh.labour_rate}</Col>
        <Col>{rh.total_labour}</Col>
        <Col>{rh.dollar}</Col>
        <Col>{rh.first_name} {rh.last_name}</Col>
      </Row>
      {rh.detailData && <div style={{ marginTop: '15px' }}>
        <Row>
          <Col sm="3" style={{ fontWeight: 'bold' }}>
            Result
              </Col>
          <Col>
            <table>
              <tr>
                <th>Plan Name</th>
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
                  <Col>Total Labour</Col>
                  <Col>Dollar</Col>
                  <Col>Person</Col>
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