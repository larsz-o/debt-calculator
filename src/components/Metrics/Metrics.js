import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 

class Metrics extends Component {
    render(){
        return(
            <div>
                <p>Total monthly debt payments:  ${this.props.monthlyPayments.toLocaleString()}</p>
                <p>Total debt: ${this.props.totalDebt.toLocaleString()}</p>
                <p>Months left of repayment: {this.props.timeRemaining} </p>
                <p>Amount paid off: ${this.props.paidOff.toLocaleString()}</p>
                <p>Percent paid off: {(this.props.paidOff / this.props.totalDebt).toFixed(2)}% </p>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    totalDebt: state.debts.debts.total,
    monthlyPayments: state.debts.debts.monthlyPayments,
    paidOff: state.debts.payments.total,
    timeRemaining: state.debts.debts.timeRemaining
})
export default connect(mapStateToProps)(Metrics);