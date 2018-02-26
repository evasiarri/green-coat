import React, {Component} from 'react';
import logo from './../../logo.svg';
import MySidebar from './../sidebar/sidebar'
import {Card, List} from 'antd';

export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
        this.name = "Rachel Shmuel";
        this.company = "Intel corp";
        this.phone = "55555555";
        this.fax = "45555555";
        this.email = "rachel.shmuel@intel.";
        setTimeout(()=>{this.setState({isLoading:false})}, 3000)
    }

    fetchUserDetails = () => {
        let reqProps = {
            method: 'GET',
            headers: {username: "rachel.shmuel@intel."}
        };
        fetch(this.props.getURL, reqProps).then(
            response => {
                response.json().then(resJson => {
                    this.name = resJson.name;
                    this.phone = resJson.phone;
                    this.company = resJson.company;
                    this.fax = resJson.fax;
                    this.email = resJson.email;
                    this.setState({isLoading: false});
                })

            });
    };

    componentDidMount(){
        // this.fetchUserDetails();
    }

    render() {
        let data = [];
        data.push("Company: " + this.company);
        data.push("Email: " + this.email);
        data.push("Phone number: " + this.phone);
        data.push("Fax number: " + this.fax);
        return (
            <div className="content-space absolute-position">
                <Card loading={this.state.isLoading} title="Rachel Shmuel" style={{width: '60%', margin: '150px 100px'}}>
                    {/*<h3 style={{marginBottom: 16}}>Default Size</h3>*/}
                    <List
                        bordered
                        dataSource={data}
                        renderItem={item => (<List.Item>{item}</List.Item>)}
                    />
                </Card>
            </div>
        );
    }
}