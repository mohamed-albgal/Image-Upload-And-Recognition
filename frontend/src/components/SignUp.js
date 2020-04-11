import React from 'react'

export default () => {
	return(
		<form className="ui form">
  			<h1 className='ui dividing header'>DUMMY FORM, FOR NOW</h1>
  			<div className="field">
    			<label>Name</label>
    			<div className="two fields">
      				<div className="field">
        				<input type="text" name="shipping[first-name]" placeholder="First Name "/>
      				</div>
      				<div className="field">
        				<input type="text" name="shipping[last-name]" placeholder="Last Name"/>
      				</div>
    			</div>
  			</div>
  			<div className="ui button" tabIndex="0">Register</div>
  		</form>

	)
}