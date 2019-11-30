import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { SET_PERSON } from '../Actions';

function InputField(props){
  const [ input, setInput ] = useState(props.personID);

  useEffect(() => {
    setInput(props.personID);
  }, [props.personID]);

  return (
    <React.Fragment>
      <input 
        className="main__input"
        type="text" 
        placeholder="Enter Number from 1 to 87" 
        onChange={e => props.SET_PERSON(e.target.value)} 
        value={input} 
      />
    </React.Fragment>
  );
}

export default connect(state=>({personID:state.personID}), dispatch=>({SET_PERSON: id => dispatch(SET_PERSON(id))}))(InputField);