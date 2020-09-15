import {applyMiddleware, createStore} from 'redux'
import loggerMiddleware from 'redux-logger'
import axios from 'axios'
import thunk from 'redux-thunk'

const initialState = {
  departments: [],
  employees: []
};

const DESTROY_EMPLOYEE = 'DESTROY_EMPLOYEE'
const REMOVE_FROM_DEPARTMENT = 'REMOVE_FROM_DEPARTMENT'
const SET_INITIAL_EMPLOYEES = 'SET_INITIAL_EMPLOYEES'
const SET_INITIAL_DEPARTMENTS = 'SET_INITIAL_DEPARTMENTS'

export const destroyEmployee = (id) => {
  return async (dispatch, getState) => {
    await axios.delete(`/api/employees/${id}`)
    dispatch(deleteEmployee(id))
  };
}

export const removeFromDepartment = (id) => {
  return async (dispatch, getState) => {
    const {data} = await axios.put(`/api/employees/${id}`)
    dispatch(removeEmployeeFromDepartment(data))
  }
}

export const fetchEmployees = () => {
  return async (dispatch, getState) => {
    const {data} = await axios.get('/api/employees')
    dispatch(setInitialEmployees(data))
  };
}

export const fetchDepartments = () => {
  return async (dispatch, getState) => {
    const {data} = await axios.get('/api/departments')
    dispatch(setInitialDepartments(data))
  };
}

export const setInitialEmployees = (data) => ({ // action creator, returns an action
  type: SET_INITIAL_EMPLOYEES,
  employees: data
})

export const setInitialDepartments = (data) => ({ // action creator, returns an action
  type: SET_INITIAL_DEPARTMENTS,
  departments: data
})

export const deleteEmployee = (id) => ({
  type: DESTROY_EMPLOYEE,
  id: id
})

export const removeEmployeeFromDepartment = (data) => ({ // action creator, returns an action
  type: REMOVE_FROM_DEPARTMENT,
  id: data.id,
  departmentId: null
});

function reducer(state = initialState, action) { //  receives action from action creator, uses initialState as the default variable
  switch (action.type) { // something that will cause the state to update
    case DESTROY_EMPLOYEE:
        let employees = state.employees.filter(employee => employee.id !== action.id)
        return {...state, employees: employees}
        //let employees = state.employees.filter(employee => employee.id !== action.id);
        //return {...state, employees: state.employees.filter(employee => employee.id !== action.id)}; // take everything in state and override the employees value

    case REMOVE_FROM_DEPARTMENT:
        let updatedEmployees = state.employees.map(employee => employee.id === action.id ? {...employee, departmentId: action.departmentId} : employee)
        return {...state, employees: updatedEmployees}
    // case REMOVE_FROM_DEPARTMENT:
    //     let _employee = (await axios.put(`/api/employees/${action.id}`, { departmentId: action.departmentId})).data;
    //     let employees = state.employees.map(employee => employee.id === action.id ? {...employee, departmentId: action.departmentId} : employee);
    //     return {...state, employees: employees} // take everything in state and override the employees value with the new employees value (the mapping we just did)

    case SET_INITIAL_EMPLOYEES:
        return {...state, employees: action.employees}

    case SET_INITIAL_DEPARTMENTS:
        return {...state, departments: action.departments}

    default:
      return {...state};
  }
}

const store = createStore(reducer, applyMiddleware(loggerMiddleware,thunk));

export default store;

// const groceries = state.groceries.map(grocery => (grocery.id === action.id ? {...grocery, bought: !grocery.bought} : grocery))
// applyMiddleware(thunk.withExtraArgument(axios))
