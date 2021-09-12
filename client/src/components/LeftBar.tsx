import {
	createStyles,
	Divider,
	Grid,
	makeStyles,
	Theme,
	Typography,
} from "@material-ui/core"
import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginTop: "2rem",
			color: "white",
		},
		listItem: {
			marginBottom: "1rem",
			width: "100%",
		},
	})
)

const LeftBar = () => {
	const classes = useStyles()
	const history = useHistory()

	return (
		<Grid
			container
			xs={12}
			direction="column"
			alignItems="center"
			className={classes.root}
		>
			<Grid item xs={12}>
				<Typography
					variant="h5"
					style={{ cursor: "pointer" }}
					onClick={() => history.push("/")}
				>
					View All
				</Typography>
				<Divider className={classes.listItem} />
			</Grid>
			<Grid item xs={12}>
				<Typography
					variant="h5"
					style={{ cursor: "pointer" }}
					onClick={() => history.push("owned")}
				>
					My Dates
				</Typography>
				<Divider className={classes.listItem} />
			</Grid>
		</Grid>
	)
}

export default LeftBar
