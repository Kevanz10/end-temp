import React from 'react'
import { AmplifyForgotPassword } from '@aws-amplify/ui-react'

const ForgotPassword = () => {
    return (
        <AmplifyForgotPassword
            headerText="Reset your benefits account"
            slot="forgot-password"
            usernameAlias="email"
        />
    )
}

export default ForgotPassword
