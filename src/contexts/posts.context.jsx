import { createContext, useContext, useEffect, useReducer } from "react";
import { UserContext } from "./user.context";
import {v4} from "uuid";
import { createAction } from "../utils/reducer/reducer.utils.js";
import { addCollectionAndDocuments, getPostsFromFirebase, uploadImageToStorage } from "../utils/firebase.utils";
export const PostsContext = createContext({
	createNewPost: () => null,
	posts: [
		
		
	],
	postsCount: 0,
});
const POSTS_ACTION_TYPES = {
	SET_POSTS: "SET_POSTS",
};

const postsReducer = (state, action) => {
	const {type,payload}=action;
	switch (type) {
		case POSTS_ACTION_TYPES.SET_POSTS:
			addCollectionAndDocuments("posts",payload);
			return { ...state, posts: payload };

		default:
			throw new Error(`Unhandled type ${type} in postsReducer`);
	}
};

const INITIAL_STATE = {
	posts: [
		
		
	],
	postsCount: 0,
};
export const PostsProvider = ({ children }) => {
	useEffect(()=>{
		const getFirebaseDatabase= async ()=>{
			const firebasePosts=await getPostsFromFirebase();
			updatePostReducer(firebasePosts);
			
		}
		getFirebaseDatabase();
		
		

	},[]);
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
		const { title, text, image} = newPostInfo;
		const filePath=v4();
		
		uploadImageToStorage(image,filePath);

		const newPost = {
			title: title,
			text: text,
			author: currentUser.displayName,
			createdAt: new Date().getTime(),
			likes: 0,
			id:Math.floor(Math.random()*10000000),
			filePath:filePath,
		};
		addNewPost(newPost);
	};
	const value = { createNewPost, posts, postsCount };
	return (
		<PostsContext.Provider value={value}>{children}</PostsContext.Provider>
	);
};
