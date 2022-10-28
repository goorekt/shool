import { createContext, useContext, useEffect, useReducer } from "react";
import { UserContext } from "./user.context";
import { v4 } from "uuid";
import { createAction } from "../utils/reducer/reducer.utils.js";
import {
	addItemAndCollection,
	getPostsFromFirebase,
	uploadImageToStorage,
} from "../utils/firebase.utils";

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
			console.log(payload);
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
<<<<<<< HEAD

			updatePostReducer(firebasePosts.filter((item) => item.title.length > 4));
=======
			console.log(firebasePosts);
			// firebasePosts.filter((item) => item.title.length < 50 && item.text.length > 4)
			updatePostReducer(
				firebasePosts
			);
>>>>>>> 7a0a963fb4a1b65e16b9eda9fa9f98d5b0e5e7d2
		};
		getFirebaseDatabase();
	}, []);
	const [{ posts, postsCount, sortPostState }, dispatch] = useReducer(
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
		};
		addPostToDataBase(newPost);
	};
	const value = {
		createNewPost,
		posts,
		postsCount,
		addLikeToPost,
		removeLikeFromPost,
		sortPostState,
		setSortPostState,
	};
	return (
		<PostsContext.Provider value={value}>{children}</PostsContext.Provider>
	);
};
