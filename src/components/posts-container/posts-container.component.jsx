import React, { Fragment, useContext } from "react";
import { PostsContext, SORT_POST_STATES } from "../../contexts/posts.context";
import Post from "../post/post.component";
import { PostsContainerStyles } from "./posts-container.styles";

const PostsContainer = () => {
	const {posts,sortPostState}=useContext(PostsContext);

	//compare for sorted posts
	const compareSortPosts=(a,b)=>{
		switch (sortPostState) {
			case SORT_POST_STATES.NEWEST_POSTS:
				return(b.createdAt-a.createdAt);
				

			case SORT_POST_STATES.MOST_LIKED:
				return b.likes-a.likes;

			case SORT_POST_STATES.LEAST_LIKED_POSTS:
				return a.likes-b.likes;
			case SORT_POST_STATES.OLDEST_POSTS:
				return a.createdAt-b.createdAt;


			case SORT_POST_STATES.HOT_POSTS:
				const today = new Date().getTime();
				
				const timeGoneA=Math.ceil((today - a.createdAt) / (1000 * 3600)) - 1;
				const timeGoneB=Math.ceil((today - b.createdAt) / (1000 * 3600)) - 1;
				const scoreA=(48-timeGoneA)*(a.likes/3);
				const scoreB=(48-timeGoneB)*(b.likes/3);


				return scoreB-scoreA;
			default:
				return 0;
		}
	}

	//sort posts
	const sortedPosts=posts.sort(compareSortPosts);

	//shows sorted by in header
	const showSortedByInHeader=(state=sortPostState)=>(
		{
			[SORT_POST_STATES.MOST_LIKED]:"most likes",
			[SORT_POST_STATES.NEWEST_POSTS]:"latest",
			[SORT_POST_STATES.OLDEST_POSTS]:"oldest",
			[SORT_POST_STATES.HOT_POSTS]:"hot",
			[SORT_POST_STATES.LEAST_LIKED_POSTS]:"least likes",
		}[state]
	)

	return (
		<PostsContainerStyles>
		<h2>{`Sorted by: ${showSortedByInHeader(sortPostState)}`}</h2>
			{sortedPosts.map((post) => (
				<Post key={post.id} post={post} />
			))}
		</PostsContainerStyles>
	);
};

export default PostsContainer;
