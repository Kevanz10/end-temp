import React from 'react'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import FlexibleBenefits from './shared/containers/FlexibleBenefits';
import FlexibleBenefitsAuth from './shared/containers/FlexibleBenefitsAuth';
import Amplify, { Auth, API } from 'aws-amplify';

Amplify.configure({
	"aws_project_region": "us-east-1",
	"aws_cognito_identity_pool_id": "us-east-1:e5928498-fcfd-44d5-98bc-e1442f9728d0",
	"aws_cognito_region": "us-east-1",
	"aws_user_pools_id": "us-east-1_sPhpDpr5x",
	"aws_user_pools_web_client_id": "7t1vkjqhvsbp5h6f079prndgp9",
	"oauth": {},
	API: {
		endpoints: [
			{
				name: "FBApi",
				endpoint: "https://0n3nnyqhaa.execute-api.us-east-1.amazonaws.com/dev",
			}
		]
	}
});
//dev
Auth.configure({
   "aws_project_region": "us-east-1",
   "aws_cognito_identity_pool_id": "us-east-1:08f8801e-848d-4a75-880b-c0849340f27e",
   "aws_cognito_region": "us-east-1",
   "aws_user_pools_id": "us-east-1_LPAI5BvUn",
   "aws_user_pools_web_client_id": "3k8p2f1l8a7pmh89np4b565etb",
   "oauth": {}
});

const App = () => {
	const [authState, setAuthState] = React.useState();
	const [user, setUser] = React.useState();
		
	React.useEffect(() => {

		return onAuthUIStateChange((nextAuthState, authData) => {
			setAuthState(nextAuthState);
			setUser(authData)
		});
	}, []);
	
	return (
		<FlexibleBenefits/>
	)
}

export default App
