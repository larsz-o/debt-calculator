import React, { Component } from 'react'; 
import { Dialog } from '@material-ui/core'; 
import { connect } from 'react-redux'; 

class DebtRow extends Component {
    constructor(props){
        super(props);
        this.state = {
            edit: false,
            open: false,
            payment: ''
        }
    }
handleChange = (event) => {
    let payment = parseFloat(event.target.value); 
    this.setState({
        ...this.state, 
        payment: payment
    })
}
handleClose = () => {
    this.setState({
        ...this.state,
        open: false
    })
}
handleOpen = () => {
    this.setState({
        ...this.state,
        open: true
    })
}
savePayment = (event) => {
    event.preventDefault();
    this.props.dispatch({type: 'ADD_PAYMENT', payload: {payment: this.state.payment, debt: this.props.debt}});
    this.setState({
        ...this.state,
        open: false
    })
}
    render(){
        let reduction = this.props.payments.filter(payment => payment.debt_id === this.props.debt.id); 
        let paidOff = reduction.reduce((accumulator, payment) => accumulator + payment.amount, 0); 
        console.log(paidOff); 

        return(
            <tr key={this.props.i} className="table-row">
            <td>{this.props.debt.name}</td>
            <td>${Number(this.props.debt.starting_balance - paidOff).toLocaleString()}</td>
            <td>{this.props.debt.rate}</td>
            <td>${this.state.edit ? (<span><input value={this.state.payment} /></span>) : (this.props.debt.payment)}</td>
            <td><span className="link" onClick={()=>this.handleOpen()}>Add Payment</span></td>
            <Dialog open={this.state.open}>
                <div className="dialog-body">
                <h3>How much did you pay?</h3>
                <input value={this.props.debt.current_payment} onChange={(event)=>this.handleChange(event)}/>
                </div>
                <button onClick={(event)=>this.savePayment(event)}>Save</button>
                <p className="link center" onClick={()=>this.handleClose()}>Cancel</p>
            </Dialog>
            <td><span className="link">Edit</span></td>
            <Dialog open={this.state.edit}>
            <div className="dialog-body">
                <h3>Need to make an adjustment?</h3>
                <p>Since interest accrues at variable rates and you should be looking at your accounts anyhow, you should use this feature to add in any interest accrued between now and when you made your last payment.</p>
                <p>You can also use this to add any new debt - though I don't encourage that you take on any more of that!</p>
            </div>
            </Dialog>
        </tr>
        ); 
    }
}
const mapStateToProps = state => ({
    debtList: state.debts.debts,
    payments: state.debts.payments 
})
export default connect(mapStateToProps)(DebtRow); 