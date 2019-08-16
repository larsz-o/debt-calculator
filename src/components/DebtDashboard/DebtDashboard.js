import React, { Component } from 'react';

class DebtDashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            myDebts: [],
            settings: {notSet: true, method: ''}
            // allow togggling of methods but require one to be set 
        }
    }
    render(){
        return(
            <main>
                <h2>Dashboard</h2>
                {this.state.settings.notSet && 
                <div className="center">
                    <h3>choose your approach to paying off debt</h3>
                    <div className="flex-box choice-container flex-fill">
                        <div className="choice-card"><h4>Debt Snowball</h4>
                        <p>Paying your debts smallest to largest, regardless of interest rate.</p>
                        <button>Snowball</button>
                        </div>
                        <div className="choice-card"><h4>Debt Avalance</h4>
                        <p>Paying your highest interest rate debts first. </p>
                            <button>Avalanche</button>
                            </div>
                    </div>
                   
                    </div>}
            </main>
        );
    }
}

export default DebtDashboard;