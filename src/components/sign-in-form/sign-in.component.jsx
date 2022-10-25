import React from "react";
import { UserContext } from "../../contexts/user.context.jsx";
import "../../utils/firebase.utils.js";
import { signInWithGooglePopup } from "../../utils/firebase.utils.js";
const SignIn = () => {

    
	const signInWithGoogle = async () => {
		const {user}= signInWithGooglePopup();
        
	};
	return (
		<div>
			<h1>SignIn component</h1>
			<button onClick={signInWithGoogle}>button signin</button>
		</div>
	);
};

export default SignIn;
