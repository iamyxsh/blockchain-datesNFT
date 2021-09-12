import { useEffect, useState } from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import { red } from "@material-ui/core/colors"
import { DateData } from "../Types/Blockchain.types"
import { APIResponse } from "../Types/API.types"
import { Grid } from "@material-ui/core"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import {
	loadWeb3,
	loadContract,
	claimDate,
	getClaimedDate,
} from "../Blockchain/blockchain"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			maxWidth: 345,
			minHeight: "30vh",
		},
		media: {
			minHeight: "30%",

			paddingTop: "56.25%", // 16:9
		},
		expand: {
			transform: "rotate(0deg)",
			marginLeft: "auto",
			transition: theme.transitions.create("transform", {
				duration: theme.transitions.duration.shortest,
			}),
		},
		expandOpen: {
			transform: "rotate(180deg)",
		},
		avatar: {
			backgroundColor: red[500],
		},
	})
)

type Props = {
	dto: DateData
}

export default function ViewAllItem({
	dto: { id, day, month, year, title },
}: Props) {
	const classes = useStyles()
	const [apiData, setApiData] = useState<APIResponse>()
	const [bought, setBought] = useState<boolean>(false)
	const [isOwned, setIsOwned] = useState<boolean>(false)

	useEffect(() => {
		const getApiInfo = async () => {
			const data = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
				method: "GET",
				headers: {
					Accept: "appication/json",
				},
			}).then((res) => res.json())

			const web3 = await loadWeb3()
			if (web3) {
				const { contract } = await loadContract(web3)
				const res = await getClaimedDate(id, contract)
				setIsOwned(res)
			}

			setApiData(data)
		}

		getApiInfo()
	}, [bought])

	const buyDate = async () => {
		const web3 = await loadWeb3()
		if (web3) {
			const { contract, account } = await loadContract(web3)
			const res = await claimDate(id, contract, account, web3)
			if (res.blockNumber) {
				alert("You have bought a new Date.")
				setBought(true)
			}
		}
	}

	if (apiData) {
		return (
			<Card className={classes.root}>
				<CardHeader title={title} subheader={`${day}/${month}/${year}`} />
				<CardMedia
					className={classes.media}
					image={`${process.env.REACT_APP_API_URL}${apiData.image}`}
				/>
				<CardContent>
					<Typography variant="body2" color="textSecondary" component="p">
						{apiData?.description}
					</Typography>
				</CardContent>
				<CardActions style={{ visibility: isOwned ? "hidden" : "visible" }}>
					<IconButton onClick={buyDate}>
						<ShoppingCartIcon />
					</IconButton>
				</CardActions>
			</Card>
		)
	} else {
		return <Grid item>Loading..</Grid>
	}
}
