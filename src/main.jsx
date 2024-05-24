import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import ErrorPage from "./ErrorPage.jsx";
import Sorting from "./3/Sorting.jsx";
import Maze from "./1/Maze.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/1",
		element: <Maze />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/2",
		element: <Sorting />,
		errorElement: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
