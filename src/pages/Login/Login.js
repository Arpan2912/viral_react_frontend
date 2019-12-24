import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import AuthService from '../../services/AuthService';
import StorageService from '../../services/StorageService';

import './Login.css';



class Login extends Component {
    state = {
        controls: {
            phone: {
                value: '',
                valid: null,
                touched: false,
                nullValue: null
            },
            password: {
                value: '',
                valid: null,
                touched: false,
                nullValue: null
            }
        }
    }

    componentDidMount() {
        const token = StorageService.getToken();
        if (token) {
            this.props.history.push("/home");
        }
        // this.getPerson();
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


    login = () => {
        const { controls } = this.state;
        const { phone, password } = controls;
        let obj = {
            phone: phone.value,
            password: password.value
        }
        AuthService.signin(obj)
            .then(data => {
                const token = data.data.data.token;
                StorageService.setToken(token);
                this.props.history.push("/home");
                //         this.getPerson();
                //         this.resetControls();
            })
            .catch(e => {

            })
    }





    render() {
        const { controls } = this.state;
        const { password, phone } = controls;

        return (
            <div id="login">
                <Row>
                    <Col xl="10">
                        <Card>
                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <Label for="phone">Phone Number</Label>
                                        <Input
                                            type="text"
                                            id="phone"
                                            name="phone"
                                            value={phone.value}
                                            onChange={this.handleInputChange}
                                        ></Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">Password</Label>
                                        <Input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={password.value}
                                            onChange={this.handleInputChange}
                                        ></Input>
                                    </FormGroup>
                                    <Button onClick={this.login}>Login</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="1"></Col>
                </Row>

            </div>
        );
    }
}

export default Login;