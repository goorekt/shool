import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../../components/post/post.component";
import { PostsContext } from "../../contexts/posts.context";
import Comment from "../../components/comment/comment.component";
import {
	CommentInput,
	PostPageContainer,
	PostCommentButton,
} from "./post-page.styles";

const PostPage = () => {
	const [commentInput, setCommentInput] = useState("");
	const { postId } = useParams();
	const { findPostById, createNewComment } = useContext(PostsContext);
	const post = findPostById(postId);

	const handleInputChange = (e) => {
		setCommentInput(e.target.value);
	};

	const handleNewCommentClick = () => {
		createNewComment(commentInput,post);
    setCommentInput("");
	};

	return (
    post ? (
		<PostPageContainer>
			<Post post={post}></Post>
			<CommentInput
				label="New comment"
				value={commentInput}
				onChange={(e) => {
					handleInputChange(e);
				}}
			/>
			{commentInput.length > 0 && (
				<PostCommentButton onClick={() => handleNewCommentClick()}>
					Post Comment
				</PostCommentButton>
			)}
      {post.comments.length>0 && post.comments.map((comment)=><Comment key={`${comment.author}:${comment.createdAt}`} comment={comment}></Comment>)}

		</PostPageContainer>):<h1>Post not found</h1>
	);
};

export default PostPage;
