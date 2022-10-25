import React from "react";
import {
	AuthorName,
	BodyText,
	CardHeader,
	PostContainer,
	TimeStamp,
	TitleContainer,
} from "./post.styles";

const Post = ({ post }) => {
	const { title, author, text, createdAt } = post;

	
  const today=new Date().getTime();
  
  const daysDifference=Math.ceil((today-createdAt) / (1000 * 3600 * 24))-1;
  
  
  
	return (
		<PostContainer>
			<CardHeader>
				<TitleContainer>{title}</TitleContainer>
				<AuthorName>{`Written by ${author}`}</AuthorName>
				<TimeStamp>{daysDifference==0 ? "today" : `${daysDifference} ${daysDifference>1 ? "days" : "day"} ago`}</TimeStamp>
			</CardHeader>
			<BodyText>{text}</BodyText>
		</PostContainer>
	);
};

export default Post;
