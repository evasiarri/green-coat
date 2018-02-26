// This code was borrowed from antd
import React, {Component} from 'react';
import './login-page.css'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {Link} from 'react-router-dom'
import Login from "./login-page";

const FormItem = Form.Item;

export default class NormalLoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: null
        } ;
    }

    //TODO: add authentication
    handleSubmit = (e) => {
        console.log("handle submit");
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let reqProps = {
                    method: 'GET',
                    username: values.username
                };
                console.log("fetching from: " + "/db/" + window.location.href.split('/')[3]);
                console.log('Received values of form: ', values);
                this.props.changeUserNameState(values.username);

            }
            else{
                console.log(err.message)
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <Button href="/order-list" type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

