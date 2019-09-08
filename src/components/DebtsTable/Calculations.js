import React, { Component } from 'react';
import { connect } from 'react-redux'; 

class Calculations extends Component {
    constructor(props){
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
        console.log(added); 
        this.setState({
            ...this.state,
            additions: added
        })
    }
    calculateReductions = () => {
        let reduction = this.props.payments.filter(payment => payment.debt_id === this.props.debt.id); 
        let paidOff = reduction.reduce((accumulator, payment) => accumulator + payment.amount, 0); 
        console.log(paidOff); 
        this.setState({
            ...this.state,
            reductions: paidOff
        })
    }
    checkInterest = () => {
        /// requires current_balance -- need to make sure I am updating this. 
        // wait BUT only actually add this to the database if it's the payment date/compound date.
        let today = new Date();
        let interest = this.props.additions.filter(addition => addition.debt_id === this.props.debt.id && addition.interest === true);
        if(interest[0].date_added !== today) {
            if (!this.props.debt.subsidized){
                let interestAccrued = this.props.debt.current_principle * this.props.debt.rate;
                let newBalance = this.props.debt.current_principle + interestAccrued;
                this.setState({
                    ...this.state,
                    newBalance: newBalance
                });
                if(this.props.debt.payment_date === today){
                    this.updatePrinciple();
                }
            } this.calculateAdditions(); // make sure this is in the right place. 
        } else {
            this.calculateAdditions();
        }
    }
    componentDidMount(){
        this.calculateReductions();
        this.checkInterest();
    }

    updatePrinciple = () => {
        // if today is compound date, update the currentBalance, otherwise, just keep adding interest to the displayed balance but not the principle

    }
    render(){
       
        return(
            <td></td>
        );
    }
}
const mapStateToProps = state => ({
    payments: state.debts.payments,
    additions: state.debts.additions,
  
})
export default connect(mapStateToProps)(Calculations); 