import React, { Fragment, useContext } from "react";
import { PostsContext } from "../../contexts/posts.context";
import Post from "../post/post.component";
import { PostsContainerStyles } from "./posts-container.styles";
const PostsContainer = () => {
	const {posts}=useContext(PostsContext);
	return (
		<PostsContainerStyles>
			{posts.map((post) => (
				<Post key={post.id} post={post} />
			))}
		</PostsContainerStyles>
	);
};

export default PostsContainer;
