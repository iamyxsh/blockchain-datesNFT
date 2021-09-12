import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core"
import LeftBar from "../components/LeftBar"
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom"
import ViewAll from "./ViewAll"
import Owned from "./Owned"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		leftBar: {
			margin: "1rem",
			borderRadius: "2rem",
			backgroundColor: theme.palette.secondary.dark,
			minHeight: "80vh",
		},
		dashboard: {
			marginTop: "2rem",
		},
	})
)

const HomePage = () => {
	const classes = useStyles()

	return (
		<Grid container xs={12}>
			<Grid item xs={1}></Grid>
			<Grid item className={classes.leftBar} xs={2}>
				<LeftBar />
			</Grid>
			<Grid item xs={8} className={classes.dashboard}>
				<Switch>
					<Route path="/owned">
						<Owned />
					</Route>
					<Route path="/">
						<ViewAll />
					</Route>
				</Switch>
			</Grid>
			<Grid item xs={1}></Grid>
		</Grid>
	)
}

export default HomePage
