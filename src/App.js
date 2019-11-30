import React, { useState, useEffect } from "react";
import "./App.css";
import { connect } from "react-redux";
import { GET_PERSON, GET_PEOPLE } from "./Actions";
import { getIdFromUrl } from "./utils";

import Header from "./components/Header";
import InputField from "./components/InputField";
import DefaultPersons from "./components/DefaultPersons";
import PersonDetails from "./components/PersonDetails";

function App(props) {
  const [id, setId] = useState(props.personID);
  const [toggleWidgetState, setToggleWidgetState] = useState(true);
  const [ personData, setPerson ] = useState({});
  useEffect(() => {
    setId(props.personID);
    setPerson(props.personData);
  }, [props.personID, props.personData]);

  const getPersonSubmit = e => {
    e.preventDefault();
    let fetchedId = getIdFromUrl(personData.url);
    if (fetchedId !== id) {
      props.getPerson(id);
    }
  };

  const toggleWidget = e => {
    var defaultList = document.querySelector(".default__list");
    if (toggleWidgetState === false) {
      defaultList.classList.add("moveup");
      defaultList.classList.remove("movedown");
      defaultList.classList.add("active");
      setToggleWidgetState(true);
    } else {
      defaultList.classList.add("movedown");
      defaultList.classList.remove("moveup");
      defaultList.classList.remove("active");
      setToggleWidgetState(false);
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="user__section">
        <div className="container">
          <h1 className="user__h1">Search By </h1><h1 className="user__h1 scale__in">ID</h1>
          <div className="input__wrapper">
            <InputField />
            {id === "" || isNaN(id) || parseInt(id) < 1 || parseInt(id) > 88 ? (
              <button className="main__btn" onClick={e => getPersonSubmit(e)} disabled>
                GO!
              </button>
            ) : (
              <button className="main__btn" onClick={e => getPersonSubmit(e)}>GO!</button>
            )}
          </div>
        </div>
      </div>
      <div className="person__Table-wrap">
        <div className="container">
          <div className="tb__inner">
            <PersonDetails />
          </div>
        </div>
      </div>
      <div className="default__list moveup active">
        <h3 className="pr-heading">Star Wars Family</h3>
        <p className="toggle_list" onClick={e=>toggleWidget(e)}>{toggleWidgetState ? 'Hide' : 'see more'}</p>
          <DefaultPersons />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    personID: state.personID,
    personData: state.personData
  };
};

const mapDispatchToProps = {
  getPerson: GET_PERSON
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

// export default App; <DefaultPersons />
