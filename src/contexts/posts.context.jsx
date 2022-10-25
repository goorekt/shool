import { createContext } from "react";

const PostsContext=createContext({
    createNewPost:()=>null,
    posts:[],

})
export const PostsProvider=({})