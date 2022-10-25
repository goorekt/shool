import styled from 'styled-components';
const mainColor = "black";
const subColor = "grey";

export const TextArea = styled.textarea`
  background: none;
	background-color: white;
	color: ${subColor};
	font-size: 18px;
	padding: 10px 10px 10px 5px;
	display: block;
	width: 100%;
	border: none;
	border-radius: 0;
	border-bottom: 1px solid ${subColor};
	margin: 25px 0;

	&:focus {
		outline: none;
	}
`;