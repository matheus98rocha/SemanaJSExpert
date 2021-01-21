const btnReiniciar = "btnReiniciar";
const idContador = "contador";
const valorContador = 100;
const periodoIntervalo = 10;


class ContadorComponent {
    constructor() {
        this.inicializar();
    }

    prepararContadorProxy() {
        const handler = {
            set: (currentContext, propertyKey, newValue) => {
                console.log({ currentContext, propertyKey, newValue });
                //Parar o processamento

                if (!currentContext.valor) {
                    currentContext.efetuarParada();
                }

                currentContext[propertyKey] = newValue;
                return true;
            }
        }

        const contador = new Proxy({
            valor: valorContador,
            efetuarParada: () => { }
        }, handler);

        return contador;
    }

    atualizarTexto = ({ elementoContador, contador }) => () => {
        const identificadorTexto = '$$contador';
        const textoPadrao = `Começando em <strong>${identificadorTexto}</strong> segundos...`;
        elementoContador.innerHTML = textoPadrao.replace(identificadorTexto, contador.valor--);
    }

    agendarParadaContador({ elementoContador, idIntervalo }) {

        return () => {
            clearInterval(idIntervalo);
            elementoContador.innerHTML = "";
            this.desabilitarBotao(false);
        }
    }

    prepararBotao(elementoBotao, iniciarFn) {
        elementoBotao.addEventListener('click', iniciarFn.bind(this));

        return (valor = true) => {
            const atributo = 'disabled'

            if (valor) {
                elementoBotao.setAttribute(atributo, valor);
                return;
            }

            elementoBotao.removeAttribute(atributo)
        }
    }

    inicializar() {
        console.log("Funcionou");
        const elementoContador = document.getElementById(idContador);

        const contador = this.prepararContadorProxy();

        const argumentos = {
            elementoContador,
            contador
        }

        const fn = this.atualizarTexto(argumentos);
        const idIntervalo = setInterval(fn, periodoIntervalo)

        {
            const elementoBotao = document.getElementById(btnReiniciar);
            const desabilitarBotao = this.prepararBotao(elementoBotao, this.inicializar);
            desabilitarBotao()
            const argumentos = { elementoContador, idIntervalo };
            const pararContadorFn = this.agendarParadaContador.apply({ desabilitarBotao }, [argumentos]);
            contador.efetuarParada = pararContadorFn
        }

    }
}

