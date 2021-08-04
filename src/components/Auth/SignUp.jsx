import React from 'react'
import { handleEmailChange } from '../../shared/utilities/Utils'
import { AmplifySignUp } from '@aws-amplify/ui-react'

const SignUp = () => {
    return (
        <AmplifySignUp
            slot="sign-up"
            usernameAlias="email"
            headerText="Create your account and choose your benefits"
            formFields={[
                {
                    type: "email",
                    label: "Endava email",
                    placeholder: "username@endava.com",
                    hint: 'Make sure you are using your Endava email, otherwise you won\'t be able to manage your benefits.',
                    inputProps: { required: true, autocomplete: 'off' },
                    handleInputChange: (event, state) => handleEmailChange(event, state)
                },
                {
                    type: "password",
                    label: "Password",
                    placeholder: "New password",
                    inputProps: { required: true, autocomplete: "new-password" },
                }
            ]}
        />
    )
}

export default SignUp
