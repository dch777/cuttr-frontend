import { useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { sha256 } from "js-sha256";

const Login = (props) => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = (event) => {
		event.preventDefault();
		const data = {
			email,
			password: sha256(password),
		};

		axios.post("/auth/login", data).then((res) => {
			props.refresh("login");
			navigate("/");
		});
	};

	if (!props.loggedIn) {
		return (
			<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div class="max-w-md w-full space-y-8">
					<div>
						<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
							Sign in to your account
						</h2>
					</div>
					<form class="mt-8 space-y-6" action="#" onSubmit={onSubmit}>
						<div class="rounded-md shadow-sm -space-y-px">
							<div>
								<label for="email-address" class="sr-only">
									Email address
								</label>
								<input
									id="email-address"
									name="email"
									type="email"
									required
									class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Email address"
									onChange={(e) => {
										setEmail(e.target.value);
									}}
								/>
							</div>
							&nbsp;
							<div>
								<label for="password" class="sr-only">
									Password
								</label>
								<input
									id="password"
									name="password"
									type="password"
									autocomplete="current-password"
									required
									class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Password"
									onChange={(e) => {
										setPassword(e.target.value);
									}}
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-5"
							>
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	} else {
		return <Navigate to="/" />;
	}
};

export default Login;
