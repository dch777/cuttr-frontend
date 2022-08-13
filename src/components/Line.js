import { useState, useEffect, Fragment } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

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

	const moveUp = (index) => {
		var tmpLine = line.customers;
		[tmpLine.L[index - 1], tmpLine.L[index]] = [
			tmpLine.L[index],
			tmpLine.L[index - 1],
		];
		console.log(tmpLine);
		axios
			.post("/lines/" + lineID + "/update", { line: tmpLine })
			.catch((err) => {
				console.error(err);
			});
	};

	const moveDown = (index) => {
		var tmpLine = line.customers;
		[tmpLine.L[index], tmpLine.L[index + 1]] = [
			tmpLine.L[index + 1],
			tmpLine.L[index],
		];
		console.log(tmpLine);
		axios
			.post("/lines/" + lineID + "/update", { line: tmpLine })
			.catch((err) => {
				console.error(err);
			});
	};

	const kick = (customer_id) => {
		const data = { customer_id };
		axios.post("/lines/" + lineID + "/kick", data).catch((err) => {
			console.error(err);
		});
	};

	const addTmpCustomer = () => {
		var tmpLine = line.customers;
		var username = prompt("Enter customer name");
		const uuid = uuidv4();
		const tmpUser = {
			M: { uuid: { S: uuid }, username: { S: username } },
		};
		tmpLine.L.push(tmpUser);
		console.log(tmpLine.L);
		axios
			.post("/lines/" + lineID + "/update", { line: tmpLine })
			.catch((err) => {
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
						{line.customers.L.map((customer, index) => (
							<div class="flex flex-row justify-between">
								{props.user.client.BOOL ? (
									<Fragment>
										<div class="flex flex-row">
											<button
												onClick={() => moveUp(index)}
												class="bg-gray-300 hover:bg-gray-400 rounded-l w-6 font-extrabold disabled:opacity-50 disabled:bg-gray-200"
												disabled={index === 0}
											>
												˄
											</button>
											<button
												onClick={() => moveDown(index)}
												class="bg-gray-200 hover:bg-gray-400 rounded-r w-6 font-extrabold disabled:opacity-50 disabled:bg-gray-200"
												disabled={index === line.customers.L.length - 1}
											>
												˅
											</button>
											<Link class="ml-4" to={"/u/" + customer.M.uuid.S}>
												{customer.M.username.S}
											</Link>
										</div>

										<button
											class="bg-red-500 hover:bg-red-600 rounded px-2 font-extrabold text-white"
											onClick={() => kick(customer.M.uuid.S)}
										>
											X
										</button>
									</Fragment>
								) : (
									<Link to={"/u/" + customer.M.uuid.S}>
										{customer.M.username.S}
									</Link>
								)}
							</div>
						))}
						{props.user.client.BOOL && (
							<button
								onClick={addTmpCustomer}
								class="bg-gray-300 hover:bg-gray-400 w-12 font-extrabold rounded"
							>
								+
							</button>
						)}
					</ul>
				</div>
			</div>
		);
	} else if (!props.loggedIn) {
		return "Please Log In";
	}
};

export default Line;
