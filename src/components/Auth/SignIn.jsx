import React from 'react'
import { handleEmailChange } from '../../shared/utilities/Utils'
import { AmplifySignIn } from '@aws-amplify/ui-react'

const SignIn = () => {
    return (
        <AmplifySignIn slot="sign-in" usernameAlias="email"
                headerText="Manage your benefits"
                formFields={[
                    {
                        type: "email",
                        label: "Endava email",
                        placeholder: "username@endava.com",
                        inputProps: { required: true, autocomplete: 'off' },
                        handleInputChange: (event, state) => handleEmailChange(event, state)
                    },
                    {
                        type: "password",
                        label: "Password",
                        placeholder: "Password",
                        inputProps: { required: true, autocomplete: "new-password" },
                    }
                ]} />
    )
}

export default SignIn
