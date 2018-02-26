import React, {Component} from 'react';
import logo from './../../resources/company-icon.png'
import './login-page.css'
import './../../commom-styles.css'
import NormalLoginForm from './login-content'
import {Icon, Input, Button, Avatar, Form} from 'antd'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
        this.userName = "";
        this.password = "";
    }


    render() {
        const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
        return (
            <div className="rectangle">
                <div className="flex-column-container">
                    <img className="logo" src={logo}/>
                    <WrappedNormalLoginForm changeUserNameState={this.props.changeUserNameState} style={{margin: '0 auto', width: '100%'}}/>

                </div>
            </div>
        );
    }
}