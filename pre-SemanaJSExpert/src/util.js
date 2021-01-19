class Util {
    static #defaultFormart = Intl.NumberFormat("pt-br", {
        currency: "BRL",
        style: "currency"
    })

    static formatCurrency(value) {
        return this.#defaultFormart.format(value)
    }
}

module.exports = Util