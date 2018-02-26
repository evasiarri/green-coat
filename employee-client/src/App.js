import React, {Component} from 'react';
import './App.css';
import 'antd/dist/antd.css'
import EmployeeAuxilary from './components/EmployeeAuxilary'
class App extends Component {



    render() {
        return (
            <div style={{fontFamily: 'Oswald, sans-serif', width: '100%', height: '100%'}}>
                <EmployeeAuxilary/>
            </div>
        );
    }
}

export default App;
