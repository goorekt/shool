import React, { Fragment } from "react";
import Post from "../posts/posts.component";
import { PostsContainerStyles } from "./posts-container.styles";
const PostsContainer = () => {
	const posts = [
		{ title: "my day", bodyText: "Good day", author: "Ali A", id: 1 ,postTime:"today"},
		{ title: "post 2", bodyText: "This is post 2", author: "Ali A", id: 2 ,postTime:"today"},
	];
	return (
		<PostsContainerStyles>
			{posts.map((post) => (
				<Post key={post.id} post={post} />
			))}
		</PostsContainerStyles>
	);
};

export default PostsContainer;
