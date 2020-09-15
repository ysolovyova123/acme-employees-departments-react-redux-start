import React from 'react';
import Employee from './Employee';

const Employees = ({ employees, department})=> {
  return (
      <ul>
        {
          employees.filter( employee => employee.departmentId === (department ? department.id : null )).map( employee =>
            <Employee key={ employee.id } employee={ employee } />)
        }
      </ul>
  );
};

export default Employees;
