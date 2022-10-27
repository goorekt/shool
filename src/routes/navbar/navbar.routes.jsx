import React, { Fragment, useContext } from "react";
import {UserContext} from "../../contexts/user.context";
import {
	LogoContainer,
	NavigationContainer,
	NavLinksContainer,
    NavLink
} from "./navigation.styles";
import { ReactComponent as SchoolLogo } from "../../assets/shool-logo.svg";
import { Outlet } from "react-router";
import { addCollectionAndDocuments, signOutUser } from "../../utils/firebase.utils";
import { PostsContext } from "../../contexts/posts.context";
import LoggedInOptions from "../../components/logged-in-options/logged-in-options.component";
const Navbar = () => {
	const {currentUser}=useContext(UserContext);
	const {posts}=useContext(PostsContext);
	const signOutHandler=()=>{
		signOutUser();
	}

	return (
		<Fragment>
			<NavigationContainer>
				<LogoContainer to="/">
					<SchoolLogo />
				</LogoContainer>
				{currentUser && <LoggedInOptions/>
				}
				<NavLinksContainer>
					{currentUser && <NavLink to="/new-post">New post</NavLink>
				}
					{currentUser ? <span onClick={signOutHandler}>Sign out</span> : <NavLink to="/sign-in">Sign in</NavLink>}
				</NavLinksContainer>
			</NavigationContainer>
			<Outlet />
		</Fragment>
	);
};

export default Navbar;
