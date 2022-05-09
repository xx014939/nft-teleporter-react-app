import React, { useState } from 'react';

const PageOne = () => {

// Set State Variables
const [subtitle, setSubtitle] = useState('Choose')
const [collection, setCollection] = useState('false');
let experience = [];

function stepTwo() {
  document.querySelector('.first-view').style.display = 'none'
  document.querySelector('.second-view').style.display = 'block'
  setSubtitle('Types of Experiences')
}

function stepThree() {
  document.querySelector('.second-view').style.display = 'none'
  document.querySelector('.third-view').style.display = 'block'
  setSubtitle('NFT Data')
  console.log(experience)
}

  return (
    <>
    <div className="app-container">
        <div><h2>{subtitle}</h2></div>
        <div className="app-container__main-body first-view">
            <button onClick={stepTwo} className="app-container__button">Single NFT</button>
            <button onClick={() => {setCollection('true'); stepTwo()}} className="app-container__button">NFT Collection</button>
        </div>
        <div className="app-container__main-body second-view">
            <button onClick={() => {experience.push('VR')}} className="app-container__button">VR</button>
            <button onClick={() => {(experience.push('AR'))}} className="app-container__button">AR</button>
            <button onClick={() => {(experience.push('Video Content'))}} className="app-container__button">Video Content</button>
            <button onClick={() => {(experience.push('Browser Games'))}} className="app-container__button">Browser Games</button>
            <div><button onClick={stepThree} className="app-container__button">Continue</button></div>
        </div>
        <div className="app-container__main-body third-view">
            <input/>
        </div>
    </div>
    </>
  );
}

export default PageOne;