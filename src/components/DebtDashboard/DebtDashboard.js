import React, { Component } from 'react';

class DebtDashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            myDebts: []
        }
    }
    render(){
        return(
            <div>
                <h2>Dashboard</h2>
            </div>
        );
    }
}

export default DebtDashboard;