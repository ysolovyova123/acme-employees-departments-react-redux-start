import React from 'react';
import { connect } from 'react-redux';
import { destroyEmployee, removeFromDepartment} from './store';
//import { ProgressPlugin } from 'webpack';

const Employee = (props)=> {
  //let {employee} = props.employee
  return (
    <li key={ props.employee.id }>
      { props.employee.name }
      <button onClick={ ()=> props.destroyEmployee(props.employee.id)}>x</button>
      {
        //!!removeFromDepartment && (
          <button onClick={ ()=> props.removeFromDepartment(props.employee.id)}>Remove From Department</button>
      }
    </li>
  );
};

const mapDispatchToProps = (dispatch) => {
return { // the returned stuff gets passed in as props to GroceryItem above
  destroyEmployee: (id) => { // 'toggle' can be named anything we want
    dispatch(destroyEmployee(id)); // but this needs to match exactly (toggleGrocery) what's in the store
  },
  removeFromDepartment: (id) => {
    dispatch(removeFromDepartment(id));
  }
};
};

export default connect(null, mapDispatchToProps)(Employee); // connect(mapState) is the container component that will get the groceries from state, and then pass it in as props to GroceryList up top
