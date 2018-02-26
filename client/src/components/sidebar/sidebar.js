import React, {Component} from 'react';
import './sidebar.css'
import 'antd/dist/antd.css'
import {Icon, List, Avatar, Button, Spin} from 'antd'
import {DUMMY_USER} from './../../resources'
import './../../commom-styles.css'
import box from './../../resources/box.png'

export default class MySidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            orderList: [],
            dueDates: []
        };
        this.firstClick = true;
        this.fetchList = this.fetchList.bind(this);
        this.fetchList();

    }


    //TODO: fetch list from server and change the state
    fetchList = () => {
        const reqProps = {
            method: 'GET'
        };
        console.log("fetching from: " + "/db/" + window.location.href.split('/')[3]);
        fetch("/db/" + window.location.href.split('/')[3], reqProps).then(
            (response) => {
                response.json().then((resJson) => {
                    let orderNumbers = [], orderDelivery = [];
                    resJson.orders.map(column => {
                        orderNumbers.push(column["oID"]);
                        orderDelivery.push(column["Time_to_Delivery"])
                    });
                    this.setState({orderList: orderNumbers, dueDates: orderDelivery, isFetching: false});
                });

            }
        )

    };

    getTitles = () => {
        let orders = [];
        for (let i = 0; i < this.state.orderList.length; i++) {
            const jsonToInsert = {
                title: "Order no." + this.state.orderList[i]
            };
            orders.push(jsonToInsert)
        }
        return orders;
    };

    getDueDate = (order) => {
        return this.state.dueDates[this.state.orderList.indexOf(parseInt(order.split('.')[1]))];
    };

    handleSelectOrder = (title) => {
        const orderNumber = title.split('.')[1];
        if (this.firstClick) {
            this.props.changeShowDetailsState(orderNumber);
            this.firstClick = false;
        } else {
            this.props.changeOrderPicked(orderNumber);
        }

    };

    handleAccountClick = () => {
        this.props.changeShowAccountState();
    };

    render() {
        return (
            <div className="sidebar-space">
                <div className="flex-column-container centered" style={{justifyContent: 'space-between'}}>
                    <Button onClick={this.handleAccountClick} shape="circle" size="large"
                            style={{backgroundColor: '#87d068', border: '#87d068', margin: '0 auto 40px'}}
                            type="primary" icon="user"/>
                    <p className="user-name">{DUMMY_USER.USER_NAME + "'s Orders:"}</p>
                    <Spin tip="loading..." style={this.state.isFetching ? {} : {display: 'none'}}/>
                    <List style={this.state.isFetching ? {display: 'none'} : {}} className="centered-top"
                          dataSource={this.getTitles()}
                          itemLayout="horizontal"
                          renderItem={item => (
                              <List.Item>
                                  <List.Item.Meta avatar={<Avatar src={box}/>}
                                                  title={<Button type="default" onClick={() => {
                                                      this.handleSelectOrder(item.title)
                                                  }}>{item.title}</Button>}
                                                  description={"Time to delivery: " + this.getDueDate(item.title)}
                                  />
                              </List.Item>
                          )}
                    />

                </div>
            </div>
        );
    }
}
