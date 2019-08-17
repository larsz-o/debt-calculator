import React, { Component } from 'react';
import { connect } from 'react-redux'; 

class DebtsTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            edit: false, 
            payment: '',
            balance: '', 
            name: '', 
            currentlyEditing: ''
        }
    }
    render(){
        return(
            <div>
                {/* consider making this table a flex box  */}
                <table className="col-8">
                    <thead>
                        <tr>
                            <td>Debt</td>
                            <td>Balance</td>
                            <td>Interest Rate</td>
                            <td>Monthly Payment</td>
                            <td>Track Payment</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.debtList.map((debt, i) => {
                            return (
                                <tr key={i}>
                                    <td>{debt.name}</td>
                                    <td>{debt.balance}</td>
                                    <td>{debt.rate}</td>
                                    <td>{this.state.edit && this.state.currentlyEditing === i ? (<span><input value={this.state.payment}/></span>) : (debt.payment) }</td>
                                    <td><button>Add a Payment</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                
            </div>
        );
    }
}
const mapStateToProps = state => ({
    debtList: state.debts.debts
})
export default connect(mapStateToProps)(DebtsTable);