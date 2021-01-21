class Util {
    static #defaultFormart = Intl.NumberFormat("pt-br", {
        currency: "BRL",
        style: "currency"
    })

    static formatCurrency(value) {
        return this.#defaultFormart.format(value)
    }
    static unFormartCurrency(value) {
        return Number(value.replace(/\D/g, '')) / 100;
        
    }
}

module.exports = Util