// TEMP: vault to allowed vaults object
export const priceFormat = (price: number, vault: string = '$') => {
	return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + vault
}

export const cardNumberFormat = (number: string) => {
	const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g
	const onlyNumbers = number.replace(/[^\d]/g, '')

	return onlyNumbers.replace(regex, (regex, $1, $2, $3, $4) =>
		[$1, $2, $3, $4].filter(Boolean).join(' ')
	)
}
