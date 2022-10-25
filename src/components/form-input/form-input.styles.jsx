import styled, { css } from "styled-components";
const mainColor = "black";
const subColor = "grey";

const shrinkLabelStyles = css`
	top: -14px;
	font-size: 12px;
	color: ${mainColor};
`;
const textAreaStyles=css`
	height:50%;
	border: 1px solid ${subColor};
`
const normalStyles=css`
	border: none;
	border-radius: 0;
`
export const FormInputLabel = styled.label`
	color: ${subColor};
	font-size: 16px;
	font-weight: normal;
	position: absolute;
	pointer-events: none;
	left: 5px;
	top: 10px;
	height:100px;
	transition: 300ms ease all;
	${({ shrink }) => shrink && shrinkLabelStyles};
`;
export const Input = styled.input`
	background: none;
	background-color: white;
	color: ${subColor};
	font-size: 18px;
	padding: 10px 10px 10px 5px;
	display: block;
	width: 100%;
	${({additionalTypes})=>additionalTypes=="text-area" ? textAreaStyles : normalStyles};
	
	border-bottom: 1px solid ${subColor};
	margin: 25px 0;

	&:focus {
		outline: none;
	}

	&:focus ~ ${FormInputLabel} {
		${shrinkLabelStyles}
	}
`;
export const Group = styled.div`
	position: relative;
	margin: 45px 0;
	input[type="password"] {
		letter-spacing: 0.3em;
	}
`;
