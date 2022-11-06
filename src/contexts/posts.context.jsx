import { createContext, useContext, useEffect, useReducer } from "react";
import { UserContext } from "./user.context";
import { v4 } from "uuid";
import { createAction } from "../utils/reducer/reducer.utils.js";
import {
	addCollectionAndDocuments,
	addItemAndCollection,
	dataChangeListener,
	db,
	getPostsFromFirebase,
	uploadImageToStorage,
} from "../utils/firebase.utils";
import { doc, onSnapshot } from "firebase/firestore";

export const SORT_POST_STATES = {
	MOST_LIKED: "MOST_LIKED",
	NEWEST_POSTS: "NEWEST_POSTS",
	OLDEST_POSTS: "OLDEST_POSTS",
	HOT_POSTS: "HOT_POSTS",
	LEAST_LIKED_POSTS: "LEAST_LIKED_POSTS",
};

export const PostsContext = createContext({
	createNewPost: () => null,
	posts: [],
	postsCount: 0,
	sortPostState: SORT_POST_STATES.HOT_POSTS,
	setSortPostState: () => null,
});
const POSTS_ACTION_TYPES = {
	SET_POSTS: "SET_POSTS",
	ADD_POST: "ADD_POST",
	CHANGE_POST: "CHANGE_POST",
	CHANGE_SORT_POSTS_STATE: "CHANGE_SORT_POSTS_STATE",
};

const postsReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case POSTS_ACTION_TYPES.SET_POSTS:
			return { ...state, posts: payload };

		case POSTS_ACTION_TYPES.ADD_POST:
			return { ...state, posts: [...state.posts, payload] };

		case POSTS_ACTION_TYPES.CHANGE_POST:
			return {
				...state,
				posts: state.posts.map((post) =>
					post.id === payload.id ? payload : post
				),
			};

		case POSTS_ACTION_TYPES.CHANGE_SORT_POSTS_STATE:
			
			return { ...state, sortPostState: payload };
		default:
			throw new Error(`Unhandled type ${type} in postsReducer`);
	}
};

const INITIAL_STATE = {
	posts: [],
	postsCount: 0,
	sortPostState: SORT_POST_STATES.HOT_POSTS,
};
export const PostsProvider = ({ children }) => {
	//Get from firebase
	useEffect(() => {
		const getFirebaseDatabase = async () => {
			const firebasePosts = await getPostsFromFirebase();

			
			// const modifiedPosts=firebasePosts.map((item) => ({...item,comments:[]}))
			
			
			updatePostReducer(firebasePosts);
		};
		getFirebaseDatabase();
		const unsubscribe = dataChangeListener((posts) => {
			const categoryMap = posts.docs.map((docSnapshot) => {
				return docSnapshot.data();
			}, {});
			updatePostReducer(categoryMap);
		});
	}, []);
	const [{ posts, postsCount, sortPostState }, dispatch] = useReducer(
		postsReducer,
		INITIAL_STATE
	);

	const { currentUser } = useContext(UserContext);

	//Database functions

	//firestore change listener

	//hm
	const updatePostReducer = (newPosts) => {
		dispatch(createAction(POSTS_ACTION_TYPES.SET_POSTS, newPosts));
	};
	//add new post
	const addPostToDataBase = (newPost) => {
		dispatch(createAction(POSTS_ACTION_TYPES.ADD_POST, newPost));
		addItemAndCollection("posts", newPost);
	};
	//change existing post
	const changePostInDataBase = (post) => {
		post.likes = post.likedBy.length;
		dispatch(createAction(POSTS_ACTION_TYPES.CHANGE_POST, post));
		addItemAndCollection("posts", post);
	};

	const removeLikeFromPost = (user, dislikedPost) => {
		const { uid } = user;
		const foundPost = posts.find((item) => item.id == dislikedPost.id);
		if (foundPost.likedBy.includes(uid)) {
			const index = foundPost.likedBy.indexOf(uid);
			foundPost.likedBy.splice(index, 1);

			changePostInDataBase(foundPost);
		}
	};

	//adds comment to post
	
	//adds like to the post and calls database function
	const addLikeToPost = (user, likedPost) => {
		const { uid } = user;
		const foundPost = posts.find((item) => item.id == likedPost.id);
		if (!foundPost.likedBy.includes(uid)) {
			const newPost = {
				...foundPost,
				likedBy: [...foundPost.likedBy, uid],
			};
			changePostInDataBase(newPost);
		}
	};

	//set sort post state
	const setSortPostState = (newSortPostState) => {
		dispatch(
			createAction(
				POSTS_ACTION_TYPES.CHANGE_SORT_POSTS_STATE,
				SORT_POST_STATES[newSortPostState]
			)
		);
	};

	//find post by id return post
	const findPostById=(id)=>{
		return posts.find((post)=>post.id==id);

	}



	//generate post
	const createNewPost = async (newPostInfo) => {
		const { title, text, image } = newPostInfo;
		var imageUrl = "";
		if (image) {
			const filePath = v4();

			imageUrl = await uploadImageToStorage(image, filePath);
		}

		const newPost = {
			title: title,
			text: text,
			author: currentUser.displayName,
			createdAt: new Date().getTime(),
			likes: 0,
			id: Math.floor(Math.random() * 10000000),
			imageUrl: imageUrl || "",
			likedBy: [],
			comments:[],
		};
		addPostToDataBase(newPost);
	};

	const createNewComment=(commentText,post)=>{

		const newComment={
			text:commentText,
			author:currentUser.displayName,
			authorId:currentUser.uid,
			createdAt: new Date().getTime(),
		}
		console.log(newComment);
		const newPost={...post,comments:[...post.comments,newComment]};
		changePostInDataBase(newPost);
	}


	const value = {
		createNewPost,
		posts,
		postsCount,
		addLikeToPost,
		removeLikeFromPost,
		sortPostState,
		setSortPostState,
		findPostById,
		createNewComment,
	};
	return (
		<PostsContext.Provider value={value}>{children}</PostsContext.Provider>
	);
};
