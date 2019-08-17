import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import axios from 'axios';

class DebtDashboard extends Component {

componentDidMount(){
    this.props.dispatch({type: 'FETCH_SETTINGS'});
    this.props.dispatch({type: 'FETCH_DEBTS'});
}


selectMethod = (event, property) => {
    event.preventDefault();
    this.props.dispatch({type:'SAVE_METHOD', payload: {method: property}})
}
    render(){
        return(
            <main>
            <h2>Dashboard</h2>
                <div className="hero">
                {this.props.settings.method === '' && 
                <div className="center">
                    <h3>Choose your approach for paying off debt</h3>
                    <div className="flex-box flex-fill">
                        <div className="choice-card col-4"><h4>Debt Snowball</h4>
                        <p>Paying your debts smallest to largest, regardless of interest rate.</p>
                        <button onClick={(event)=>this.selectMethod(event, 'snowball')}>Snowball</button>
                        </div>
                        <div className="choice-card col-4"><h4>Debt Avalance</h4>
                        <p>Paying your highest interest rate debts first. </p>
                            <button onClick={(event)=>this.selectMethod(event, 'avalanche')}>Avalanche</button>
                            </div>
                    </div>
                   
                    </div>}{this.props.settings.method !== '' && 
                    <div>
                     
                    </div>} 
                </div>
                
            </main>
        );
    }
}
const mapStateToProps = state => ({
    settings: state.settings.userSettings,
 
})

export default connect(mapStateToProps)(DebtDashboard);