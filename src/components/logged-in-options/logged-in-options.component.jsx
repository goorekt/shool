import React, { useContext } from "react";
import { NavLink, OptionsContainer,LikeLogo, ClockLogo, HotLogo } from "./logged-in-options.styles";
import { PostsContext, SORT_POST_STATES } from "../../contexts/posts.context";

const LoggedInOptions = () => {
	const {setSortPostState,sortPostState}=useContext(PostsContext);
	const handleSortLike=(e)=>{
		sortPostState==SORT_POST_STATES.MOST_LIKED ? setSortPostState(SORT_POST_STATES.LEAST_LIKED_POSTS):setSortPostState(SORT_POST_STATES.MOST_LIKED);
	}
	const handleSortTime=(e)=>{

		sortPostState==SORT_POST_STATES.NEWEST_POSTS ? setSortPostState(SORT_POST_STATES.OLDEST_POSTS):setSortPostState(SORT_POST_STATES.NEWEST_POSTS);
	}
	const handleSortHot=(e)=>{
		setSortPostState(SORT_POST_STATES.HOT_POSTS);
	}
	return (
		<OptionsContainer>
		
		<LikeLogo onClick={handleSortLike}></LikeLogo>
		<ClockLogo onClick={handleSortTime}></ClockLogo>
		<HotLogo onClick={handleSortHot}></HotLogo>
		</OptionsContainer>
	);
};

export default LoggedInOptions;
