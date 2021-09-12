import Web3 from "web3"
import { Contract } from "web3-eth-contract"
import { AbiItem } from "web3-utils"

import { CONTRACT_ADDRESS } from "../configs/env"
import { CONTRACT_ABI } from "../configs/abi"
import { DateData } from "../Types/Blockchain.types"

declare global {
	interface Window {
		web3: Web3
	}
}

export const loadWeb3 = async () => {
	// @ts-ignore
	const { ethereum } = window

	if (window.web3) {
		const web3 = new Web3(window.web3.currentProvider)
		await ethereum.enable()
		return web3
	} else {
		alert("Please install Metamask to continue.....")
	}
}

export const loadContract = async (web3: Web3) => {
	const accounts = await web3.eth.getAccounts()
	const account = accounts[0]

	const contract = new web3.eth.Contract(
		CONTRACT_ABI as AbiItem[],
		CONTRACT_ADDRESS
	)

	return { account, contract }
}

export const mintDate = async (
	{ day, month, year, title }: DateData,
	contract: Contract,
	account: string
) => {
	return contract.methods.mint(day, month, year, title).send({
		from: account,
	})
}

export const loadAllDates = async (contract: Contract) => {
	return contract.methods.getAllDates().call()
}

export const getClaimedDate = async (id: number, contract: Contract) => {
	return contract.methods.isDateOwned(id).call()
}

export const getUserClaimedDates = async (contract: Contract) => {
	return contract.methods.getAllOwnedDates().call()
}

export const claimDate = async (
	id: number,
	contract: Contract,
	account: string,
	web3: Web3
) => {
	return contract.methods.claim(id).send({
		from: account,
		value: web3.utils.toWei("101", "finney"),
	})
}
