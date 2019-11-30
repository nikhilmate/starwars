import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getIdFromUrl } from '../utils';
import { GET_PERSON } from "../Actions";

function DefaultPersons({peopleData, getPerson}){
  const [people, setPeople] = useState(peopleData);

  useEffect(() => {
    setPeople(peopleData);
  }, [peopleData]);

  const setViewId = (e) => {
    e.preventDefault();
    var id = e.currentTarget.getAttribute('data-pid');
    getPerson(id);
  };

  if (Object.keys(people).length > 0) {
    let keys = Object.keys(people);
    return (
      <React.Fragment>
        <div className="heading__wrap">
          <div className="pr-inner">
            <p className="id-text">ID</p>
            <p className="pr-name">Name</p>
            <p className="pr-gender">Gender</p>
          </div>
        </div>
        <div className="people__wrap">
          <div className="people__block">
            {
              keys.map((key, indx) =>{
                let pRow = people[key];
                let id = key;
                return (
                  <div key={indx+1} id={indx+1+"-pr-card"} className="pr-card">
                    <div className="pr-inner">
                      <p className="id-text">{id}</p>
                      <p className="pr-name">{pRow.name}</p>
                      <p className="pr-gender">{pRow.gender === 'n/a' ? ":(" : pRow.gender}</p>
                      <a data-pid={id} onClick={(e) => setViewId(e)} className="view__btn">View</a>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div className="p-loader__wrap">
          <p className="leftWrap">Getting Content...</p>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  // mapsStateToProps
  state => ({peopleData: state.persons}),
  { getPerson: GET_PERSON }
)(DefaultPersons);

/*
<div className="arrow left__arrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="20" viewBox="0 0 14 24">
              <path fill="#666" fill-rule="evenodd" d="M11.336 0L14 2.82 5.347 12 14 21.18 11.336 24 0 12z"></path>
            </svg>
          </div>
<div className="arrow right__arrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="20" viewBox="0 0 14 24"><path fill="#666" fill-rule="evenodd" d="M2.664 0L0 2.82 8.653 12 0 21.18 2.664 24 14 12z"></path></svg>
          </div>


          <div className="load-more__section">
              <a className="load-more__btn">Load More</a>
            </div>
*/