import theme from "./theme/theme"
import "./App.css"
import { ThemeProvider } from "@material-ui/core"
import MainRouter from "./pages/MainRouter"
import { useEffect } from "react"
import { loadContract, loadWeb3 } from "./Blockchain/blockchain"

function App() {
	return (
		<ThemeProvider theme={theme}>
			<MainRouter />
		</ThemeProvider>
	)
}

export default App
