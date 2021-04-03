import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

export const ResourceForm = () => {
  const { register, handleSubmit } = useForm()
  const history = useHistory()

  // 'data' is an object where the keys are the names of the form fields, 
  // and the values are the form input values
  const onSubmit = handleSubmit((data) => {
    alert(JSON.stringify(data))
    // redirect to Homepage after successful login
    history.push('/')
  })

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="resourceLink">Resource Link</label>
        <input type="resource" name="resource" id="resource" ref={register}></input>
      </div>

      {/* 
      Maybe use predetermined categories for resources. 
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <input type="category" name="category" id="category" ref={register}></input>
      </div> */}
    </form>
  )
}