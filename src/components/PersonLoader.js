import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

function PersonLoader(props){
  const [loaderState, setLoaderState] = useState(props.loaderState);

  useEffect(() => {
    setLoaderState(props.loaderState);
  }, [props.loaderState]);

  return (
    <div className={`person__loader ${loaderState ? `fadIn` : `fadOut`}`}>
      <div className="person-loader__inner">
        <p>Loading Content...</p>
      </div>
    </div>
  );
}

export default connect(state=>({loaderState: state.loaderState.getPersonState}))(PersonLoader);