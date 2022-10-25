import React, { useContext, useState } from "react";
import FormInput from "../../components/form-input/form-input.component";
import PostsContainer from "../../components/posts-container/posts-container.component";
import { PostsContext } from "../../contexts/posts.context";
import { UserContext } from "../../contexts/user.context";
const HomePage = () => {
	const { currentUser } = useContext(UserContext);
	const defaultInputs = {
		title: "",
		text: "",
	};
	const { createNewPost } = useContext(PostsContext);
	const [inputs, setInputs] = useState(defaultInputs);

	const handleSubmitNewPost = (event) => {
		event.preventDefault();
		setInputs(defaultInputs);
		createNewPost(inputs);
	};
	const handleChange = (e) => {
		const { value, name } = e.target;

		setInputs({ ...inputs, [name]: value });
	};
	return (
		<div>
			<PostsContainer />
			{currentUser ? (
				<div>
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
						<button type="submit">create new post</button>
					</form>
				</div>
			) : (
				<h1>Log in to create a post</h1>
			)}
		</div>
	);
};

export default HomePage;
