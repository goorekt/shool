import React, { Fragment } from "react";

import {
	LogoContainer,
	NavigationContainer,
	NavLinksContainer,
    NavLink
} from "./navigation.styles";
import { ReactComponent as SchoolLogo } from "../../assets/shool-logo.svg";
import { Outlet } from "react-router";
const Navbar = () => {
	return (
		<Fragment>
			<NavigationContainer>
				<LogoContainer to="/">
					<SchoolLogo />
				</LogoContainer>
				<NavLinksContainer>
					<NavLink to="/sign-in">Sign in</NavLink>
				</NavLinksContainer>
			</NavigationContainer>
			<Outlet />
		</Fragment>
	);
};

export default Navbar;
