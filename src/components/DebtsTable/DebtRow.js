import React, { Component } from 'react'; 
import { Dialog } from '@material-ui/core'; 
import { connect } from 'react-redux'; 
import Calculations from './Calculations'; 
import moment from 'moment';

class DebtRow extends Component {
    constructor(props){
        super(props);
        this.state = {
            edit: false,
            open: false,
            current_payment: this.props.debt.current_payment,
            name: this.props.debt.name,
            current_principle: this.props.debt.current_principle,
            payment_date: this.props.debt.payment_date,
            rate: this.props.debt.rate
        }
    }
handleChange = (event) => {
    let payment = parseFloat(event.target.value); 
    this.setState({
        ...this.state, 
        current_payment: payment
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
saveChanges = (event) => {
event.preventDefault();
//to do: write this route
this.props.dispatch({type: 'EDIT_DEBT', payload: this.state})
this.setState({
    ...this.state, 
    edit: false
})
}
savePayment = (event) => {
    event.preventDefault();
    this.props.dispatch({type: 'ADD_PAYMENT', payload: {payment: this.state.current_payment, debt: this.props.debt}});
    this.setState({
        ...this.state,
        open: false
    })
}
    render(){
        return(
            <tr key={this.props.i} className={`table-row-` + this.props.i}>
            <td>{this.props.debt.name}</td>
            <td><Calculations debt={this.props.debt}/></td>
            <td>{this.props.debt.rate}%</td>
            <td>${this.state.edit ? (<span><input value={this.state.current_payment.toLocaleString()} /></span>) : (this.props.debt.current_payment.toLocaleString())}</td>
            <td><span className="link" onClick={()=>this.handleOpen()}>Add Payment</span></td>
            <Dialog open={this.state.open}>
                <div className="dialog-body">
                <h3>How much did you pay?</h3>
                <input value={this.props.debt.current_payment} onChange={(event)=>this.handleChange(event)}/>
                </div>
                <button onClick={(event)=>this.savePayment(event)}>Save</button>
                <p className="link center" onClick={()=>this.handleClose()}>Cancel</p>
            </Dialog>
            <td><img className="link" src={require('../images/pencil.png')} alt="edit icon" onClick={()=>this.setState({...this.state, edit: true})}/></td>
            <Dialog open={this.state.edit}>
            <div className="dialog-body">
                <form>
                    <h4>Edit Debt Details</h4>
                    <label>Name: <input value={this.state.name} onChange={(event)=>this.setState({...this.state, name: event.target.value})}/></label>
                    <label>Balance: <input value={this.state.current_principle} onChange={(event)=>this.setState({...this.state, current_principle: event.target.value})}/></label>
                    <label>Interest Rate: <input value={this.state.rate} onChange={(event)=>this.setState({...this.state, rate: event.target.value})}/></label>
                    <label>Monthly Payment: <input value={this.state.current_payment} onChange={(event)=>this.setState({...this.state, current_payment: event.target.value})}/></label>
                    <label>Payment Date: <input value={this.state.payment_date} onChange={(event)=>this.setState({...this.state, payment_date: event.target.value})}/></label>
                <button onClick={(event)=>this.saveChanges(event)}>Save</button>
                <p className="link center" onClick={()=>this.setState({...this.state, edit: false})}>Cancel</p>
                </form>
            </div>
            </Dialog>
        </tr>
        ); 
    }
}
const mapStateToProps = state => ({
    debtList: state.debts.debts.debtList,
    payments: state.debts.payments 
})
export default connect(mapStateToProps)(DebtRow); 