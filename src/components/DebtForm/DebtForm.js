import React, { Component } from 'react';
import { thisTypeAnnotation } from '@babel/types';

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
        this.setState({
            ...this.state, 
            allDebts: [...this.state.allDebts, { name: this.state.name, balance: this.state.balance, rate: this.state.rate }]
        })
    }
    deleteDebt = (i) => {
        let debts = this.state.allDebts.slice();
        console.log(debts, i);
        let result = debts.splice(i, 1);
        this.setState({
            ...this.state, 
            allDebts: debts
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

    render(){
        return(
            <main>
                <h2>Enter your debts</h2>
                <form>
                    <label>Name</label>
                    <input value={this.state.name} type="text" onChange={(event)=>this.handleChangeFor(event, 'name')}/>
                    <label>Amount owed</label>
                    <input value={this.state.balance} type="float" onChange={(event)=>this.handleChangeFor(event, 'balance')}/>
                    <label>Interest rate</label>
                    <input value={this.state.rate} type="float" onChange={(event)=>this.handleChangeFor(event, 'rate')}/>
                    {this.state.add && <button onClick={(event)=>this.addDebt(event)}>Add</button>}
                    {this.state.edit && <button onClick={(event)=>this.saveChanges(event)}>Save Changes</button>}
                </form>
                <ul>
                {this.state.allDebts.map((debt, i) => {
                    return(
                        <li key={i}>{debt.name} {debt.balance} {debt.rate}% <button onClick={()=>this.editDebt(debt, i)}>Edit</button><button onClick={()=>this.deleteDebt(i)}>Delete</button></li>
                    )
                })}
                </ul>
                {JSON.stringify(this.state)}
            </main>
        );
    }
}

export default DebtForm;