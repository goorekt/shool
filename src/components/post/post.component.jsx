import React, { useContext } from "react";
import {
	AuthorName,
	BodyText,
	CardHeader,
	PostContainer,
	TimeStamp,
	TitleContainer,
	LikesContainer,
	LikeButton,
	ImageContainer,
	Photo,
} from "./post.styles";
import { UserContext } from "../../contexts/user.context";
import { PostsContext } from "../../contexts/posts.context";
import { useNavigate } from "react-router";
const Post = ({ post }) => {
	const navigate = useNavigate();
	const { title, author, text, createdAt, likes, id, imageUrl } = post;
	const { currentUser } = useContext(UserContext);
	const { addLikeToPost, removeLikeFromPost } = useContext(PostsContext);
	const today = new Date().getTime();

	const daysDifference =
		Math.ceil((today - createdAt) / (1000 * 3600 * 24)) - 1;

	const likedBool = currentUser && !post.likedBy.includes(currentUser.uid);

	const likeAndDislikeButtonHandler = () => {
		likedBool
			? addLikeToPost(currentUser, post)
			: removeLikeFromPost(currentUser, post);
	};

	return (
		<PostContainer>
			<CardHeader>
				<TitleContainer>{title}</TitleContainer>
				<AuthorName>{`Written by ${author}`}</AuthorName>
				<TimeStamp>
					{daysDifference == 0
						? "today"
						: `${daysDifference} ${daysDifference > 1 ? "days" : "day"} ago`}
				</TimeStamp>
			</CardHeader>
			<BodyText>{text}</BodyText>
			<Photo src={imageUrl} />
			<LikesContainer>
				{`${likes} likes`}
				{currentUser ? (
					<LikeButton onClick={likeAndDislikeButtonHandler} liked={likedBool}>
						{likedBool ? "like" : "remove like"}
					</LikeButton>
				) : (
					<LikeButton liked={false} onClick={() => navigate("sign-in")}>
						Log in to like posts
					</LikeButton>
				)}
			</LikesContainer>
		</PostContainer>
	);
};

export default Post;
