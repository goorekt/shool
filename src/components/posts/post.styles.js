import styled from 'styled-components';

export const PostContainer = styled.div`
  
  display: grid;
  flex-direction: column;
  background: #fff;
  border-radius: 0.5em;
  padding: 1em;
  margin: 1em;
`;

export const ImageContainer = styled.div`
  width: 5em;
  height: 5em;
  object-fit: cover;
  border-radius: 50%;
`;
export const TitleContainer = styled.div`
  font-weight: 700;
`;
export const CardHeader=styled.div`
display: flex;
flex-direction: column;
  margin-top: 0.5em;
  margin-left: 1em;
  font-size: 1em;
`
export const BodyText = styled.div`
  font-size: 1.5em;
  margin-top: 0.5em;
  padding-bottom: 1em;
`;
export const AuthorName = styled.div`
color: #999;
  font-size: 0.85em;
  color: #aaa;
`;
export const TimeStamp=styled.div`
    color: #aaa;
  margin-top: 0.25em;
  font-size: 0.8em;
`