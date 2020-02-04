import React, { Component, Fragment } from 'react';

import { Modal, ModalHeader, Card, CardBody, ModalFooter, ModalBody, Button, Row, Col, Input, Form, FormGroup, Label } from 'reactstrap';

import RoughService from '../../services/RoughService';

import UpdateLotHistory from '../../modal/UpdateLotHistory';
import UpdateRoughHistory from '../../modal/UpdateRoughHistory';
import AddRoughHistory from '../../modal/AddRoughHistory';
import UpdateStoneToProcess from '../../modal/UpdateStoneToProcess';

import { formatDate } from '../../utils';


import './LotHistory.css';
class LotHistory extends Component {

    noLotHistoryCalled = 0;

    state = {
        isUpdateLotHistoryModalOpen: false,
        isUpdateRoughHistoryModalOpen: false,
        isUpdateStoneToProcessModalOpen: false,
        lotHistoryData: null,
        isAddRoughHistoryModalOpen: false,
        selectedRoughData: null,
        roughHistory: {},
        lotId: null
    }

    constructor() {
        super();
    }

    componentDidMount() {
        this.addRoughHistoryButtonRef = React.createRef();

        let query = new URLSearchParams(this.props.location.search);
        let lotId = query.get('id');
        this.setState({ lotId })
        this.getLotHistory(lotId);

    }

    openUpdateLotHistoryModal = (lotHistoryData) => {
        this.setState({ isUpdateLotHistoryModalOpen: true, lotHistoryData });
    }

    closeUpdateLotHistoryModal = (updateLotHistory) => {
        const lotId = this.state.lotId;
        this.setState({ isUpdateLotHistoryModalOpen: false, lotHistoryData: null });
        this.addRoughHistoryButtonRef.focus();
        if (updateLotHistory) {
            this.getLotHistory(lotId);
            // this.props.refreshLotHistory();
        }
    }


    openUpdateRoughHistoryModal = (lotHistoryData) => {
        this.setState({ isUpdateRoughHistoryModalOpen: true, lotHistoryData });
    }

    closeUpdateRoughHistoryModal = (updateLotHistory) => {
        const lotId = this.state.lotId;
        this.addRoughHistoryButtonRef.focus();
        this.setState({ isUpdateRoughHistoryModalOpen: false, lotHistoryData: null });
        if (updateLotHistory) {
            this.getLotHistory(lotId);
        }
    }

    // is result flag is used for update result of process end like plan/ls/block table result
    openUpdateStoneToProcessModal = (stoneToProcessData, rh, isResult) => {
        console.log("rhhhhhh", rh);
        stoneToProcessData.history_id = rh.history_id;
        stoneToProcessData.status = rh.status;
        this.setState({ isUpdateStoneToProcessModalOpen: true, stoneToProcessData, isResult });
    }

    closeUpdateStoneToProcessModal = (updateLotHistory) => {
        const lotId = this.state.lotId;
        this.addRoughHistoryButtonRef.focus();
        this.setState({ isUpdateStoneToProcessModalOpen: false, stoneToProcessData: null, isResult: null });
        if (updateLotHistory) {
            this.getLotHistory(lotId)
            // this.props.refreshLotHistory();
        }
    }

    openAddRoughHistoryModal = (roughData) => {
        this.setState({ isAddRoughHistoryModalOpen: true })
    }

    closeAddRoughHistoryModal = (reload) => {
        const lotId = this.state.lotId;
        console.log("this.addRoughHistoryButtonRef", this.addRoughHistoryButtonRef);
        this.addRoughHistoryButtonRef.focus();
        this.setState({ isAddRoughHistoryModalOpen: false });
        if (reload) {
            this.getLotHistory(lotId)
        }
    }

    getLotHistory = (lotId) => {
        // console.log("getLotHistory", lot);
        // const lotId = lot.lot_id;
        this.noLotHistoryCalled++;
        RoughService.getLotHistory(lotId)
            .then(data => {
                console.log("data", data.data.data);
                const roughHistory = data.data.data;
                // if (dontOpenModal !== true) {
                //     this.openLotHistoryModal(roughHistory, lot);
                // }
                this.setState({ roughHistory });
            })
            .catch(e => {

            })
    }

    openDashboard = () => {
        this.props.history.push('/home');
    }

    componentDidUpdate() {
        // if (this.addRoughHistoryButtonRef && this.addRoughHistoryButtonRef.focus && noLotHistoryCalled > 1) {
        //     this.addRoughHistoryButtonRef.focus();
        // }
    }

    render() {
        const { roughHistory, roughData = null } = this.state;
        const { roughs, totalLabour, totalWeight, lot_name, rough_name, lot_id } = roughHistory;
        const {
            isUpdateLotHistoryModalOpen, lotHistoryData, stoneToProcessData, isResult,
            isUpdateRoughHistoryModalOpen, isAddRoughHistoryModalOpen, isUpdateStoneToProcessModalOpen
        } = this.state;

        console.log("lot history modal data", roughHistory);
        let isFocusAssigned = false;
        const roughHistoryRows = roughs && roughs.map(rh => {
            let focusButton = false;
            if (!rh.end_date && isFocusAssigned === false && this.noLotHistoryCalled <= 1) {
                focusButton = true;
                isFocusAssigned = true;
            }
            return <div>
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
                    <Col>{rh.submitted_first_name} {rh.submitted_last_name}</Col>
                    <Col>
                        {!rh.end_date &&
                            <Button onClick={this.openUpdateRoughHistoryModal.bind(this, rh)} autoFocus={focusButton}>
                                <span title="End Process">End</span>
                            </Button>
                        }
                        <span onClick={this.openUpdateLotHistoryModal.bind(this, rh)}>Edit</span>
                    </Col>
                </Row>
                {rh.stoneToProcessData && rh.stoneToProcessData.length > 0 && <div style={{ marginTop: '15px' }}>
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
                                    <td onClick={this.openUpdateStoneToProcessModal.bind(this, dd, rh, false)}>Edit</td>
                                </tr>)}
                            </table>
                        </Col>
                    </Row>
                </div>
                }


                {rh.detailData && <div style={{ marginTop: '15px' }}>
                    <Row>
                        <Col sm="3" style={{ fontWeight: 'bold' }}>
                            Result
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
                                {rh.detailData.map(dd => <tr>
                                    <td>{dd.stone_name}</td>
                                    <td>{dd.weight} {dd.unit}</td>
                                    <td>{dd.cut}</td>
                                    <td>{dd.shape}</td>
                                    <td>{dd.color}</td>
                                    <td>{dd.purity}</td>
                                    <td onClick={this.openUpdateStoneToProcessModal.bind(this, dd, rh, true)}>Edit</td>
                                </tr>)}
                            </table>
                        </Col>
                    </Row>


                </div>}
            </div>
        })
        return (
            <div id="lot-history">
                {isAddRoughHistoryModalOpen && <AddRoughHistory
                    show={isAddRoughHistoryModalOpen}
                    closeModal={this.closeAddRoughHistoryModal}
                    lotName={lot_name}
                    roughName={rough_name}
                    lotId={lot_id}
                // roughData={roughData}
                >
                </AddRoughHistory>}
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

                {isUpdateStoneToProcessModalOpen && <UpdateStoneToProcess
                    show={isUpdateStoneToProcessModalOpen}
                    closeModal={this.closeUpdateStoneToProcessModal}
                    stoneToProcessData={stoneToProcessData}
                    lotId={lot_id}
                    // roughData={roughData}
                    isResult={isResult}
                ></UpdateStoneToProcess>}

                <div >
                    <Row>
                        <Col>
                            <span className="link" onClick={this.openDashboard}>Dashoard</span> > {lot_name}
                        </Col>
                        <Col className="text-align-right">
                            <button onClick={this.openAddRoughHistoryModal}
                                // autoFocus
                                ref={(button) => { this.addRoughHistoryButtonRef = button; }}
                            >
                                <span className="cursor-pointer" >Add Rough History</span>
                            </button>
                        </Col>
                    </Row>

                </div>

                {roughHistory && <Row className="margin-top-5">
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
                                    <Col>End Person</Col>
                                    <Col>Action</Col>
                                </Row>
                                <hr />
                                {roughHistoryRows}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                }
            </div>
        );
    }
}

export default LotHistory;