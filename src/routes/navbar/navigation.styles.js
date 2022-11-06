import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavigationContainer = styled.div`
	height: 70px;
	
	display: flex;
	justify-content: space-between;
	margin-bottom: 25px;
`;

export const LogoContainer = styled(Link)`

	height: 100%;
	width: 50px;
	
	margin: 10px 10px;
`;

export const NavLinksContainer = styled.div`
	
	height: 100%;
	display: flex;
	
	justify-content: flex-end;
	margin: 10px 10px;
`;
export const NavLink = styled(Link)`
	padding:0px 5px;
	cursor: pointer;
	text-decoration: none;
`;
