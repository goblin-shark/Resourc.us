import React from "react"

function createResource() {
  return (
    <div className='container formContainer'>
      <h1>Create Resource Page</h1>
      <form>
        <div className='form-group'>
          <input name='title' autoComplete='off' className='form-control' placeholder='Title' ></input>
        </div>
        <div className='form-group'>
          <input name='url' autoComplete='off' className='form-control' placeholder='URL' ></input>
        </div>
        <div className='form-group'>
          <input name='description' autoComplete='off' className='form-control' placeholder='Description' ></input>
        </div>
        <div className='form-group'>
          <input name='tags' autoComplete='off' className='form-control' placeholder='Tags' ></input>
        </div>
        <button className='btn btn-lg btn-info'>Add to Team</button>
        <button className='btn btn-lg btn-info'>Create Resource</button>
      </form>
    </div>
  )
}

export default createResource;