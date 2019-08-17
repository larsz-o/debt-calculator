import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 

class Metrics extends Component {
    render(){

        return(
            <div>
               
            </div>
        );
    }
}
const mapStateToProps = state => ({
    debts: state.debts.debts
})
export default connect(mapStateToProps)(Metrics);