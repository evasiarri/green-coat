import React, {Component} from 'react';
import './EmployeeAuxilary.css'
import {Form, Input, Spin, Select, Button, Icon} from 'antd'


const FormItem = Form.Item;
const Option = Select.Option;


class EmployeeAuxilary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeNumberOk: false,
            validatingEmployeeNumber: null,
            fetching: false,
            validatingOrderNumber: false,
            stages: [],
            fetchingUpdates: false,
            orderNum: -1,
            stageChosen: null,
            submitSucceeded: false,
        }
    }

    handleContinue = (e) => {
        this.setState({fetching: true});
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            this.setState({orderNum: values.orderNum});

            console.log(values);

            const reqProps = {
                method: 'GET',
                headers: {employeeNum: values.employeeNum, orderNum: values.orderNum}
            };
            fetch("/db/get-stages", reqProps).then(
                (response) => {
                    response.json().then((resJson) => {
                        let stages = [];
                        if(resJson.stages !== null){
                            resJson.stages.map(col =>{
                                stages.push(col["Name"])
                            });
                        }
                        this.setState({stages: stages, fetching: false, employeeNumberOk: true})
                    });

                }
            )
        });

    };

    handleSubmit = (e) => {
        this.setState({fetchingUpdates: true});
        e.preventDefault();
        this.props.form.validateFields((err, values) =>{
            const reqProps = {
                method: 'GET',
                headers: {orderNum: this.state.orderNum, stage: this.state.stageChosen }
            };
            fetch("/db/update-stage", reqProps).then(
                response => {
                    response.json().then(resJson => {
                        if(resJson.status){
                            this.setState({submitSucceeded: true, fetchingUpdates: false, employeeNumberOk: false});
                        }
                    })
                }
            )

        })
    };

    handleChange = (value) => {
        this.setState({stageChosen: value})
    };

    handleBlur = () => {
        console.log('blur');
    };

    handleFocus = () => {
        console.log('focus');
    };

    render() {

        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 14},
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 28,
                    offset: 0,
                },
                sm: {
                    span: 28,
                    offset: 4,
                },
            },
        };
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <div className="upper-space"/>
                <Form onSubmit={this.handleContinue}>
                    <FormItem label="Employee Number" {...formItemLayout}>
                        {getFieldDecorator('employeeNum', {

                        })(
                            <Input style={{width: '470px'}} placeholder="Enter your employee number here"/>
                        )}
                    </FormItem>
                    <FormItem label="Order Number" {...formItemLayout}>
                        {getFieldDecorator('orderNum', {

                        })(
                            <Input style={{width: '470px'}} placeholder="Enter order number here"/>
                        )}

                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Continue
                        </Button>
                    </FormItem>
                </Form>
                <p/>
                <hr style={{width: '70%',height: '1px', marginLeft: 0}}/>
                <p/>
                <Form onSubmit={this.handleSubmit}>
                    <Spin spinning={this.state.fetching}>
                        <FormItem label="Change to stage" {...formItemLayout}>
                            <Select
                                disabled={!this.state.employeeNumberOk}
                                showSearch
                                style={{width: 200}}
                                placeholder="Select a stage"
                                optionFilterProp="children"
                                onChange={this.handleChange}
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                {this.state.stages.map(stage => {
                                    return <Option value={stage}>{stage}</Option>

                                })}
                            </Select>
                        </FormItem>
                    </Spin>
                    <FormItem {...tailFormItemLayout}>
                        <Button disabled={!this.state.employeeNumberOk} loading={this.state.fetchingUpdates} type="primary" htmlType="submit">
                            {!this.state.fetchingUpdates && this.state.submitSucceeded ? <Icon type="check-circle" size="small" style={{color: 'green'}}/> : null}
                            Submit
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default Form.create()(EmployeeAuxilary)