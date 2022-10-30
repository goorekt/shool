import styled from "styled-components";
import { Link } from "react-router-dom";

import { ReactComponent as HotSortLogo } from "../../assets/hot-sort-post-symbol.svg";

import { ReactComponent as LikeSortLogo } from "../../assets/169881781558095014.svg";
import {ReactComponent as TimeSortLogo} from "../../assets/time-logo-sort.svg";

export const NavLink = styled(Link)`
	padding: 10px 15px;
	cursor: pointer;
	text-decoration: none;
`;
export const OptionsContainer = styled.div`
	display: flex;
	justify-content: space-between;
	
	width: 300px;
	margin-left:10%;
	margin-right:10%;
`;
export const ClockLogo = styled(TimeSortLogo)`
  width:30px;
  cursor:pointer;
`;
export const LikeLogo = styled(LikeSortLogo)`
	width:30px;
	cursor:pointer;
`;
export const HotLogo = styled(HotSortLogo)`
	width:30px;
	cursor:pointer;
`;

