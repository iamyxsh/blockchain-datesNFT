import React from "react"
import {
	createStyles,
	Grid,
	makeStyles,
	Theme,
	Typography,
} from "@material-ui/core"
import clsx from "clsx"
import MintForm from "../components/MintForm"

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		color: {
			color: theme.palette.primary.main,
		},
		root: {
			marginTop: "2rem",
			textAlign: "center",
		},
	})
)

const Admin = (props: Props) => {
	const classes = useStyles()

	return (
		<Grid
			container
			alignItems="center"
			justifyContent="center"
			className={clsx(classes.color, classes.root)}
		>
			<Grid item xs={12}>
				<Typography variant="h2">Mint new Date</Typography>
			</Grid>
			<Grid item xs={8}>
				<MintForm />
			</Grid>
		</Grid>
	)
}

export default Admin
