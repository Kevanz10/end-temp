import React from 'react'
import { AmplifyConfirmSignUp } from '@aws-amplify/ui-react'

const ConfirmSignUp = () => {
    return (
        <AmplifyConfirmSignUp
            headerText="Confirm your befenits account"
            usernameAlias="email"
            slot="confirm-sign-up"
            formFields={[
                {
                    type: "email",
                    label: "Endava email",
                    placeholder: "username@endava.com",
                    disabled: true,
                    inputProps: { required: true, autocomplete: 'off', autocomplete: 'username' },
                    handleInputChange: (event, state) => state(event)
                },
                {
                    type: 'number',
                    label: "Confirmation code",
                    hint: 'Enter the confirmation code sent to your Endava email account',
                    placeholder: '123456',
                    inputProps: { required: true, autocomplete: 'off' }
                }
            ]}
        />
    )
}

export default ConfirmSignUp
