import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 

class Metrics extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    calculate = () => {
        let total_debt =  this.props.debts.reduce((accumulator, debt) => accumulator + debt.current_payment, 0);
        let monthly_payments = this.props.debts.reduce((accumulator, debt) => accumulator + debt.current_principle, 0);
        let time_remaining = total_debt/monthly_payments;
        this.setState({
            total_debt: total_debt,
            monthly_payments: monthly_payments,
            time_remaining: time_remaining
        })
    }
    componentDidMount(){
        this.calculate();
    }
    render(){

        return(
            <div>
                <p>Total monthly debt payments:  {this.props.debts.reduce((accumulator, debt) => accumulator + debt.current_payment, 0).toLocaleString()}</p>
                <p>Total debt: ${this.props.debts.reduce((accumulator, debt) => accumulator + debt.current_principle, 0).toLocaleString()}</p>
                <p>Months left of repayment: {this.state.time_remaining ? (this.state.time_remaining) : 'N/A'} </p>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    debts: state.debts.debts
})
export default connect(mapStateToProps)(Metrics);