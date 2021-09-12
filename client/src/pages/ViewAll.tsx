import { Grid } from "@material-ui/core"
import React, { FC, ReactElement, useEffect, useState } from "react"
import { loadAllDates, loadContract, loadWeb3 } from "../Blockchain/blockchain"
import ViewAllItem from "../components/ViewAllItem"

const ViewAll = () => {
	const [allDates, setAllDates] = useState<string[][]>()

	useEffect(() => {
		const getDates = async () => {
			const web3 = await loadWeb3()
			if (web3) {
				const { contract } = await loadContract(web3)
				const res = await loadAllDates(contract)
				setAllDates(res)
			}
		}

		getDates()
	}, [])

	return (
		<Grid
			container
			xs={12}
			alignItems="center"
			justifyContent="center"
			spacing={2}
		>
			{allDates?.map((item: string[]): ReactElement<any, any> => {
				const dto = {
					id: parseInt(item[0]),
					day: parseInt(item[1]),
					month: parseInt(item[2]),
					year: parseInt(item[3]),
					title: item[4],
				}

				return (
					<Grid item xs={3}>
						<ViewAllItem dto={dto} />
					</Grid>
				)
			})}
		</Grid>
	)
}

export default ViewAll
