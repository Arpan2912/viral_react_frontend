import React, { Component, Fragment } from 'react';
import { Row, Col, Card, CardBody, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Ionicons from 'react-ionicons';

import Pagination from '../../components/Pagination/Pagination';

import RoughService from '../../services/RoughService';

import StoneHistoryModal from '../../modal/StoneHistoryModal';

import { formatDate } from '../../utils';

import './StoneStatus.css';

const pageSize = 10;


class StoneStatus extends Component {
    state = {
        roughList: [],
        roughHistory: [],
        page: 1,
        totalRecords: 0,
        search: null,
        isStoneHistoryModalOpen: false
    }

    componentDidMount() {
        this.getStoneList(this.state.page);
    }

    // refreshLotHistory = () => {
    //     const { roughHistory, selectedRoughData } = this.state;
    //     console.log("selectedRoughData", selectedRoughData);
    //     // const { roughs = [] } = roughHistory;
    //     // if (roughs && roughs.length > 0) {
    //     // let lotId = selectedRoughData.lot_id;
    //     this.getLotHistory(selectedRoughData, true);
    //     // }
    // }

    openStoneHistoryModal = (roughData, lot) => {
        this.setState({ isStoneHistoryModalOpen: true, roughHistory: roughData, selectedRoughData: lot })
    }

    closeStoneHistoryModal = () => {
        this.setState({ isStoneHistoryModalOpen: false, roughHistory: [], selectedRoughData: null });

    }

    getStoneList = (page, search = null) => {
        RoughService.getStoneLastStatus(page, pageSize, search)
            .then(data => {
                const roughList = data.data.data.roughs;
                const totalRecords = data.data.data.count;
                console.log("roughList", roughList);
                this.setState({ roughList, totalRecords });
            })
            .catch(e => {

            })
    }

    getStoneHistory = (lot, dontOpenModal) => {
        const lotId = lot.stone_id;
        RoughService.getStoneHistory(lotId)
            .then(data => {
                console.log("data", data.data.data);
                const roughHistory = data.data.data;
                if (dontOpenModal !== true) {
                    this.openStoneHistoryModal(roughHistory, lot);
                }
                this.setState({ roughHistory });
            })
            .catch(e => {

            })
    }






    handlePageChange = (page) => {
        this.setState({ page: page });
        this.getStoneList(page, this.state.search);
        // this.getAllDealerReport(page, null, false, uuid);
    }

    handleSearchInput = (e) => {
        const value = e.target.value;
        this.setState({ search: value });
        this.searchStoneData(value);
    }

    searchStoneData = (search) => {
        this.setState({ page: 1 });
        this.getStoneList(1, search);
    }

    render() {
        const { controls, roughList, roughHistory, planControls, search,
            isAddRoughHistoryModalOpen, selectedRoughData, page, totalRecords,
            isStoneHistoryModalOpen
        } = this.state;

        const roughListRows = roughList.map(rl => <tr>
            <td>{rl.rough_name}</td>
            <td>{rl.lot_name}</td>
            <td>{rl.stone_name}</td>
            {/* <td>{rl.lot_weight} {rl.lot_unit}</td> */}
            {/* <td>{rl.price}</td> */}
            {/* <td>{rl.dollar}</td> */}
            <td>{rl.status}</td>
            <td>{rl.start_date ? formatDate(rl.start_date) : null}</td>
            <td>{rl.end_date ? formatDate(rl.end_date) : null}</td>
            <td>{rl.first_name} {rl.last_name}</td>
            <td>{rl.submitted_first_name} {rl.submitted_last_name}</td>
            <td>
                {/* <span className="cursor-pointer" title="edit"
                    onClick={this.openAddRoughHistoryModal.bind(this, rl)}>
                    <Ionicons icon="md-create" color="#ababab"></Ionicons>
                </span> */}
                <span className="cursor-pointer"
                    onClick={this.getStoneHistory.bind(this, rl)} title="history">
                    <Ionicons icon="ios-list-box" color="#ababab"></Ionicons>
                </span>
            </td>
        </tr>)

        return (
            <div id="dashboard">
                {/* {isAddRoughHistoryModalOpen && <AddRoughHistory
                    show={isAddRoughHistoryModalOpen}
                    closeModal={this.closeAddRoughHistoryModal}
                    roughData={selectedRoughData}
                >
                </AddRoughHistory>} */}
                {isStoneHistoryModalOpen && <StoneHistoryModal
                    show={isStoneHistoryModalOpen}
                    closeModal={this.closeStoneHistoryModal}
                    roughHistory={roughHistory}
                    // refreshLotHistory={this.refreshSHistory}
                    roughData={selectedRoughData}
                >
                </StoneHistoryModal>}
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col sm="4">
                                        <Input
                                            name="search"
                                            id="search"
                                            type="text"
                                            placeholder="Enter rough name"
                                            onChange={this.handleSearchInput}
                                            value={search}
                                        ></Input>
                                    </Col>
                                </Row>

                                <Table className="width-100 margin-top-10">
                                    <thead>
                                        <tr>
                                            <th>R No</th>
                                            <th>Lot No</th>
                                            <th>Stone name</th>
                                            {/* <th>Weight</th> */}
                                            {/* <th>Price</th> */}
                                            {/* <th>Dollar</th> */}
                                            <th>Process</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Person</th>
                                            <th>End Person</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {roughListRows}
                                    </tbody>
                                </Table>
                                {<Pagination
                                    margin={2}
                                    page={page}
                                    pageSize={pageSize}
                                    totalRecords={totalRecords}
                                    onPageChange={this.handlePageChange}
                                ></Pagination>}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <br />
            </div>
        );
    }
}

export default StoneStatus;