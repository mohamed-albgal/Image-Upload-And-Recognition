import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Amplify } from 'aws-amplify'
import { BrowserRouter } from 'react-router-dom'
import {s3, cognito} from './config'
Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: cognito.REGION,
      userPoolId: cognito.USER_POOL_ID,
      identityPoolId: cognito.IDENTITY_POOL_ID,
      userPoolWebClientId: cognito.APP_CLIENT_ID
    },
    Storage: {
      region: s3.REGION,
      bucket: s3.BUCKET,
      identityPoolId: cognito.IDENTITY_POOL_ID
    },
  });

ReactDOM.render(<BrowserRouter> <App /> </BrowserRouter>, document.getElementById('root'));
