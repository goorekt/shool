import React from 'react'
import { AuthorName, BodyText, CommentContainer, TimeStamp } from './comment.styles'

const Comment = ({comment}) => {
    const {author, createdAt,text}=comment;
	const today = new Date().getTime();
    const minuteDifference =
    Math.ceil((today - createdAt) / (1000 * 60)) - 1;

  return (
    <CommentContainer>
    <AuthorName>{author}</AuthorName>
    <TimeStamp>{`Commented ${minuteDifference} minutes ago`}</TimeStamp>
    <BodyText>{text}</BodyText>

    </CommentContainer>
  )
}

export default Comment