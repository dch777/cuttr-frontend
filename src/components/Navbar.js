import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = (props) => {
	const navigate = useNavigate();

	const logout = () => {
		axios.get("/auth/logout").then(() => {
			navigate("/");
			props.refresh("logout");
		});
	};

	if (props.loggedIn) {
		return (
			<nav class="absolute bg-gray-800 w-full">
				<div class="max-w-7xl mx-auto px-8">
					<div class="relative flex items-center justify-between h-16">
						<div class="flex-1 flex items-center justify-start">
							<div class="flex space-x-4">
								<Link
									to="/"
									class="text-gray-300 py-1 rounded-md text-2xl font-extrabold"
								>
									<a href="#Home">Cuttr</a>
								</Link>
							</div>
						</div>
						<div class="absolute inset-y-0 right-0 flex items-center text-white">
							<Link
								to="/resources"
								class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium mr-3"
							>
								<a href="#Resources">Resources</a>
							</Link>
							<button
								onClick={logout}
								class=" text-gray-800 bg-white px-3 py-2 rounded-md text-lg font-medium ml-5"
							>
								Logout
							</button>
						</div>
					</div>
				</div>
			</nav>
		);
	} else {
		return (
			<nav class="absolute bg-gray-800 w-full">
				<div class="max-w-7xl mx-auto px-8">
					<div class="relative flex items-center justify-between h-16">
						<div class="flex-1 flex items-center justify-start">
							<div class="flex space-x-4">
								<Link
									to="/"
									class="text-gray-300 px-3 py-1 rounded-md text-2xl font-extrabold"
								>
									<a href="#Home">Cuttr</a>
								</Link>
							</div>
						</div>
						<div class="absolute inset-y-0 right-0 flex items-center text-white">
							<Link
								to="/login"
								class=" text-gray-800 bg-slate-200 hover:bg-slate-400 px-3 py-2 rounded-l-md text-lg font-medium ml-5"
							>
								Login
							</Link>
							<Link
								to="/signup"
								class=" text-gray-800 bg-slate-200 hover:bg-slate-400 border-slate-300 border-l px-3 py-2 rounded-r-md text-lg font-medium"
							>
								Sign Up
							</Link>
						</div>
					</div>
				</div>
			</nav>
		);
	}
};

export default Navbar;
