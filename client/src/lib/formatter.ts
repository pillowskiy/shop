// TEMP: vault to allowed vaults object
export const priceFormat = (price: number, vault: string = "$") => {
    return price
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,') + vault;
}