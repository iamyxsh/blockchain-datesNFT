import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import clsx from "clsx"
import { Container } from "@material-ui/core"
import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
			fontSize: "1rem",
		},
		title: {
			flexGrow: 1,
			fontSize: "1.5rem",
		},
		colorWhite: {
			color: "white",
		},
	})
)

export default function NavBar() {
	const classes = useStyles()
	const history = useHistory()

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Container maxWidth="md">
					<Toolbar>
						<Typography
							variant="h6"
							className={clsx(classes.title, classes.colorWhite)}
						>
							DateNFT
						</Typography>
						<Button
							className={clsx(classes.menuButton, classes.colorWhite)}
							color="inherit"
							onClick={() => history.push("/")}
						>
							Home
						</Button>
						<Button
							className={clsx(classes.menuButton, classes.colorWhite)}
							color="inherit"
							onClick={() => history.push("/admin")}
						>
							Admin
						</Button>
					</Toolbar>
				</Container>
			</AppBar>
		</div>
	)
}
