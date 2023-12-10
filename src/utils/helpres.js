const changePriceToString = (price) => {
    if (price) {
        return price.toLocaleString() + "đ"
    }
}


export {
    changePriceToString
}