class Alcancia {
    constructor() {
        // Intentamos obtener el saldo de localStorage, si no existe, inicia en 0
        this.saldo = parseFloat(localStorage.getItem("saldoAlcancia")) || 0;
    }

    guardarSaldo() {
        localStorage.setItem("saldoAlcancia", this.saldo);
    }

    obtenerSaldo() {
        return this.saldo;
    }

    depositar(cantidad) {
        this.saldo += cantidad;
        this.guardarSaldo();
        return `Se han ingresado $${cantidad} correctamente.`;
    }

    retirar(cantidad) {
        if (this.saldo <= 0) {
            return "Error: La alcancía está vacía.";
        }
        if (cantidad > this.saldo) {
            return `Error: Fondos insuficientes. Solo tienes $${this.saldo}.`;
        }
        
        this.saldo -= cantidad;
        this.guardarSaldo();
        return `Retiro exitoso. Retiraste $${cantidad}.`;
    }
}

const miAlcancia = new Alcancia();
const operaciones = document.getElementById('operaciones');

// 1. CONSULTAR SALDO
document.getElementById('consultar').addEventListener('click', function() {
    const saldoActual = miAlcancia.obtenerSaldo();
    operaciones.innerHTML = `
        <br>
        <div>
            <h3>Tu saldo actual es:</h3>
            <p class="saldo-grande">$${saldoActual.toFixed(2)}</p>
            <br>
            <p>Consulta de saldo realizada.</p>
        </div>
    `;
});

///////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById('ingresar').addEventListener('click',function(){
    let botones=`
        <br>
        <div id="denominaciones">
            <p>Selecciona la denominación a ingresar:</p>
            <br>
            <input id="mon1" type="button" value="$1" onclick="procesarDeposito(${1})">
            <input id="mon2" type="button" value="$2" onclick="procesarDeposito(${2})">
            <input id="mon5" type="button" value="$5" onclick="procesarDeposito(${5})">
            <input id="mon10" type="button" value="$10" onclick="procesarDeposito(${10})">
            <input id="bil20" type="button" value="$20" onclick="procesarDeposito(${20})">
            <input id="bil50" type="button" value="$50" onclick="procesarDeposito(${50})">
            <input id="bil100" type="button" value="$100" onclick="procesarDeposito(${100})">
            <input id="bil200" type="button" value="$200" onclick="procesarDeposito(${200})">
            <input id="bil500" type="button" value="$500" onclick="procesarDeposito(${500})">
        </div>
        <br>
        <p id="mensajeDep"></p>
    `;
    operaciones.innerHTML = botones;
});

function procesarDeposito(valor){
    const mensaje = miAlcancia.depositar(valor);
    const deposito = document.getElementById('mensajeDep');
    deposito.innerText = mensaje;
}

//////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById('retirar').addEventListener('click', function(){
    const saldoActual = miAlcancia.obtenerSaldo();

    if (saldoActual <= 0) {
        operaciones.innerHTML = `
            <br>
            <p>Acción denegada.</p>
            <br>
            <p class="error">No puedes realizar retiros. Tu alcancía está vacía ($0).</p>
        `;
        return;
    }

    operaciones.innerHTML = `
        <br>
        <p>Ingrese la cantidad a retirar: </p>
        <br>
        <div>
            <label for="montoRetiro">Cantidad disponible: $ <span id="saldo">${saldoActual}</span> </label>
            <input type="number" id="montoRetiro" placeholder="Ej: 50">
            <button id="btnRetirar">Retirar</button>
            <p id="mensajeRet"></p>
        </div>
    `;

    document.getElementById('btnRetirar').addEventListener('click', function() {

        const montoInput = document.getElementById('montoRetiro');
        const monto = parseFloat(montoInput.value);
        const mensajeRet = document.getElementById('mensajeRet');
        const saldoActual = document.getElementById('saldo');

        if (isNaN(monto) || monto <= 0) {
            mensajeRet.innerText = "Por favor ingresa una cantidad válida.";
            return;
        }

        // Intentar retirar usando el método de la clase
        const respuesta = miAlcancia.retirar(monto);
        saldoActual.innerText = miAlcancia.obtenerSaldo().toFixed(2);
        mensajeRet.innerText = respuesta;
        montoInput.value = "";
    });

});