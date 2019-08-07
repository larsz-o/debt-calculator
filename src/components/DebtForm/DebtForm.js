import React, { Component } from 'react';

class DebtForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            balance: '',
            rate: '',
            allDebts: []
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
                    <button onClick={(event)=>this.addDebt(event)}>Add</button>
                </form>
            </main>
        );
    }
}

export default DebtForm;