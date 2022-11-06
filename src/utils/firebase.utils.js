import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
} from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

import {getDownloadURL, getStorage,ref,uploadBytes} from "firebase/storage";
const firebaseConfig = {
	apiKey: "AIzaSyAAUYv9B61XoqGYtd1KVnjquMldeq0L4o8",
	authDomain: "shool-f6a2f.firebaseapp.com",
	projectId: "shool-f6a2f",
	storageBucket: "shool-f6a2f.appspot.com",
	messagingSenderId: "912201431542",
	appId: "1:912201431542:web:bb038fbcfe7b8db3cbefd7",
};
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider);

export const db = getFirestore();
const storage=getStorage(firebaseApp);


export const uploadImageToStorage=async (image,filePath)=>{
	if (image==null){
		
		return;
	}
	const imageRef=ref(storage,`images/${filePath}`);
	await uploadBytes(imageRef,image);
	// ${image.name+v4()}
	return getDownloadURL(imageRef);

	
};


export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	//attach to batch (transaction)
	objectsToAdd.forEach((object) => {
		//set reference
		const docRef = doc(collectionRef, object.id);
		//set the batch (transaction)
		batch.set(docRef, object);
	});
	await batch.commit();
};
export const addItemAndCollection = async (
	collectionKey,
	object,
	docKey=object.id
) => {
	//point to the collection to be stored in
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);
	//point to the document placement
	
	const docRef = doc(collectionRef,docKey.toString());
	//attach to batch (transaction)
	batch.set(docRef, object);
	await batch.commit();
};
export const getPostsFromFirebase = async () => {
	const collectionRef = collection(db, "posts");
	const q = query(collectionRef);

	//wtf
	const querySnapshot = await getDocs(q);
	
	const categoryMap = querySnapshot.docs.map((docSnapshot) => {
		
		return docSnapshot.data();
	}, {});
	return categoryMap;
};

export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	if (!userAuth) return;

	const userDocRef = doc(db, "users", userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);
	
	if (!userSnapshot.exists()) {
		const { displayName, email,uid } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				uid,
				...additionalInformation,
			});
		} catch (error) {
			console.log("error creating the user", error.message);
		}
	}

	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

const q = query(collection(db, "posts"));
export const dataChangeListener=(callback)=>{
	onSnapshot(q, callback);

}


export const onAuthStateChangedListener = (callback) =>
	onAuthStateChanged(auth, callback);

