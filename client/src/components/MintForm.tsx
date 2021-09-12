import {
	Button,
	createStyles,
	Grid,
	makeStyles,
	TextField,
	Theme,
} from "@material-ui/core"
import React, { useState } from "react"
import { mintDate, loadContract, loadWeb3 } from "../Blockchain/blockchain"
import { DateData } from "../Types/Blockchain.types"

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			borderRadius: "2rem",
			backgroundColor: theme.palette.secondary.light,
			padding: "5rem",
			marginTop: "5rem",
		},
		button: {
			color: "white",
			fontSize: "1.2rem",
			width: "6rem",
			marginTop: "2rem",
		},
	})
)

const MintForm = () => {
	const classes = useStyles()
	const [dateData, setDateData] = useState<DateData>({
		id: 0,
		day: 0,
		month: 0,
		year: 0,
		title: "",
	})

	const mint = async () => {
		const web3 = await loadWeb3()
		if (web3) {
			const { contract, account } = await loadContract(web3)
			const res = await mintDate(dateData, contract, account)
		}
	}

	return (
		<Grid
			container
			alignItems="center"
			justifyContent="center"
			className={classes.root}
			spacing={5}
		>
			<Grid item xs={6}>
				<TextField
					color="primary"
					type="number"
					label="Day"
					onChange={(e) =>
						setDateData({ ...dateData, day: parseInt(e.target.value) })
					}
					value={dateData.day}
				/>
			</Grid>
			<Grid item xs={6}>
				<TextField
					color="primary"
					type="number"
					label="Month"
					onChange={(e) =>
						setDateData({ ...dateData, month: parseInt(e.target.value) })
					}
					value={dateData.month}
				/>
			</Grid>
			<Grid item xs={6}>
				<TextField
					color="primary"
					type="number"
					label="Year"
					onChange={(e) =>
						setDateData({ ...dateData, year: parseInt(e.target.value) })
					}
					value={dateData.year}
				/>
			</Grid>
			<Grid item xs={6}>
				<TextField
					color="primary"
					type="text"
					label="Title"
					onChange={(e) => setDateData({ ...dateData, title: e.target.value })}
					value={dateData.title}
				/>
			</Grid>
			<Grid item xs={12}>
				<Button
					variant="contained"
					color="primary"
					className={classes.button}
					onClick={mint}
				>
					Mint
				</Button>
			</Grid>
		</Grid>
	)
}

export default MintForm
function setAllDates(res: any) {
	throw new Error("Function not implemented.")
}
