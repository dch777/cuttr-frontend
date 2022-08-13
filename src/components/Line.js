import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

const socket = io("/");

const Line = (props) => {
	const { lineID } = useParams();
	const [line, setLine] = useState({});
	const [lineExists, setLineExists] = useState(false);

	useEffect(() => {
		socket.on("line-" + lineID + "-update", (res) => {
			setLine(res);
		});

		axios
			.get("/lines/" + lineID)
			.then((res) => {
				setLine(res.data);
				setLineExists(true);
			})
			.catch((err) => {
				console.error(err);
			});

		return () => {
			socket.off("line-" + lineID + "-update");
		};
	}, [lineID]);

	const join = () => {
		axios.get("/lines/" + lineID + "/join").catch((err) => {
			console.error(err);
		});
	};

	const advance = () => {
		axios.get("/lines/" + lineID + "/advance").catch((err) => {
			console.error(err);
		});
	};

	if (lineExists) {
		return (
			<div class="min-h-full flex items-center justify-center py-4 px-4">
				<div class="max-w-7xl w-full">
					<div class="flex w-full justify-between">
						<h1 class="text-3xl font-bold">{line.address.S}</h1>
						<div class="space-x-2">
							<button
								onClick={join}
								class="rounded bg-green-500 text-white text-lg px-3 py-1 font-bold hover:bg-green-600"
							>
								Join
							</button>
							<button
								onClick={advance}
								class="rounded bg-blue-500 text-white text-lg px-3 py-1 font-bold hover:bg-blue-600"
							>
								Advance
							</button>
						</div>
					</div>
					<ul>
						{line.customers.L.map((customer) => (
							<ul>{customer.S}</ul>
						))}
					</ul>
				</div>
			</div>
		);
	} else {
		return (
			<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div class="max-w-5xl space-y-8">
					<div>
						<h2 class="mt-8 text-center text-4xl font-extrabold text-gray-900">
							There's nothing here!
						</h2>
					</div>
				</div>
			</div>
		);
	}
};

export default Line;
