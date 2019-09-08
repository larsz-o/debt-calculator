import React, { Component } from 'react';
import swal from 'sweetalert';
import moment from 'moment';
import { connect } from 'react-redux'; 

class DebtForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            balance: '',
            rate: '',
            payment_date: '',
            min_payment: '',
            subsidized: false,
            add: true,
            edit: false, 
            index: '',
            allDebts: [],
        }
    }

    handleChangeFor = (event, property) => {
        this.setState({
            ...this.state, 
            [property]: event.target.value
        })
    }
    addDebt = (event) => {
        event.preventDefault();
        if (this.state.name !== '' && this.state.balance !== '' && this.state.rate !== '' && this.state.payment_date !== '' && this.state.min_payment !== ''){
            let balance = this.state.balance.replace(/,/g,"");
            balance = parseFloat(balance); 
            console.log(balance);
            let rate = parseFloat(this.state.rate);
            let min_payment = parseFloat(this.state.min_payment)
            let date_entered = new Date(); 
                this.setState({
                    ...this.state, 
                    allDebts: [...this.state.allDebts, { name: this.state.name, balance: balance, rate: rate, min_payment: min_payment, payment_date: this.state.payment_date, subsidized: this.state.subsidized, date_entered: date_entered }],
                        add: true, 
                        edit: false,
                        name: '',
                        balance: '',
                        rate: '',
                        subsidized: false, 
                        min_payment: ''
                    })
                    console.log(this.state.allDebts)
        } else {
            swal('You missed something', 'Please fill out each field.', 'error')
        }
       
    }
    componentDidMount = () => {
    let today = new Date();
    today = moment(today).format('YYYY-MM-DD');
    this.setState({
        ...this.state,
        payment_date: today
    })
    }
    deleteDebt = (i) => {
        let debts = this.state.allDebts.slice();
        let result = debts.splice(i, 1);
        console.log(result); 
        this.setState({
            ...this.state, 
            allDebts: debts,
            name: '',
            balance: '',
            rate: '', 
            subsidized: false,
            min_payment: '',
            edit: false, 
            add: true
        })
    }
    editDebt = (debt, i) => {
        this.setState({
            ...this.state,
            add: false,
            edit: true,
            name: debt.name,
            balance: debt.balance,
            rate: debt.rate,
            subsidized: debt.subsidized, 
            payment_date: debt.payment_date,
            min_payment: debt.min_payment,
            index: i
        })
    }
    resetValues = () => {
    let debts = this.state.allDebts.slice();
    debts[this.state.index] = {name: this.state.name, balance: this.state.balance, rate: this.state.rate, subsidized: this.state.subsidized, payment_date: this.state.payment_date,
        min_payment: this.state.min_payment};
    this.setState({
            ...this.state,
            add: true, 
            edit: false,
            allDebts: debts,
            name: '',
            balance: '',
            rate: '',
            subsidized: false, 
            min_payment: '',

        })
    }
    saveChanges = (event) => {
        event.preventDefault();
        this.resetValues(); 
    }
    saveDebts = () => {
        for(let i = 0; i < this.state.allDebts.length; i++){
            this.props.dispatch({type: 'POST_DEBT', payload: this.state.allDebts[i]});
            console.log(i, this.state.allDebts.length)
            if (i === (this.state.allDebts.length - 1)){
                this.props.history.push('/dashboard');
            }
        } 
    }
    render(){
        return(
            <main>
                <div className="flex-box">
                <div className="form-container col-5">
                <h2>Enter your debts</h2>
                <form>
                    <label>Name</label>
                    <input value={this.state.name} type="text" onChange={(event)=>this.handleChangeFor(event, 'name')} required/>
                    <label>Current Balance</label>
                    <input value={this.state.balance} type="float" onChange={(event)=>this.handleChangeFor(event, 'balance')} required/>
                    <label>Interest rate</label>
                    <input value={this.state.rate} type="float" onChange={(event)=>this.handleChangeFor(event, 'rate')} required/>
                    <label>Minimum Payment</label>
                    <input value={this.state.min_payment} type="float" onChange={(event)=>this.handleChangeFor(event, 'min_payment')} required/>
                    <label>Next Payment Due</label>
                    <input value={this.state.payment_date} type="date" onChange={(event)=>this.handleChangeFor(event, 'payment_date')} required/>
                </form>
                <div className="center">
                    {this.state.add && <button className="submit" onClick={(event)=>this.addDebt(event)}>Add</button>}
                    {this.state.edit && <button className="submit clear" onClick={(event)=>this.saveChanges(event)}>Save Changes</button>}
                </div>
              
                
                </div>
                <div className="col-5">
                <ol type="1">
                {this.state.allDebts.map((debt, i) => {
                    return(
                        <li key={i}><h3>{debt.name}<span className="button-div"><img src={require('../images/pencil.png')} alt="edit icon" onClick={()=>this.editDebt(debt, i)}/></span><span className="button-div"><img src={require('../images/delete-button.png')} alt="trash can" onClick={()=>this.deleteDebt(i)}/></span></h3>
                        <h4>${debt.balance} owed @ {debt.rate}%</h4>  &nbsp;</li>
                    )
                })}
                </ol>
                <h2>Total: ${(this.state.allDebts.reduce((accumulator, debt) => accumulator + debt.balance, 0).toLocaleString())}</h2>
                </div>
                </div>
              
             
                {this.state.allDebts.length > 0 && <div className="center breathing-room"><button onClick={()=>this.saveDebts()}>Save + Continue</button></div>}
            </main>
        );
    }
}
const mapStateToProps = state => ({
    advance: state.debts.advance
})
export default connect(mapStateToProps)(DebtForm);