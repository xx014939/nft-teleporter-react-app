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
  // Post NFT Image
}

async function stepFour() {
  document.querySelector('.third-view').style.display = 'none'
  document.querySelector('.fourth-view').style.display = 'block'
  setSubtitle('Digital Assets')
  // Post NFT Image
}

function stepFive() {
  document.querySelector('.fourth-view').style.display = 'none'
  document.querySelector('.fifth-view').style.display = 'block'
  setSubtitle('')
}

function deployContract() {
  console.log('deploying!')
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
          <div className="input-box-container">
            <label>
                NFT/Collection Name
                  <input type="text" />
              </label>
              <label>
                NFT/Collection Image
                  <input type="file" />
              </label>
          </div>
          <div><button onClick={stepFour} className="app-container__button">Continue</button></div>
        </div>
        <div className="app-container__main-body fourth-view">
          <div className="input-box-container">
            <label>
               3D Digital Object
              <input type="file" />
            </label>
            <label>
               2D Digital Object
              <input type="file" />
            </label>
            <label>
               MP4 Video File
              <input type="file" />
            </label>
            <label>
               Sound File
              <input type="file" />
            </label>
          </div>
          <div><button onClick={stepFive} className="app-container__button">Continue</button></div>
        </div>
        <div className="app-container__main-body fifth-view">
            <div><button onClick={deployContract} className="app-container__button">Deploy NFT Smart Contract</button></div>
        </div>
    </div>
    </>
  );
}

export default PageOne;