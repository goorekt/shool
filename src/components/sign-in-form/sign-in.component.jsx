import React from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/user.context.jsx";
import "../../utils/firebase.utils.js";
import { signInWithGooglePopup } from "../../utils/firebase.utils.js";
import "./sign-in.styles.scss";
const SignInForm = () => {
	const navigate = useNavigate();
	const signInWithGoogle = async () => {
		const { user } = await signInWithGooglePopup();
		console.log(user.accessToken);
		if (user.accessToken) {
			navigate("/");
		}
	};
	return (
		<div className="buttonn">
			
			<link
				rel="stylesheet"
				type="text/css"
				href="//fonts.googleapis.com/css?family=Open+Sans"
			/>

			<div onClick={signInWithGoogle} className="google-btn">
				<div class="google-icon-wrapper">
					<img
						className="google-icon"
						src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
						alt="googleIcon"
					/>
				</div>
				<p className="btn-text">
					<b>Sign in with google</b>
				</p>
			</div>
		</div>
	);
};

export default SignInForm;
