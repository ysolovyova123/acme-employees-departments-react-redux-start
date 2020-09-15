import React from 'react';
import Employees from './Employees';
import { connect } from 'react-redux';
//import { ProgressPlugin } from 'webpack';

const Department = ({department, employees})=> { // this is a stateless component, so you can define props in the (), but if you don't have class, can't use this or this.props.element implicitly
    return (
      <li>
        <span className='department-title'>
          { department ? department.name : 'No Department' } ({
            employees.filter( employee => employee.departmentId === (department ? department.id : null) ).length
          })
        </span>
        <Employees
          employees ={ employees } department = {department}
        />
      </li>
    );
};

const mapStateToProps = (state) => {
  return {
    employees: state.employees
  }
};

export default connect(mapStateToProps)(Department); // connect(mapState) is the container component that will get the groceries from state, and then pass it in as props to GroceryList up top
