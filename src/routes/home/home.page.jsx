import React, { useContext, useState } from "react";
import FormInput from "../../components/form-input/form-input.component";
import PostsContainer from "../../components/posts-container/posts-container.component";
import {PostsContext} from "../../contexts/posts.context";
const HomePage = () => {
  const defaultInputs={
		title: "",
    text:"",
	};
  const {createNewPost}=useContext(PostsContext);
	const [inputs, setInputs] = useState(defaultInputs);

	const handleSubmitNewPost = (event) => {
    event.preventDefault();
    setInputs(defaultInputs);
    createNewPost(inputs);
  };
	const handleChange = (e) => {
    const {value,name}=e.target;
    
    setInputs({...inputs,[name]:value});
  };
	return (
		<div>
			<PostsContainer />
			<div className="new-post-form">
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
		</div>
	);
};

export default HomePage;
