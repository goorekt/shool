import logo from "./logo.svg";
import "./App.css";
import { useContext } from "react";
import { UserContext } from "./contexts/user.context";
import { Routes, Route } from "react-router-dom";
import Navbar from "./routes/navbar/navbar.routes";
import SignInPage from "./routes/sign-in/sign-in.page";
import HomePage from "./routes/home/home.page";

function App() {
	const { currentUser } = useContext(UserContext);

	return (
    <Routes>
    <Route path="/" element={<Navbar/>}>
    <Route index element={<HomePage/>}/>
    <Route path="sign-in" element={<SignInPage/>}/>
    </Route>
    </Routes>
		
	);
}

export default App;
