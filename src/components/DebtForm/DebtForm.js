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
            rate: '', 
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
            allDebts: debts,
            name: '',
            balance: '',
            rate: ''
        })
    }
    saveChanges = (event) => {
        event.preventDefault();
        this.resetValues(); 
    }
    saveDebts = () => {
        for(let i = 0; i < this.state.allDebts.length; i++){
            console.log(this.state.allDebts[i]);
            axios({
                method: 'POST',
                url: '/api/debts',
                data: this.state.allDebts[i]
            }).then((response) => {
                console.log('Debts added. We will need to move to the next page now and fetch our debts');
            }).catch((error) => {
                console.log('Error posting debts', error);
            })
        }
     
    }
    render(){
        return(
            <main>
                <div className="flex-box">
                <div className="form-container flex-item">
                <h2>Enter your debts</h2>
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
                    {this.state.edit && <button className="submit clear" onClick={(event)=>this.saveChanges(event)}>Save Changes</button>}
                </div>
              
                
                </div>
                <div className="flex-item">
                <h2>Tally</h2>
                <ol type="1">
                {this.state.allDebts.map((debt, i) => {
                    return(
                        <li key={i}><h3>{debt.name}<span className="button-div"><img src={require('../images/pencil.png')} alt="edit icon" onClick={()=>this.editDebt(debt, i)}/></span><span className="button-div"><img src={require('../images/delete-button.png')} alt="trash can" onClick={()=>this.deleteDebt(i)}/></span></h3><h4>${debt.balance} @ {debt.rate}%</h4>  &nbsp;</li>
                    )
                })}
                </ol>
                <h2>Total: ${Number(this.state.allDebts.reduce((accumulator, debt) => accumulator + debt.balance, 0)).toLocaleString()}</h2>
                </div>
                </div>
              
             
                {this.state.allDebts.length > 0 && <div className="center breathing-room"><button onClick={()=>this.saveDebts()}>Save + Continue</button></div>}
            </main>
        );
    }
}

export default DebtForm;