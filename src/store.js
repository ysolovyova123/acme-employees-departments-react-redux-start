import {applyMiddleware, createStore} from 'redux'
import loggerMiddleware from 'redux-logger'
import axios from 'axios'

const initialState = {
  departments: [],
  employees: []
};

const DESTROY_EMPLOYEE = 'DESTROY_EMPLOYEE'
const REMOVE_FROM_DEPARTMENT = 'REMOVE_FROM_DEPARTMENT'
const SET_INITIAL_STATE = 'SET_INITIAL_STATE'


export const destroyEmployee = (employee) => ({ // action creator, returns an action
  type: DESTROY_EMPLOYEE,
  id: employee.id
});

export const removeFromDepartment = (employee) => ({ // action creator, returns an action
  type: REMOVE_FROM_DEPARTMENT,
  id: employee.id,
  departmentId: null
});

export const setInitialState = async() => ({
  type: SET_INITIAL_STATE,
  employees: await (axios.get('/api/employees')).data,
  departments: await (axios.get('/api/departments')).data
})

async function reducer(state = initialState, action) { //  receives action from action creator, uses initialState as the default variable
  switch (action.type) { // something that will cause the state to update
    case DESTROY_EMPLOYEE:
        await axios.delete(`/api/employees/${action.id}`);
        //let employees = state.employees.filter(employee => employee.id !== action.id);
        return {...state, employees: state.employees.filter(employee => employee.id !== action.id)}; // take everything in state and override the employees value

    case REMOVE_FROM_DEPARTMENT:
        let _employee = (await axios.put(`/api/employees/${action.id}`, { departmentId: action.departmentId})).data;
        let employees = state.employees.map(employee => employee.id === action.id ? {...employee, departmentId: action.departmentId} : employee);
        return {...state, employees: employees} // take everything in state and override the employees value with the new employees value (the mapping we just did)

    case SET_INITIAL_STATE:
        return {...state, employees: action.employees, departments: action.departments}
    default:
      return {...state};
  }
}

const store = createStore(reducer, applyMiddleware(loggerMiddleware));

export default store;

// const groceries = state.groceries.map(grocery => (grocery.id === action.id ? {...grocery, bought: !grocery.bought} : grocery))
