import React, { useState } from 'react';
// import sections
import PageOne from '../components/app views/PageOne';

const AppPortal = () => {

  return (
    <>
    <div className="app-container">
        <div><h1>NFT Teleporter</h1></div>
        <div className="app-container__main-body">
            <PageOne/>
        </div>
    </div>
    </>
  );
}

export default AppPortal;