import { useState, useEffect, Fragment } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

const socket = io("/");

const Line = (props) => {
	const location = useLocation();
	const { lineID } = useParams();
	const [line, setLine] = useState(location.state ? location.state.line : null);

	useEffect(() => {
		socket.on("line-" + lineID + "-update", (res) => {
			setLine(res);
		});

		axios
			.get("/lines/" + lineID)
			.then((res) => {
				setLine(res.data);
			})
			.catch((err) => {
				console.error(err);
			});

		return () => {
			socket.off("line-" + lineID + "-update");
		};
	}, [lineID]);

	const join = () => {
		axios.post("/lines/" + lineID + "/join").catch((err) => {
			console.error(err);
		});
	};

	const leave = () => {
		axios.post("/lines/" + lineID + "/leave").catch((err) => {
			console.error(err);
		});
	};

	const advance = () => {
		axios.post("/lines/" + lineID + "/advance").catch((err) => {
			console.error(err);
		});
	};

	const kick = (customer_id) => {
		const data = { customer_id };
		axios.post("/lines/" + lineID + "/kick", data).catch((err) => {
			console.error(err);
		});
	};

	if (props.loggedIn && line) {
		return (
			<div class="min-h-full flex items-center justify-center py-4 px-4">
				<div class="max-w-7xl w-full space-y-4">
					<div class="flex w-full justify-between">
						<h1 class="text-3xl font-bold">{line.address.S}</h1>
						{!props.user.client.BOOL ? (
							<div>
								<button
									onClick={join}
									class="rounded-l bg-green-500 text-white text-lg px-3 py-1 font-bold hover:bg-green-600"
								>
									Join
								</button>
								<button
									onClick={leave}
									class="rounded-r bg-red-500 text-white text-lg px-3 py-1 font-bold hover:bg-red-600"
								>
									Leave
								</button>
							</div>
						) : (
							<button
								onClick={advance}
								class="rounded bg-blue-500 text-white text-lg px-3 py-1 font-bold hover:bg-blue-600"
							>
								Advance
							</button>
						)}
					</div>
					<ul class="space-y-2">
						{line.customers.L.map((customer) => (
							<div class="flex flex-row justify-between">
								{props.user.client.BOOL ? (
									<Fragment>
										<div class="flex flex-row">
											<button class="bg-gray-200 hover:bg-gray-400 rounded-l px-2 font-extrabold">
												˄
											</button>
											<button class="bg-gray-200 hover:bg-gray-400 rounded-r px-2 font-extrabold">
												˅
											</button>
											<h1 class="ml-4">{customer.S}</h1>
										</div>

										<button
											class="bg-red-500 hover:bg-red-600 rounded px-2 font-extrabold text-white"
											onClick={() => kick(customer.S)}
										>
											X
										</button>
									</Fragment>
								) : (
									<h1>{customer.S}</h1>
								)}
							</div>
						))}
					</ul>
				</div>
			</div>
		);
	} else if (!props.loggedIn) {
		return "Please Log In";
	}
};

export default Line;
