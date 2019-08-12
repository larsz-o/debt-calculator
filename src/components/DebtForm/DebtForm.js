import React, { Component } from 'react';
import swal from 'sweetalert';
import axios from 'axios';

class DebtForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            balance: '',
            rate: '',
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
        if (this.state.name !== '' && this.state.balance !== '' && this.state.rate !== ''){
            let balance = parseFloat(this.state.balance);
            let rate = parseFloat(this.state.rate);
                this.setState({
                    ...this.state, 
                    allDebts: [...this.state.allDebts, { name: this.state.name, balance: balance, rate: rate }]
                })
        } else {
            swal('You missed something', 'Please fill out each field.', 'error')
        }
       
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
            rate: ''
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
            index: i
        })
    }
    resetValues = () => {
    let debts = this.state.allDebts.slice();
    debts[this.state.index] = {name: this.state.name, balance: this.state.balance, rate: this.state.rate};
    this.setState({
            ...this.state,
            add: true, 
            edit: false,
            allDebts: debts
        })
    }
    saveChanges = (event) => {
        event.preventDefault();
        this.resetValues(); 
    }
    saveDebts = () => {
        console.log('this function will send the array of debts in state to the database');
        axios({
            method: 'post',
            url: '/debts',
            data: this.state.allDebts
        }).then((response) => {
            console.log('Debts added. We will need to move to the next page now and fetch our debts');
        }).catch((error) => {
            console.log('Error posting debts', error);
        })
    }
    render(){
        return(
            <main>
                <h2>Enter your debts</h2>
                <div className="form-container">
                <form>
                    <label>Name</label>
                    <input value={this.state.name} type="text" onChange={(event)=>this.handleChangeFor(event, 'name')} required/>
                    <label>Amount owed</label>
                    <input value={this.state.balance} type="float" onChange={(event)=>this.handleChangeFor(event, 'balance')} required/>
                    <label>Interest rate</label>
                    <input value={this.state.rate} type="float" onChange={(event)=>this.handleChangeFor(event, 'rate')} required/>
                </form>
                <div className="center">
                    {this.state.add && <button className="submit" onClick={(event)=>this.addDebt(event)}>Add</button>}
                    {this.state.edit && <button className="submit save" onClick={(event)=>this.saveChanges(event)}>Save Changes</button>}
                </div>
              
                <ul>
                {this.state.allDebts.map((debt, i) => {
                    return(
                        <li key={i}>{debt.name} : {debt.balance} @ {debt.rate} % &nbsp; <button onClick={()=>this.editDebt(debt, i)}>Edit</button><button onClick={()=>this.deleteDebt(i)}>Delete</button></li>
                    )
                })}
                </ul>
                {this.state.allDebts.length > 0 && <div className="center"><button className="clear" onClick={()=>this.saveDebts()}>Save</button></div>}
                </div>
                {JSON.stringify(this.state)}
            </main>
        );
    }
}

export default DebtForm;