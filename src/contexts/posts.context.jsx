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
			
			return { ...state, posts: payload };

		case POSTS_ACTION_TYPES.ADD_POST:
			return {...state,posts:[...state.posts,payload]};

		case POSTS_ACTION_TYPES.CHANGE_POST:
		
			return {...state,posts:state.posts.map((post)=>post.id===payload.id ? payload : post)};
			
		default:
			throw new Error(`Unhandled type ${type} in postsReducer`);
	}
};

const INITIAL_STATE = {
	posts: [],
	postsCount: 0,
};
export const PostsProvider = ({ children }) => {
	//Get from firebase
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

	//Database functions
	
	//hm
	const updatePostReducer = (newPosts) => {
		dispatch(createAction(POSTS_ACTION_TYPES.SET_POSTS, newPosts));
		
	};
	//add new post
	const addPostToDataBase =(newPost)=>{
		dispatch(createAction(POSTS_ACTION_TYPES.ADD_POST, newPost));
		addItemAndCollection("posts",newPost);
	}
	//change existing post
	const changePostInDataBase=(post)=>{
		dispatch(createAction(POSTS_ACTION_TYPES.CHANGE_POST,post));
		addItemAndCollection("posts",post);
	}

	
	const removeLikeFromPost=(user,dislikedPost)=>{
		const {uid}=user;
		const foundPost=posts.find((item)=>item.id==dislikedPost.id);
		if(foundPost.likedBy.includes(uid)){
		
		const index=foundPost.likedBy.indexOf(uid);
		foundPost.likedBy.splice(index,1);
		const newPost={...foundPost,likes:foundPost.likes-1}
		changePostInDataBase(newPost);

	
		}
	}

	//adds like to the post and calls database function
	const addLikeToPost=(user,likedPost)=>{
		const {uid}=user;
		const foundPost=posts.find((item)=>item.id==likedPost.id);
		if(!foundPost.likedBy.includes(uid)){
		const newPost={...foundPost,likedBy:[...foundPost.likedBy,uid],likes:foundPost.likes+1}
		changePostInDataBase(newPost);

		}
	}

	
	//generate post
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
		addPostToDataBase(newPost);
	};
	const value = { createNewPost, posts, postsCount, addLikeToPost,removeLikeFromPost};
	return (
		<PostsContext.Provider value={value}>{children}</PostsContext.Provider>
	);
};
