import styled, { css } from "styled-components";

const dislike = css`
	background-color: #8aff7dba;
`;
const like = css`
	background-color: #ff6e6eba;
`;

export const PostContainer = styled.div`
	background: #fff;
	border-radius: 0.5em;
	padding: 1em;
	margin: 1em;
	width:400px;
 
`;

export const LikesContainer = styled.div`
	width: 100%;
	color: #9a0000;
	font-size: 0.85em;
	display: inline-flex;
	justify-content: space-between;
	margin-top: 1em;
  
`;
export const Photo = styled.img`
	width: 100%;
`;
export const LikeButton = styled.div`
	cursor: pointer;
  
	padding: 5px;
	width: 3em;
	border-radius: 4px;
	text-align: center;
	${({ liked }) => (liked ? dislike : like)};
`;
export const ImageContainer = styled.div`
	width: 5em;

	object-fit: cover;
	border-radius: 50%;
`;
export const TitleContainer = styled.div`
	font-weight: 700;
	cursor:pointer;
`;
export const CardHeader = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 0.5em;
	margin-left: 1em;
	font-size: 1em;
`;
export const BodyText = styled.div`
	font-size: 1.5em;
	margin-top: 0.5em;
	
  word-wrap: break-word;
`;
export const AuthorName = styled.div`
	color: #999;
	font-size: 0.85em;
	color: #aaa;
`;
export const TimeStamp = styled.div`
	color: #aaa;
	margin-top: 0.25em;
	font-size: 0.8em;
`;
