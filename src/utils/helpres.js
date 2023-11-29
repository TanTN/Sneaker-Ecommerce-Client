const changePriceToNumber = (price) => Number(price.replace(/[^0-9]/g, ''))
const changePriceToString = (price) => price.toLocaleString() + "đ"

export {
    changePriceToNumber,
    changePriceToString
}