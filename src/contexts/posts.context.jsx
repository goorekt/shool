import { createContext, useContext, useReducer } from "react";
import { UserContext } from "./user.context";
import { createAction } from "../utils/reducer/reducer.utils.js";
export const PostsContext = createContext({
	createNewPost: () => null,
	posts: [
		{ title: "my day", bodyText: "Good day", author: "Ali A", id: 1 ,postTime:"today"},
		{ title: "post 2", bodyText: "This is post 2", author: "Ali A", id: 2 ,postTime:"today"},
	],
	postsCount: 0,
});
const POSTS_ACTION_TYPES = {
	SET_POSTS: "SET_POSTS",
};

const postsReducer = (state, { type, payload }) => {
	switch (type) {
		case POSTS_ACTION_TYPES.SET_POSTS:
			console.log("new post creation attempt");
			return { ...state, posts: payload };

		default:
			throw new Error(`Unhandled type ${type} in postsReducer`);
	}
};

const INITIAL_STATE = {
	posts: [
		{ title: "my day", bodyText: "Good day", author: "Ali A", id: 1 ,postTime:"today"},
		{ title: "post 2", bodyText: "This is post 2", author: "Ali A", id: 2 ,postTime:"today"},
	],
	postsCount: 0,
};
export const PostsProvider = ({ children }) => {
	const [{ posts, postsCount }, dispatch] = useReducer(
		postsReducer,
		INITIAL_STATE
	);
	const { currentUser } = useContext(UserContext);
	const addNewPost = (newPost) => {
		const newPostsArray = [...posts, newPost];
		updatePostReducer(newPostsArray);
	};
	const updatePostReducer = (newPosts) => {
		dispatch(createAction(POSTS_ACTION_TYPES.SET_POSTS, newPosts));
	};
	const createNewPost = (newPostInfo) => {
		const { title, text } = newPostInfo;
		console.log(currentUser);
		const newPost = {
			title: title,
			text: text,
			author: currentUser.displayName,
			createdAt: "today",
			likes: 0,
			id:posts.length+1,
		};
		addNewPost(newPost);
	};
	const value = { createNewPost, posts, postsCount };
	return (
		<PostsContext.Provider value={value}>{children}</PostsContext.Provider>
	);
};
