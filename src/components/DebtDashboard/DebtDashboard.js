import React, { Component } from 'react';
import Metrics from '../Metrics/Metrics';
import DebtsTable from '../DebtsTable/DebtsTable';
import { connect } from 'react-redux'; 

// to do: create a login page that displays a loading message until all user info, settings, debts, and payments are fetched and set in redux
class DebtDashboard extends Component {

componentDidMount(){
    this.props.dispatch({type: 'FETCH_SETTINGS'});
    this.props.dispatch({type: 'FETCH_DEBTS'});
}

// to do: calculate interest accrued. 

// once we get all the debts, we check to see if they are subsidized or not. if not, 
// check to see when last interest was added. 
// if not today, accrue interest. 
// if payment date === today, add all interest since last compound date onto principle. 


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
                        <Metrics/>
                        <DebtsTable/>
                        {/* to do:  */}
                     {/* charts here, incl. a thermometer
                     list of debts in the order you want them
                     make payments
                     adjust interest/fees/charges
                     calculate interest rates normally
                     how many months til payoff
                     how much you pay per month per debt
                     your goals
                     what extra payments will do  */}
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