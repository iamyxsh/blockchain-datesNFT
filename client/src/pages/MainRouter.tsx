import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import HomePage from "./HomePage"
import Admin from "./Admin"
import NavBar from "../components/NavBar"

const MainRouter = () => {
	return (
		<BrowserRouter>
			<NavBar />
			<Switch>
				<Route exact path="/admin" component={Admin} />
				<Route path="/" component={HomePage} />
			</Switch>
		</BrowserRouter>
	)
}

export default MainRouter
