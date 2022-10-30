import React, { Fragment, useContext } from "react";
import { PostsContext, SORT_POST_STATES } from "../../contexts/posts.context";
import Post from "../post/post.component";
import { PostsContainerStyles } from "./posts-container.styles";

const PostsContainer = ({posts}) => {

	//compare for sorted posts
	
	//shows sorted by in header
	

	return (
		<Fragment>
		<PostsContainerStyles>
		
			{posts.map((post) => (
				<Post key={post.id} post={post} />
			))}
		</PostsContainerStyles>

		</Fragment>
	);
};

export default PostsContainer;
