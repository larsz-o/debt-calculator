import React, { Component } from 'react';
import swal from 'sweetalert';

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
            this.setState({
                ...this.state, 
                allDebts: [...this.state.allDebts, { name: this.state.name, balance: this.state.balance, rate: this.state.rate }]
            })
        } else {
            swal('You missed something', 'Please fill out each field.', 'error')
        }
       
    }
    deleteDebt = (i) => {
        let debts = this.state.allDebts.slice();
        console.log(debts, i);
        let result = debts.splice(i, 1);
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
        console.log('this function will send the array of debts in state to the database')
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
                </div>
                <ul className="form-container">
                {this.state.allDebts.map((debt, i) => {
                    return(
                        <li key={i}>{debt.name} : {debt.balance} @ {debt.rate} % &nbsp; <button onClick={()=>this.editDebt(debt, i)}>Edit</button><button onClick={()=>this.deleteDebt(i)}>Delete</button></li>
                    )
                })}
                </ul>
                {this.state.allDebts.length > 0 && <button className="save" onClick={()=>this.saveDebts()}>Save</button>}
            </main>
        );
    }
}

export default DebtForm;