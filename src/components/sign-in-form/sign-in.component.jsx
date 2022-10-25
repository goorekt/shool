import React from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/user.context.jsx";
import "../../utils/firebase.utils.js";
import { signInWithGooglePopup } from "../../utils/firebase.utils.js";
const SignInForm = () => {

    const navigate=useNavigate();
	const signInWithGoogle = async () => {
		const {user}= await signInWithGooglePopup();
		console.log(user.accessToken);
		if (user.accessToken){
			navigate("/");
		}
		
        
	};
	return (
		<div>
			<h1>SignIn component</h1>
			<button onClick={signInWithGoogle}>button signin</button>
		</div>
	);
};

export default SignInForm;
