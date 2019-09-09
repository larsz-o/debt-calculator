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

selectMethod = (event, property) => {
    event.preventDefault();
    this.props.dispatch({type:'SAVE_METHOD', payload: {method: property}})
}
    render(){
        return(
            <main>
            <div className="hero">
            <h2>Dashboard</h2>
    
                    <div>
                        <Metrics/>
                        <DebtsTable/>
                        {/* to do:  */}
           {/* add simulator -- what extra payments will do */}
           {/* choose repayment method */}
                    </div>
                </div>
                
            </main>
        );
    }
}
const mapStateToProps = state => ({
    settings: state.settings.userSettings,
})

export default connect(mapStateToProps)(DebtDashboard);