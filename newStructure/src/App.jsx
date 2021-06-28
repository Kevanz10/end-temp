import React from 'react'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import FlexibleBenefits from './shared/containers/FlexibleBenefits';
import FlexibleBenefitsAuth from './shared/containers/FlexibleBenefitsAuth';

import awsconfig from './aws-exports';
import Amplify, { Auth } from 'aws-amplify';

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

const App = () => {
    const [authState, setAuthState] = React.useState();
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

    return authState === AuthState.SignedIn && user ? (
        <FlexibleBenefits user={user} />
    ) : (
        <FlexibleBenefitsAuth />
    )
}

export default App
