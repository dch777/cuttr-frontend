import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Line from "./components/Line";

import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState({});
	const [refreshKey, refresh] = useState("");

	useEffect(() => {
		axios
			.get("/auth/data")
			.then((res) => {
				setUser(res.data);
				setLoggedIn(true);
			})
			.catch((err) => {
				setLoggedIn(false);
			});
	}, [refreshKey]);

	return (
		<div class="">
			<Navbar refresh={refresh} loggedIn={loggedIn} user={user} />
			<div class="pt-16">
				<Routes>
					<Route
						path="/"
						element={<Home refresh={refresh} loggedIn={loggedIn} user={user} />}
					/>
					<Route
						path="/login"
						element={
							<Login refresh={refresh} loggedIn={loggedIn} user={user} />
						}
					/>
					<Route
						path="/signup"
						element={
							<Signup refresh={refresh} loggedIn={loggedIn} user={user} />
						}
					/>
					<Route
						path="/:lineID"
						element={<Line refresh={refresh} loggedIn={loggedIn} user={user} />}
					/>
					<Route
						path="*"
						element={
							<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
								<div class="max-w-5xl space-y-8">
									<div>
										<h2 class="mt-8 text-center text-4xl font-extrabold text-gray-900">
											There's nothing here!
										</h2>
									</div>
								</div>
							</div>
						}
					/>
				</Routes>
			</div>
		</div>
	);
};

export default App;
