import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import swal from 'sweetalert'; 

class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            login: true, 
            username: '', 
            password: '', 
            first_name: '', 
            email: '', 
            confirm_password: ''
        }
    }
 handleChangeFor = (event, property) => {
     this.setState({
         ...this.state, 
         [property]: event.target.value
     })
 }
 login = (event) => {
     event.preventDefault();
     this.props.dispatch({type: 'LOGIN', payload: this.state});
 }
 registerUser = (event) => {
     event.preventDefault(); 
     if(this.state.password === this.state.confirm_password){
        this.props.dispatch({type: 'REGISTER_USER', payload: this.state})
     } else {
         swal('This is a problem', `Passwords don't match. Please try again`, 'error'); 
     }
 }
 setRegister = () => {
     this.setState({
         ...this.state,
         login: !this.state.login
     })
 }
    render(){
        return(
           <main>
               <div className="flex-box">
               {this.state.login ? (
               <div className="col-4">
                   <h3>Login</h3>
                   <form>
                       <label>Username</label>
                       <input/>
                       <label>Password</label>
                       <input type="password"/>
                       <button onClick={(event)=>this.login(event)}>Login</button>
                   </form>
                   <p>New user? <div className="link" onClick={()=>this.setRegister()}>Create an account</div></p>
               </div>) :  
               (<div className="col-4">
                   <h3>Register</h3>
                   <form>
                       <label>Username</label>
                       <input value={this.state.username} onChange={(event)=>this.handleChangeFor(event, 'username')}/>
                       <label>Password</label>
                       <input type="password" value={this.state.password} onChange={(event)=>this.handleChangeFor(event, 'password')}/>
                       <label>Confirm Password</label>
                       <input type="password" value={this.state.confirm_password} onChange={(event)=>this.handleChangeFor(event, 'confirm_password')}/>
                       <label>First Name</label>
                       <input value={this.state.first_name} onChange={(event)=>this.handleChangeFor(event, 'first_name')}/>
                       <label>Email</label>
                       <input value={this.state.email} onChange={(event)=>this.handleChangeFor(event, 'email')} type="email"/>
                    <button onClick={(event)=>this.registerUser(event)}>Register</button>
                   </form>
                   <p><div className="link" onClick={()=>this.setRegister()}>Return to login</div></p>
               </div>)}
               </div>
           </main>
        )
    }
}
export default connect()(LoginPage);