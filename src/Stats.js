import React from 'react';
import { connect } from 'react-redux';
import store from './store'

const Stats = ({ employees })=> {
  //console.log(employees)
  return (
    <p>{ employees.length } Total Employees</p>
  );
};


const mapStateToProps = (state) => {
  return {
    employees: state.employees
  }
};

export default connect(mapStateToProps)(Stats); // connect(mapState) is the container component that will get the employees from state, and then pass it in as props to State up top
