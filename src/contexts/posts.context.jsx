import { createContext, useContext, useEffect, useReducer } from "react";
import { UserContext } from "./user.context";
import {v4} from "uuid";
import { createAction } from "../utils/reducer/reducer.utils.js";
import { addCollectionAndDocuments, addItemAndCollection, getPostsFromFirebase, uploadImageToStorage } from "../utils/firebase.utils";
export const PostsContext = createContext({
	createNewPost: () => null,
	posts: [],
	postsCount: 0,
});
const POSTS_ACTION_TYPES = {
	SET_POSTS: "SET_POSTS",
	ADD_POST:"ADD_POST",
	CHANGE_POST:"CHANGE_POST",
};

const postsReducer = (state, action) => {
	const {type,payload}=action;
	switch (type) {
		case POSTS_ACTION_TYPES.SET_POSTS:
			
			addCollectionAndDocuments("posts",payload);
			return { ...state, posts: payload };

		case POSTS_ACTION_TYPES.ADD_POST:
			addItemAndCollection("posts",payload);
			
			return {...state,posts:[...state.posts,payload]};

		case POSTS_ACTION_TYPES.CHANGE_POST:
			
			addItemAndCollection("posts",payload);
			
			return {...state,posts:state.posts.map((post)=>post.id==payload.id ? payload : post)};
			break;
		default:
			throw new Error(`Unhandled type ${type} in postsReducer`);
	}
};

const INITIAL_STATE = {
	posts: [],
	postsCount: 0,
};
export const PostsProvider = ({ children }) => {
	useEffect(()=>{
		const getFirebaseDatabase= async ()=>{
			const firebasePosts=await getPostsFromFirebase();
			console.log(firebasePosts);
			updatePostReducer(firebasePosts);
			
		}
		getFirebaseDatabase();
		
		

	},[]);
	const [{ posts, postsCount }, dispatch] = useReducer(
		postsReducer,
		INITIAL_STATE
	);
	const { currentUser } = useContext(UserContext);
	
	const changePost=(post)=>{
		dispatch(createAction(POSTS_ACTION_TYPES.CHANGE_POST,post));
	}
	const addLikeToPost=(user,likedPost)=>{
		const {uid}=user;
		const foundPost=posts.find((item)=>item.id==likedPost.id);
		if(!foundPost.likedBy.includes(uid)){

		
		const newPost={...foundPost,likedBy:[...foundPost.likedBy,uid],likes:foundPost.likes+1}
		changePost(newPost);
		}
	}
	const addNewPostToReducer =(newPost)=>{
		dispatch(createAction(POSTS_ACTION_TYPES.ADD_POST, newPost));
	}
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
			likedBy:[],
		};
		addNewPostToReducer(newPost);
	};
	const value = { createNewPost, posts, postsCount, addLikeToPost};
	return (
		<PostsContext.Provider value={value}>{children}</PostsContext.Provider>
	);
};
