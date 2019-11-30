import React from 'react';

export default () => (
  <div className="header__wrapper">
    <div className="container">
      <div className="init__animator">
        <div className="header__border">
          <div className="border__inner">
            <div className="logo__wrap">
              <img
                src="images/logo.svg"
                className="xLogo img-xl"
                alt="Stars Wars API"
              />
            </div>
            <h1 className="logo__text">API</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
);