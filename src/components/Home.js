import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = (props) => {
	const [lines, setLines] = useState([]);

	useEffect(() => {
		axios
			.get("/lines/")
			.then((res) => {
				setLines(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	if (props.loggedIn) {
		return (
			<div class="min-h-full flex items-center justify-center py-4 px-4">
				<div class="max-w-7xl w-full">
					{Array.isArray(lines)
						? lines.map((line) => (
								<Link to={line.uuid.S}>{line.address.S}</Link>
						  ))
						: null}
				</div>
			</div>
		);
	} else {
		return <h1 class="text-xl">Please Log In</h1>;
	}
};

export default Home;
