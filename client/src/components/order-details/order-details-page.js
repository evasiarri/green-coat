import React, {Component} from 'react';
import MySidebar from './../sidebar/sidebar'
import './../../commom-styles.css'
import {Icon, Steps, Spin} from 'antd'
import './order-details-page.css'

const Step = Steps.Step;

const MAX_STEPS = 5;

export default class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
        };
        this.orderPicked = this.props.orderPicked;
        this.orderEndDate = null;
        this.orderStartDate = null;
        const stepsNumber = Math.floor(Math.random() * MAX_STEPS + 2);
        this.steps = stepsNumber;
        this.currentStep = Math.floor(Math.random() * stepsNumber + 1);
        this.daysTillNextStage = 0;
        this.fetchOrderDates = this.fetchOrderDates.bind(this);
        const orderDetails = localStorage.getItem(this.props.orderPicked);
        if(orderDetails){
            console.log("retrieved from localstorage " + this.props.orderPicked);
            this.steps = JSON.parse(orderDetails).steps;
            this.currentStep = JSON.parse(orderDetails).currentStep;
        }else {
            console.log("stored in localstorage " + this.props.orderPicked);

            const toStore = {
                orderNumber: this.props.orderPicked,
                steps: this.steps,
                currentStep: this.currentStep
            };
            localStorage.setItem(this.props.orderPicked, JSON.stringify(toStore))
        }
        this.stepsFinished = this.my_range(this.currentStep - 1);

    }

    setSteps = (orderPicked)=>{
        const stepsNumber = Math.floor(Math.random() * MAX_STEPS + 2);
        this.steps = stepsNumber;
        this.currentStep = Math.floor(Math.random() * stepsNumber + 1);
        const orderDetails = localStorage.getItem(orderPicked);
        if(orderDetails){
            console.log("retrieved from localstorage " +orderPicked);
            this.steps = JSON.parse(orderDetails).steps;
            this.currentStep = JSON.parse(orderDetails).currentStep;
        }else {
            console.log("stored in localstorage " + orderPicked);

            const toStore = {
                orderNumber: orderPicked,
                steps: this.steps,
                currentStep: this.currentStep
            };
            localStorage.setItem(orderPicked, JSON.stringify(toStore))
        }
        this.stepsFinished = this.my_range(this.currentStep - 1);
    };
    componentDidMount(){
        this.fetchOrderDates(this.props);
    }
    my_range = (n) => {
        let array = [];
        for (let i = 0; i < n; i++) {
            array[i] = i + 1;
        }
        return array
    };

    fetchOrderDates = (props) => {
        let reqProps = {
            method: 'GET',
            headers: {order: props.orderPicked}
        };
        fetch(this.props.getURL, reqProps).then(
            response => {
                response.json().then(resJson => {
                    this.orderEndDate = resJson.endDate;
                    this.orderStartDate = resJson.startDate;
                    const first = this.parseDate(resJson.stageStartDate);
                    const second = this.parseDate(resJson.stageEndDate);
                    this.daysTillNextStage = this.daydiff(first, second);
                    this.setState({isFetching: false});

                });
            }
        )

    };

    parseDate = (str) => {
        var mdy = str.split('/');
        return new Date(mdy[2], mdy[0]-1, mdy[1]);
    };

    daydiff = (first, second)=> {
        return Math.round((second-first)/(1000*60*60*24));
    };

    getSteps = () => {
        console.log(this.my_range(this.steps));
        console.log(this.currentStep);
        console.log(this.stepsFinished);
        const stepsItems = this.my_range(this.steps).map((number) => {
                if (this.currentStep === number) {
                    return (<Step key={number} status="process" title={"stage " + number} icon={<Icon type="loading"/>}/>);
                }
                if (this.stepsFinished.indexOf(number) === -1) {
                    return (<Step key={number} status="wait" title={"stage " + number} icon={<Icon type="clock-circle-o"/>}/>);

                }
                return (<Step key={number} status="finish" title={"stage " + number} icon={<Icon type="clock-circle-o"/>}/>);

            }
        );
        return stepsItems
    };


    componentWillReceiveProps(nextProps){
        this.orderPicked = nextProps.orderPicked;
        this.setSteps(nextProps.orderPicked);
        this.setState({isFetching: true});
        this.fetchOrderDates(nextProps);

    }

    render() {
        return (
            <div className="content-space absolute-position">
                <div className="details-container" >
                    <h className="order-number-header">{"Order no." + this.orderPicked}</h>
                    <div style={{marginTop: '50px'}}>
                        <Spin tip="loading..." spinning={this.state.isFetching} size="large">
                            <Steps style={this.state.isFetching? {display: 'none'}: {flex: 1, marginBottom: '70px'}}>
                                {this.getSteps()}
                            </Steps>
                            <div style={this.state.isFetching? {display: 'none'}: {flex: 3}}>
                                <h className="order-details-header">Order Details:</h>
                                <p className="order-details">{"Order date: " + this.orderStartDate}</p>
                                <p className="order-details">{"Expected delivery: " + this.orderEndDate}</p>
                                <p className="order-details">{"Moving to next stage within " + this.daysTillNextStage + " days"}</p>
                            </div>
                        </Spin>
                    </div>
                </div>
            </div>
        );
    }
}