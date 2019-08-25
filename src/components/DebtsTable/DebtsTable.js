import React, { Component } from 'react';
import { connect } from 'react-redux';
import DebtRow from './DebtRow';

class DebtsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            payment: '',
            balance: '',
            name: '',
            currentlyEditing: '',
            show: false
        }
    }

    handleOpen = () => {
        this.setState({
            ...this.state,
            show: true
        })
    }
    render() {
        return (
            <div className="flex-box">
                <table className="col-10">
                    <thead>
                        <tr className="header">
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
                         <DebtRow i={i} debt={debt}/>
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