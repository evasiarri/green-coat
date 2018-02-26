import React, {Component} from 'react';
import MySidebar from './../sidebar/sidebar'
import {Icon} from 'antd'
import OrderDetails from './../order-details/order-details-page'
import Account from './../account/account-page'


const boxes = require('./../../resources/packages.png');


export default class OrderList extends Component {
    constructor(props){
        super(props);
        this.state = {
            showDetails: false,
            orderPicked: null,
            showAccount: false,
        };
    }

    changeShowDetailsState = (orderPicked) =>{
        this.setState({showDetails: true, orderPicked: orderPicked, showAccount: false});

    };

    changeOrderPicked = (orderPicked) => {
        console.log("order changed");
        console.log(orderPicked);

        this.setState({orderPicked: orderPicked, showAccount: false, showDetails: true})
    };

    changeShowAccountState = () =>{
      this.setState({showAccount: true, showDetails: false});
    };

    render() {
        console.log(this.state.orderPicked);
        return (
            <div style={{width: '100%', height: '100%'}}>

                <MySidebar changeShowDetailsState={this.changeShowDetailsState}
                           changeShowAccountState={this.changeShowAccountState}
                           changeOrderPicked={this.changeOrderPicked} />
                {this.state.showDetails? <OrderDetails getURL="/db/current-order-details" orderPicked={this.state.orderPicked}/> : null}
                {this.state.showAccount? <Account getURL="/dc/current-account-details"/>: null}
            </div>
        );
    }
}