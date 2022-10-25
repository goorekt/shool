import React from 'react'
import { AuthorName, BodyText, CardHeader, PostContainer, TimeStamp, TitleContainer } from './post.styles';

const Post = ({post}) => {
    const {title,author,bodyText,postTime}=post;
  return (
    <PostContainer>
    <CardHeader>
    
        <TitleContainer>{title}</TitleContainer>
        <AuthorName>{`Written by ${author}`}</AuthorName>
        <TimeStamp>{postTime}</TimeStamp>
        </CardHeader>
        <BodyText>{bodyText}</BodyText>
        
    </PostContainer>
  )
}

export default Post