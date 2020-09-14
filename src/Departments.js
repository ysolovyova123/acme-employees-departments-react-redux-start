import React from 'react';
import Department from './Department';
import { connect } from 'react-redux';
import { destroyEmployee, removeFromDepartment} from './store';
//import { ProgressPlugin } from 'webpack';

const Departments = (props)=> {
  return (
    <ul className='departments'>
      <Department destroyEmployee={ destroyEmployee } employees={ props.employees } />
      {
        props.departments.map( department => {
          return (
            <Department
              key = { department.id }
              department = {department}
            />
          );
        })
      }
    </ul>
  );
}

const mapStateToProps = (state) => {
  return {
    departments: state.departments,
    employees: state.employees
  }
};

export default connect(mapStateToProps)(Departments); // connect(mapState) is the container component that will get the employees from state, and then pass it in as props to State up top
