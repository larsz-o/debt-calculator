import React, { Component } from 'react';

class DebtDashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            myDebts: [],
            settings: {firstTime: true}
        }
    }
    render(){
        return(
            <main>
                <h2>Dashboard</h2>
                <p>I am going to include some charts here</p>
                {this.state.settings.firstTime && 
                <div className="center">
                    <h3>How do you want to attack your debts?</h3>
                    <button>Snowball</button><button>Avalanche</button>
                    </div>}
            </main>
        );
    }
}

export default DebtDashboard;