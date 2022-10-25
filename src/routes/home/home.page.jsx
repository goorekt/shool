import React, { useContext, useState } from "react";
import FormInput from "../../components/form-input/form-input.component";
import PostsContainer from "../../components/posts-container/posts-container.component";
import { PostsContext } from "../../contexts/posts.context";
import { UserContext } from "../../contexts/user.context";
const HomePage = () => {
	const { currentUser } = useContext(UserContext);
	
	return (
		<div>
			<PostsContainer />
		</div>
	);
};

export default HomePage;
