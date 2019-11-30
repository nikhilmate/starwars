import { getPeople, getPerson, getContent } from './ApiServices';
import { getIdFromUrl } from './utils';

export function GET_PEOPLE() {
  return dispatch => {
    dispatch({ type: 'CHANGE_PEOPLE_LOADER_STATE', status: true });
    const localPeopleData = localStorage.getItem("peopleData");
    if(localPeopleData) {
      let tempParsed = JSON.parse(localPeopleData);
      dispatch({ type: 'ADD_PERSONS', persons: tempParsed });  
    } else {
      return getPeople()
      .then(res => {
        var newPerObj = res;
        // res.map((page, index) => {
        //   newPerObj[index] = page;
        // });
        dispatch({ type: 'ADD_PERSONS', persons: newPerObj });
        var peopleData = JSON.stringify(newPerObj);
        localStorage.setItem("peopleData", peopleData);
      })
      .catch(error => 
        dispatch({ type: 'STATE_PEOPLE_ERROR', data: error })
      );
    }
  }
}

export function GET_PERSON(id) {
  return (dispatch) => {
    dispatch({ type: 'CHANGE_PERSON_LOADER_STATE', status: true });
    var notPresent = true;
    var localData = localStorage.getItem("peopleData");
    if (localData) {
      var peopleData = JSON.parse(localData);
      if (peopleData && Object.keys(peopleData).length > 0) {
        var localPerson = peopleData[id];
        if (localPerson && Object.keys(localPerson).length > 0) {
            notPresent = false;
            dispatch({ type: 'CHANGE_PERSON_DATA', data: localPerson });
            // var localMoviesData = localStorage.getItem("peopleMovies");
            // if (localMoviesData) {
            //   var parsedMov = JSON.parse(localMoviesData);
            //   if (Object.keys(parsedMov).length > 0) {
            //     Object.keys(parsedMov).map(());
            //   }
            // }
            let pdListTemp = localPerson;
            let films = pdListTemp.films ? pdListTemp.films : [];
            let species = pdListTemp.species ? pdListTemp.species : [];
            let homeworld = pdListTemp.homeworld !== "" ? pdListTemp.homeworld : "";

            if (films.length > 0) {
              getContent(films)
                .then(mov => {
                  dispatch({ type: 'SET_MOVIES', movies: mov });
                });
            }
            if (species.length > 0) {
              getContent(species)
                .then(spec => {
                  dispatch({ type: 'SET_SPECIES', species : spec });
                });
            }
            if (homeworld) {
              getContent(homeworld)
                .then(homeworldData => {
                  dispatch({ type: 'SET_HOMEWORLD', homeworld : homeworldData });
                });
            }
        }
        /*
        peopleData[objKey].map(column => {
          column.results.map(row => {
            var custId =  getIdFromUrl(row.url);
            if (id === custId) {
              notPresent = false;
              dispatch({ type: 'CHANGE_PERSON_DATA', data: row });
              let pdListTemp = row;
              let films = pdListTemp.films ? pdListTemp.films : [];
              let species = pdListTemp.species ? pdListTemp.species : [];

              if (films.length > 0) {
                getContent(films)
                  .then(mov => {
                    dispatch({ type: 'SET_MOVIES', movies: mov });
                  });
              }
              if (species.length > 0) {
                getContent(species)
                  .then(spec => {
                    dispatch({ type: 'SET_SPECIES', species : spec });
                  });
              }
            }
          })
        })
        */
      }
    }
    if (notPresent) {
      return getPerson(id)
      .then(res => {
        dispatch({ type: 'CHANGE_PERSON_DATA', data: res });
        var films = res.films || [];
        var species = res.species || [];
        let homeworld = res.homeworld !== "" ? res.homeworld : "";
        if (films.length > 0) {    
          getContent(films)
            .then(mov => {
              dispatch({ type: 'SET_MOVIES', movies: mov });
            });
        }
        if (species.length > 0) {
          getContent(species)
            .then(spec => {
              dispatch({ type: 'SET_SPECIES', species : spec });
            });
        }
        if (homeworld) {
          getContent(homeworld)
            .then(homeworldData => {
              dispatch({ type: 'SET_HOMEWORLD', homeworld : homeworldData });
            });
        }
      })
      .catch(error => 
        dispatch({ type: 'STATE_PERSON_ERROR', data: error })
      );
    }
  }
}

/*
export function GET_PERSON(id) {
  return (dispatch) => {
    dispatch({ type: 'CHANGE_PERSON_LOADER_STATE', status: true });
    var notPresent = true;
    var getList = JSON.parse(localStorage.getItem("personList"));
    if (getList && getList.idList.length > 0) {
      for (let i = 0; i < getList.idList.length; i++) {
        if (id === getList.idList[i]) {
          notPresent = false;
          dispatch({ type: 'CHANGE_PERSON_DATA', data: getList.pdList[i] });

          let pdListTemp = getList.pdList[i];
          let films = pdListTemp.films ? pdListTemp.films : [];
          let species = pdListTemp.species ? pdListTemp.species : [];

          if (films.length > 0) {
            getContent(films)
              .then(mov => {
                dispatch({ type: 'SET_MOVIES', movies: mov });
              });
          }
          if (species.length > 0) {
            getContent(species)
              .then(spec => {
                dispatch({ type: 'SET_SPECIES', species : spec });
              });
          }
        }
      }
    }
    if (notPresent) {
      return getPerson(id)
      .then(res => {
        dispatch({ type: 'CHANGE_PERSON_DATA', data: res });
        new Promise(function(resolve, reject){
          setLocalPeopleData(res);
        });
        var films = res.films || [];
        var species = res.species || [];
        if (films.length > 0) {    
          getContent(films)
            .then(mov => {
              dispatch({ type: 'SET_MOVIES', movies: mov });
            });

        }
        if (species.length > 0) {
          getContent(species)
            .then(spec => {
              dispatch({ type: 'SET_SPECIES', species : spec });
            });
        }
      })
      .catch(error => 
        dispatch({ type: 'STATE_PERSON_ERROR', data: error })
      );
    }
  }
}
*/
export function SET_PERSON(id){
  return dispatch => dispatch({ type: 'CHANGE_PERSON', id: id});
}
 