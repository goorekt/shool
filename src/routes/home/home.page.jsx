import React, { useState } from "react";
import FormInput from "../../components/form-input/form-input.component";
import PostsContainer from "../../components/posts-container/posts-container.component";

const HomePage = () => {
	const [inputs, setInputs] = useState({
		title: "",
    text:"",
	});

	const handleSubmitNewPost = () => {};
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
				</form>
			</div>
		</div>
	);
};

export default HomePage;
