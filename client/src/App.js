import React, {Component} from 'react';
import './App.css';
import {Switch, BrowserRouter, Route} from 'react-router-dom'
import Account from './components/account/account-page';
import Login from './components/login/login-page';
import OrderDetails from './components/order-details/order-details-page';
import OrderList from './components/order-list/order-list-page'
import 'antd/dist/antd.css'
import './commom-styles.css'


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null
        }
    }

    changeUserNameState = (newUser) => {
        console.log(newUser);
        this.setState(newUser)
    };

    render() {
        return (
            <div style={{fontFamily: 'Oswald, sans-serif', width: '100%', height: '100%'}}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" render={props => <Login changeUserNameState={this.changeUserNameState}/>}/>
                        <Route path="/order-list" render={props => <OrderList username={this.state.username}/>} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

