import React, { Component } from 'react';
import { connect } from 'react-redux';


class Calculations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reductions: 0,
            additions: 0,
            newBalance: this.props.debt.current_principle
        }
    }
    calculateAdditions = () => {
        let additions = this.props.additions.filter(addition => addition.debt_id === this.props.debt.id);
        let added = additions.reduce((accumulator, accrual) => accumulator + accrual.amount, 0);
        console.log(added)
        this.setState({
            ...this.state,
            additions: added
        })
    }

    calculateReductions = () => {
        let reduction = this.props.payments.filter(payment => payment.debt_id === this.props.debt.id);
        let paidOff = reduction.reduce((accumulator, payment) => accumulator + payment.amount, 0);
        console.log(paidOff)
        this.setState({
            ...this.state,
            reductions: paidOff
        })
    }
    componentDidMount() {
        this.calculateReductions();
        this.calculateAdditions(); // make sure this is in the right place. 
    }
    updatePrinciple = () => {
        // if today is compound date, update the currentBalance, otherwise, just keep adding interest to the displayed balance but not the principle
        // get all of the interest added since last compound date 
    }
    render() {

        return (
            <td>
            ${((this.props.debt.current_principle - this.state.reductions) + this.state.additions).toLocaleString()}</td>
        );
    }
}
const mapStateToProps = state => ({
    payments: state.debts.payments.paymentsList,
    additions: state.debts.additions,

})
export default connect(mapStateToProps)(Calculations); 