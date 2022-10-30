import React, { useContext, useState } from "react";
import { Fragment } from "react";
import FormInput from "../../components/form-input/form-input.component";
import PostsContainer from "../../components/posts-container/posts-container.component";
import { PostsContext, SORT_POST_STATES } from "../../contexts/posts.context";
import { UserContext } from "../../contexts/user.context";
import { HomePageStyles } from "./home.page.styles";
const HomePage = () => {
	const { currentUser} = useContext(UserContext);
	const {sortPostState, posts}=useContext(PostsContext);
	
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

	const showSortedByInHeader=(state=sortPostState)=>(
		{
			[SORT_POST_STATES.MOST_LIKED]:"most likes",
			[SORT_POST_STATES.NEWEST_POSTS]:"latest",
			[SORT_POST_STATES.OLDEST_POSTS]:"oldest",
			[SORT_POST_STATES.HOT_POSTS]:"hot",
			[SORT_POST_STATES.LEAST_LIKED_POSTS]:"least likes",
		}[state]
	)
	
	const third = Math.ceil(posts.length / 3);
	const firstArray=posts.slice(0,third);
	const secondArray=posts.slice(third,2*third);
	const thirdArray=posts.slice(2*third,3*third);
	const firstArraySorted=firstArray.sort(compareSortPosts);
	const secondArraySorted=secondArray.sort(compareSortPosts);
	const thirdArraySorted=thirdArray.sort(compareSortPosts);
	return (
		<Fragment>
		<h2>{`Sorted by: ${showSortedByInHeader(sortPostState)}`}</h2>

		<HomePageStyles>
			<PostsContainer posts={firstArraySorted}/>
			<PostsContainer posts={secondArraySorted}/>
			<PostsContainer posts={thirdArraySorted}/>
			
		</HomePageStyles>
		</Fragment>
	);
};

export default HomePage;
