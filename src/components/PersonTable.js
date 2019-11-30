import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getIdFromUrl } from '../utils';

function PersonTable(props){

  const [person, setPerson] = useState(props.personData);
  const [speciesData, setSpeciesData] = useState({});
  const [filmsData, setFilmsData] = useState({});
  const [ homeworld, setHome ] = useState({});

  useEffect(() => {
    setPerson(props.personData);
    setSpeciesData(props.species);
    setFilmsData(props.movies);
    setHome(props.homeworld);
  }, [props.species, props.movies, props.personData, props.homeworld]);
  // [props.personData]); 

  const setContent = () => {
    let height = person.height;
    let mass = person.mass;
    if (height !== 'unknown' && mass !== 'unknown') {
      return `${height}cm / ${mass}kg`;
    } else {
      return `:(`;
    }
  }
  
  return (
    <div className="person__wrap">
      <div className="person__details">
        <div className="result__text">
          <p>Result id: {getIdFromUrl(person.url) ? getIdFromUrl(person.url) : ""}</p>
        </div>
        <div className="ColWrap p-name">
          <div className="rightWrap">
            <p>{person.name}<span className="in__gender">{` (${person.gender[0]})`}</span></p>
          </div>
        </div>
        <div className="rowWrap">
          <div className="leftWrap">
            <p>Date Of Birth </p>
          </div>
          <div className="rightWrap">
            <p>{person.birth_year}</p>
          </div>
        </div>
        <div className="rowWrap">
          <div className="leftWrap">
            <p>Type</p>
          </div>
          <div className="rightWrap">
            {
              speciesData.length > 0 ? 
              speciesData.map((data, i) => 
                <p key={i} id={i}>{data.name}</p>
              )
              :
              <p>Dont know yet!</p>
            }
          </div>
        </div>
        <div className="rowWrap">
          <div className="leftWrap">
            <p>Height and Mass </p>
          </div>
          <div className="rightWrap">
            <p>{setContent()}</p>
          </div>
        </div>
        <div className="rowWrap">
          <div className="leftWrap">
            <p>Homeworld</p>
          </div>
          <div className="rightWrap">
            <p>{homeworld.name ? homeworld.name : "Don't know yet"}</p>
          </div>
        </div>
        <div className="rowWrap">
          <div className="leftWrap">
            <p>Looks </p>
          </div>
          <div className="rightWrap">
            <p>
              {`Eye Color : ${person.eye_color},`}
              <br />
              {`Hair Color: ${person.hair_color},`}
              <br />
              {`Skin Color: ${person.skin_color}`}
            </p>
          </div>
        </div>
        <div className="ColWrap">
          <div className="leftWrap">
            <p>Films </p>
          </div>
          <div className="rightWrap">
            {
              (filmsData.length > 0) 
              ?
              filmsData.sort((a,b)=> {
                // if (isEmpty(a)) return -1;
                // if (isEmpty(b)) return 1; 
                return (a.release_date.split("-")[0] - b.release_date.split("-")[0])
              }).map((val, index) => (
                <p key={index + 1}>{`${val.title} (${val.release_date.split("-")[0]})`}</p>
              )) 
              :
              <p>Dont know yet!</p> 
            }
          </div>
        </div>
      </div>
    </div>
  );
}
// export default PersonTable;

export default connect(
  // mapsStateToProps
  state => ({
    // personData: state.personData,
    movies: state.movies,
    species: state.species,
    homeworld: state.homeworld
  })
)(PersonTable);
/*
function PersonTable(props){
  const [person, setPerson] = useState({});
  const [filmsData, setFilmData] = useState([]);
  const [speciesData, setSpeciesData] = useState([]);
  var flag = true;
  // const controller = new AbortController();
  // var signal = controller.signal;
  
  useEffect(() => {
    if (props.personData !== person) {
      filmsArrange();
      speciesArrange();
      setPerson(props.personData);
    }
    return () => {
      flag = false;
      // controller.abort();
    };
  }, [props.personData]);

  // const resolvedHeight = () => {
  //   var tp_seelctor = document.querySelector(".tb__inner");
  //   var personWrap =  document.querySelector(".person__wrap");
  //   if (tp_seelctor && personWrap) {
  //     tp_seelctor.style.height = `${personWrap.style.height}px`;
  //   }
  // }
}

class PersonTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      person: {},
      filmsData: [],
      speciesData: [],
      apiFilmFlag: false,
      apiSpeciesFlag: false
    };
  }

  componentDidUpdate(prevProps, prevState){
    console.log("\n@@@@@@@@@@@@@@@@@\n", prevState, this.props);
    // console.log("Enterd", prevProps.person.name,  this.props.personData.name);
    if (prevState.person.name !== this.props.personData.name) {
      // var filmsData = getContentFromUrl(this.props.personData.films);
      var arrFilms = [];
      for (let i = 0; i < this.props.personData.films.length; i++) {
        Xhr(this.props.personData.films[i])
        .then(res => {
          arrFilms.push(res);
          if (arrFilms.length === this.props.personData.films.length) {
            this.setState((prevState) => ({
              filmsData: [...prevState.filmsData, ...arrFilms],
              apiFilmFlag: true
            }));  
          }
        })
        .catch(err => console.log(err))
        // this.setState({filmsData: arr});
      }
      var arrSpecies = [];
      for (let i = 0; i < this.props.personData.species.length; i++) {
        Xhr(this.props.personData.species[i])
        .then(res => {
          arrSpecies.push(res);

          if (arrSpecies.length === this.props.personData.species.length) {
            this.setState((prevState) => ({
              speciesData: [...prevState.speciesData, ...arrSpecies],
              apiSpeciesFlag: true
            }));
          }
        })
        .catch(err => console.log(err))
        // this.setState({filmsData: arr});
      }
    }
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   console.log("IN State", nextProps);
  //   if (this.state.person.name !== nextProps.personData.name) {
  //     this.setState({
  //       person: nextProps.personData
  //     });
  //     return true;
  //   }
  //   return false;
  // }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.personData.name !== prevState.person.name) {
      console.log(prevState);
      return { ...prevState, person: nextProps.personData, filmsData: [], speciesData: [], apiFilmFlag: false, apiSpeciesFlag: false};
    }
    else if (nextProps.personError !== prevState.personError) {
      return { ...prevState, filmsData: [],
        speciesData: [], apiFilmFlag: false, apiSpeciesFlag: false, personError: nextProps.personError };
    }
    else return { prevState };
	}

  setContent = () => {
    let height = this.state.person.height;
    let mass = this.state.person.mass;
    if (height !== 'unknown' && mass !== 'unknown') {
      return `${height}cm / ${mass}kg`;
    } else {
      return `:(`;
    }
  }

  render(){
    let person = this.state.person; 
    let heightMass = this.setContent();
    return (
      <div className="person__wrap">
        <div className="person__details">
          <div className="result__text">
            <p>Result id: {getIdFromUrl(person.url) ? getIdFromUrl(person.url) : ""}</p>
          </div>
          <div className="ColWrap p-name">
            <div className="rightWrap">
              <p>{person.name}<span className="in__gender">{` (${person.gender[0]})`}</span></p>
            </div>
          </div>
          <div className="rowWrap">
            <div className="leftWrap">
              <p>Date Of Birth </p>
            </div>
            <div className="rightWrap">
              <p>{person.birth_year}</p>
            </div>
          </div>
          <div className="rowWrap">
            <div className="leftWrap">
              <p>Type</p>
            </div>
            <div className="rightWrap">
              {
                this.state.apiSpeciesFlag &&
                this.state.speciesData.length > 0 ? 
                this.state.speciesData.map((data, i) => 
                  <p key={i} id={i}>{data.name}</p>
                )
                :
                <p>Dont know yet!</p>
              }
            </div>
          </div>
          <div className="rowWrap">
            <div className="leftWrap">
              <p>Height and Mass </p>
            </div>
            <div className="rightWrap">
              <p>{heightMass}</p>
            </div>
          </div>
          <div className="rowWrap">
            <div className="leftWrap">
              <p>Looks </p>
            </div>
            <div className="rightWrap">
              <p>
                {`Eye Color : ${person.eye_color},`}
                <br />
                {`Hair Color: ${person.hair_color},`}
                <br />
                {`Skin Color: ${person.skin_color}`}
              </p>
            </div>
          </div>
          <div className="ColWrap">
            <div className="leftWrap">
              <p>Films </p>
            </div>
            <div className="rightWrap">
              {
                (this.state.apiFilmFlag && this.state.filmsData.length > 0) 
                ?
                this.state.filmsData.sort((a,b)=> {
                  return (a.release_date.split("-")[0] - b.release_date.split("-")[0])
                }).map((val, index) => (
                  <p key={index + 1}>{`${val.title} (${val.release_date.split("-")[0]})`}</p>
                )) 
                :
                <p>Dont know yet!</p> 
              }
            </div>
          </div>
        </div>
      </div>
    ); 
  }
}

export default connect(
  // mapsStateToProps
  state => ({
    personData: state.personData,
  })
)(PersonTable);
*/

/*
  // filmsArrange = () => {
  //   console.log(person);
  //   if (!isEmpty(person)) {
  //     if (person.films.length !== 0) {
  //       let arr = getContentFromUrl(person.films);
  //       if (flag) {
  //         // setFilmData(arr);
  //       }
  //     }
  //   }
  // }

  // speciesArrange = () => {
  //   console.log(person);
  //   if (!isEmpty(person)) {
  //     if (person.species.length !== 0) {
  //       let arr = getContentFromUrl(person.species);
  //       if (flag) {
  //         // setSpeciesData(arr);
  //       }
  //     }
  //   }
  // }
componentDidMount() {
  console.log("__________mounted");
  if (!isEmpty(this.props.person && this.state.apiFilmFlag)) {
    var arrFilms = [];
    for (let i = 0; i < this.props.personData.films.length; i++) {
      Xhr(this.props.personData.films[i])
      .then(res => {
        arrFilms.push(res);

        if (arrFilms.length === this.props.personData.films.length) {
          this.setState((prevState) => ({
            filmsData: [...prevState.filmsData, ...arrFilms],
            apiFilmFlag: true
          }));  
        }
      })
      .catch(err => console.log(err))
      // this.setState({filmsData: arr});
    }
    var arrSpecies = [];
    for (let i = 0; i < this.props.personData.species.length; i++) {
      Xhr(this.props.personData.species[i])
      .then(res => {
        arrSpecies.push(res);

        if (arrSpecies.length === this.props.personData.species.length) {
          this.setState((prevState) => ({
            speciesData: [...prevState.speciesData, ...arrSpecies],
            apiSpeciesFlag: true
          }));
        }
      })
      .catch(err => console.log(err))
      // this.setState({filmsData: arr});
    }
  }
}
*/