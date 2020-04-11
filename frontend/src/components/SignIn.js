import React from 'react'
import awsConfig from '../config'
import { Amplify } from 'aws-amplify'

/******/
//1. set up amplify with pre-existing AWS services
const amplifyConfigurations = {
  Auth: {
    mandatorySignIn: true,
    region: awsConfig.cognito.REGION,
    userPoolId: awsConfig.cognito.USER_POOL_ID,
    identityPoolId: awsConfig.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: awsConfig.cognito.APP_CLIENT_ID,
  },
  Storage : {
    region: awsConfig.s3.REGION,
    bucket: awsConfig.s3.BUCKET,
    identityPoolId: awsConfig.cognito.IDENTITY_POOL_ID
  }
};
Amplify.configure(amplifyConfigurations);
/******/


export default () => {
	return (
    <form className="ui form">
      <h1>{awsConfig.s3.REGION}</h1>
      <div className="field">
        <h1>DUMMY FORM, FOR NOW</h1>
        <label>First Name</label>
        <input type="text" name="first-name" placeholder="UserName"/>
      </div>
      <div className="field">
      <label>Last Name</label>
        <input type="text" name="last-name" placeholder="Password"/>
      </div>
      <div className="field">
        <div className="ui checkbox">
            <input type="checkbox" tabindex="0" className="hidden"/>
            <label>I agree to the Terms and Conditions</label>
        </div>
      </div>
      <button className="ui button" type="submit">Submit</button>
  </form>

  )
}


/**
 * 
 * steps to follow:
 *    npm i aws-amplify
 *   create a config similar to:
 * 
 * s3: {
    REGION: "YOUR_S3_UPLOADS_BUCKET_REGION",
    BUCKET: "YOUR_S3_UPLOADS_BUCKET_NAME"
  },
  cognito: {
    REGION: "YOUR_COGNITO_REGION",
    USER_POOL_ID: "YOUR_COGNITO_USER_POOL_ID",
    APP_CLIENT_ID: "YOUR_COGNITO_APP_CLIENT_ID",
    IDENTITY_POOL_ID: "YOUR_IDENTITY_POOL_ID"
  }
};
 *
 * 
 */
