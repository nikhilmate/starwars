import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

const CHANGE_PERSON = "CHANGE_PERSON";
const CHANGE_PERSON_DATA = "CHANGE_PERSON_DATA";
const ADD_PERSONS = "ADD_PERSONS";
const CHANGE_PEOPLE_LOADER_STATE = "CHANGE_PEOPLE_LOADER_STATE";
const CHANGE_PERSON_LOADER_STATE = "CHANGE_PERSON_LOADER_STATE";
const STATE_PEOPLE_ERROR = "STATE_PEOPLE_ERROR";
const STATE_PERSON_ERROR = "STATE_PERSON_ERROR";

const SET_MOVIES = "SET_MOVIES";
const SET_SPECIES = "SET_SPECIES";
const SET_HOMEWORLD = "SET_HOMEWORLD";


const defaultErrorState = {
  getPeopleState: {},
  getPersonState: {}
};

const initState = {
  loaderState: {
    getPeopleState: false,
    getPersonState: false
  },
  error: defaultErrorState,
  personID: "",
  personData: {},
  movies: [],
  species: [],
  homeworld: {},
  persons: {}
};

const swReducer = (state = initState, action) => {
  switch (action.type) {
    
    // change input value {
    case CHANGE_PERSON:
      // return {
      //   ...state,
      //   personID : action.id
      // }
      return Object.assign({}, state, {
        // personData: {},
        error: Object.assign({}, state.error, {
          getPersonState: {}
        }),
        personID: action.id
      });

    // }

    // add person data
    case CHANGE_PERSON_DATA:
      if (typeof action.data === "object")
        // return {
        //   ...state,
        //   personData: Object.assign({}, action.data)
        // }
        return Object.assign({}, state, {
          loaderState: Object.assign({}, state.loaderState, {
            getPersonState: false
          }),
          error: Object.assign({}, state.error, {
            getPersonState: {}
          }),
          personData: Object.assign({}, action.data),
          movies: [],
          species: []
        });
      else return state;

    // 

    // add peoples
    case ADD_PERSONS:
      if (action.persons !== {})
        // return {
        //   ...state,
        //   persons : action.persons
        // }
        return Object.assign({}, state, {
          loaderState: Object.assign({}, state.loaderState, {
            getPeopleState: false
          }),
          error: Object.assign({}, state.error, {
            getPeopleState: {}
          }),
          persons: action.persons
          // persons: action.persons
        });
      else return state;

    // 

    // change people loader state 
    case CHANGE_PEOPLE_LOADER_STATE:
      if (action.status !== undefined)
        // return {
        //   ...state,
        //   loaderState: action.status
        // }
        return Object.assign({}, state, {
          error: Object.assign({}, state.error, {
            getPeopleState: {}
          }),
          loaderState: Object.assign({}, state.loaderState, {
            getPeopleState: action.status
          })
        });
      else return state;

    // 

    // change person loader state
    case CHANGE_PERSON_LOADER_STATE:
      if (action.status !== undefined)
        // return {
        //   ...state,
        //   loaderState: action.status
        // }
        return Object.assign({}, state, {
          error: Object.assign({}, state.error, {
            getPersonState: {}
          }),
          loaderState: Object.assign({}, state.loaderState, {
            getPersonState: action.status
          }),
          personData: {}
        });
      else return state;
    
    // 

    // change people error state 
    case STATE_PEOPLE_ERROR:
      return Object.assign({}, state, {
        error: Object.assign({}, state.error, {
          getPeopleState: action.data
        }),
        loaderState: Object.assign({}, state.loaderState, {
          getPeopleState: false
        })
      });

    // 

    // change people error state
    case STATE_PERSON_ERROR:
      return Object.assign({}, state, {
        error: Object.assign({}, state.error, {
          getPersonState: action.data
        }),
        loaderState: Object.assign({}, state.loaderState, {
          getPersonState: false
        })
      });

    // set movies
    case SET_MOVIES:
      return Object.assign({}, state, {
        movies: action.movies
      });

    // set Species
    case SET_SPECIES:
      return Object.assign({}, state, {
        species: action.species
      });

    // set Homeworld
    case SET_HOMEWORLD:
      return Object.assign({}, state, {
        homeworld: action.homeworld
      });

    // 
    default:
      return state;
  }
};

// export default createStore(swReducer, applyMiddleware(thunk));

export default () => {
  const store = createStore(swReducer, applyMiddleware(thunk));
  return store;
};
