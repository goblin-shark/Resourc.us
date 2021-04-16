import React from 'react'
import panda from '../assets/styles/images/panda.png'

const NoResourcesFound = ({ type }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h2>{`Sorry, no search results for '${type}' found.`}</h2>
      <h2>{`Try searching again.`}</h2>
      <br></br>
      <img style={{ height: '40vh', width: 'auto' }} src={panda} alt="sorry-panda"></img>
    </div>
  )
}

export default NoResourcesFound
