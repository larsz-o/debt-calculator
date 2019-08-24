import React, { Component } from 'react';

class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            register: false
        }
    }
 
    render(){
        return(
           <div>
               {this.state.register ? (<div>You are already registered</div>) :  (<div>You will register</div>)}
           </div>
        )
    }
}
export default LoginPage;