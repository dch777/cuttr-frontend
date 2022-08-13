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
								<Link to={line.uuid.S} state={{ line: line }}>
									<button class="rounded p-2 text-white bg-blue-500 hover:bg-blue-600">
										{line.address.S}
									</button>
								</Link>
						  ))
						: null}
				</div>
			</div>
		);
	}
};

export default Home;
