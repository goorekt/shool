import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PostsContext } from "../../contexts/posts.context";
import { UserContext } from "../../contexts/user.context";
import FormInput from "../form-input/form-input.component";
import {
	NewPostFormContainer,
	NewPostPageContainer,
} from "./new-post-form.styles";

const NewPostForm = () => {
	const navigate = useNavigate();
	const { currentUser } = useContext(UserContext);
	const defaultInputs = {
		title: "",
		text: "",
		image: null,
	};
	const { createNewPost } = useContext(PostsContext);
	const [inputs, setInputs] = useState(defaultInputs);

	const handleSubmitNewPost = (event) => {
		event.preventDefault();
		if (inputs.title.length<40 && inputs.text.length<300){
			if (inputs.image) {
				if (inputs.image.type.includes("image")) {
					createNewPost(inputs);
					navigate("/");
				} else {
					alert("You can only upload images, try again with another file format");
					setInputs({ ...inputs, image: null });
				}
			} else {
	
				
				createNewPost(inputs);
				navigate("/");
			}

		}
		else{alert("title or text is too long");}
	};

	const handleChange = (e) => {
		const { value, name } = e.target;

		setInputs({ ...inputs, [name]: value });
	};
	const handleFileChange = (e) => {
		setInputs({ ...inputs, image: e.target.files[0] });
	};

	return (
		<NewPostPageContainer>
			<h1>Create new post!</h1>
			<NewPostFormContainer>
				<form onSubmit={handleSubmitNewPost}>
					<FormInput
						label="Title"
						type="text"
						onChange={handleChange}
						name="title"
						value={inputs.title}
						
					/>
					<FormInput
						label="Text"
						type="text"
						additionalTypes="text-area"
						onChange={handleChange}
						name="text"
						value={inputs.text}
					/>
					<input type="file" name="image" onChange={handleFileChange} />
					<button type="submit">create new post</button>
				</form>
			</NewPostFormContainer>
		</NewPostPageContainer>
	);
};

export default NewPostForm;
