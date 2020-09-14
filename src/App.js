import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import Departments from './Departments';
import Stats from './Stats';
import store from './store'
import { setInitialState } from './store'

class App extends React.Component{
  constructor(props){
    super(props);
  }

  async componentDidMount(){
    console.log(store.getState())
    setInitialState() // axios call to fill in empty employee and departments arrays with actual data from db
    // console.log(store.getState())
  }

  render(){
    return (
      <div>
        <h1>Acme Employees And Departments</h1>
        <Stats />
        <Departments/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      departments: state.departments,
      employees: state.employees
    }
};

export default connect(mapStateToProps)(App); // connect(mapState) is the container component that will get the groceries from state, and then pass it in as props to GroceryList up top
