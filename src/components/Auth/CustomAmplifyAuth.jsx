import React from 'react'
import { AmplifyAuthenticator } from '@aws-amplify/ui-react'
import '../../assets/css/customAmplifyAuth.css';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';

const CustomAmplifyAuth = () => {

    return (
        <AmplifyAuthenticator usernameAlias="email">
            <SignIn />
            <SignUp />
            <ForgotPassword />
        </AmplifyAuthenticator>
    )
}

export default CustomAmplifyAuth
