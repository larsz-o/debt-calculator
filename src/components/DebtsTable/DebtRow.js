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
        return(
            <tr key={this.props.i} className="table-row">
            <td>{this.props.debt.name}</td>
            <td>{this.props.debt.balance}</td>
            <td>{this.props.debt.rate}</td>
            <td>{this.state.edit ? (<span><input value={this.state.payment} /></span>) : (this.props.debt.payment)}</td>
            <td><span className="link" onClick={()=>this.handleOpen()}>Add Payment</span></td>
            <Dialog open={this.state.open}>
                <div className="dialog-body">
                <h3>How much did you pay?</h3>
                <input value={this.state.payment} onChange={(event)=>this.handleChange(event)}/>
                </div>
                <button onClick={(event)=>this.savePayment(event)}>Save</button>
                <p className="link center" onClick={()=>this.handleClose()}>Cancel</p>
            </Dialog>
        </tr>
        ); 
    }
}
export default connect()(DebtRow); 