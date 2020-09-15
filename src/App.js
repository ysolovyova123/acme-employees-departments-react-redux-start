import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import Departments from './Departments';
import Stats from './Stats';
import store from './store'
import { fetchEmployees, fetchDepartments } from './store'

class App extends React.Component{
  constructor(props){
    super(props);
  }

  async componentDidMount(){
    //console.log(this.props)
    // console.log(props.departments)
    // console.log(store.getState())
    this.props.fetchEmployees(),
    this.props.fetchDepartments()
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

const mapDispatchToProps = (dispatch) => {
  return { // the returned stuff gets passed in as props to GroceryItem above
    fetchEmployees: () => { // 'toggle' can be named anything we want
      dispatch(fetchEmployees()); // but this needs to match exactly (toggleGrocery) what's in the store
    },
    fetchDepartments: () => { // 'toggle' can be named anything we want
      dispatch(fetchDepartments()); // but this needs to match exactly (toggleGrocery) what's in the store
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App); // connect(mapState) is the container component that will get the groceries from state, and then pass it in as props to GroceryList up top
