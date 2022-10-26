import React, { useContext } from "react";
import {
	AuthorName,
	BodyText,
	CardHeader,
	PostContainer,
	TimeStamp,
	TitleContainer,
	LikesContainer,
} from "./post.styles";
import {UserContext} from "../../contexts/user.context";
import { PostsContext } from "../../contexts/posts.context";
const Post = ({ post }) => {
	const { title, author, text, createdAt,likes,id } = post;
	const {currentUser}=useContext(UserContext);
	const {addLikeToPost}=useContext(PostsContext);
  const today=new Date().getTime();
  
  const daysDifference=Math.ceil((today-createdAt) / (1000 * 3600 * 24))-1;
  
  const likeHandler=()=>{
	addLikeToPost(currentUser,post);
	console.log("liked");
	console.log(currentUser.uid);
  }
  
	return (
		<PostContainer>
			<CardHeader>
			
				<TitleContainer>{title}</TitleContainer>
				<AuthorName>{`Written by ${author}`}</AuthorName>
				<TimeStamp>{daysDifference==0 ? "today" : `${daysDifference} ${daysDifference>1 ? "days" : "day"} ago`}</TimeStamp>
			</CardHeader>
			<BodyText>{text}</BodyText>
			<LikesContainer>{`${likes} likes`}</LikesContainer>
			<button onClick={likeHandler}>Like </button>
		</PostContainer>
	);
};

export default Post;
