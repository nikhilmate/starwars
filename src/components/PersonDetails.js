import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { isEmpty } from '../utils';


import PersonTable from "./PersonTable";
import PersonLoader from "./PersonLoader";

// class PersonDetails extends React.Component {
function PersonDetails(props) {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         loaderState: false,
    //         personData: {}
    //     };
    // }
    const [loaderState, setLoader] = useState(props.loaderState);
    const [personData, setPerson] = useState(props.personData);
    const [personError, setError] = useState(props.personError);

    useEffect(() => {
        setLoader(props.loaderState);
        setPerson(props.personData);
        setError(props.personError);
    }, [props.loaderState, props.personData, props.personError]);

    if (personError &&  personError.status) {
        return (
            <div className="default-person__wrap">
                <div className="leftWrap">Could Not Find :(</div>
            </div>
        );
    } else if (!isEmpty(personData)) {
        return (
            <React.Fragment>
                {loaderState ? <PersonLoader /> : <PersonTable personData={personData}/>}
            </React.Fragment>
        );
    } else if (!loaderState) {
        return (
            <div className="default-person__wrap">
                <div className="leftWrap">No Person Yet..</div>
            </div>
        );
    } else {
        return (
            <React.Fragment>
                <PersonLoader />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        loaderState: state.loaderState.getPersonState,
        personData: state.personData,
        personError: state.error.getPersonState
    };
};

export default connect(mapStateToProps, null)(PersonDetails);
