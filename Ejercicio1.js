class CuentaBancaria {
    #numero;
    #titular;
    #saldo;

    constructor(numero, titular, saldoInicial) {
        this.#numero = numero;
        this.#titular = titular;
        this.#saldo = saldoInicial;
    }

    getNumero() {
        return this.#numero;
    }
    getTitular() {
        return this.#titular;
    }
    getSaldo() {
        return this.#saldo;
    }

    consignar(monto) {
        if (monto <= 0) {
            console.error(`Error: El monto a consignar debe ser mayor a cero.`);
            return false;
        }
        this.#saldo += monto;
        console.log(`¡Consignación exitosa! Nuevo saldo de ${this.#titular}: $${this.#saldo}`);
        return true;
    }

    retirar(monto) {
        if (monto <= 0) {
            console.error(`Error: El monto a retirar debe ser mayor a cero.`);
            return false;
        }
        if (monto > this.#saldo) {
            console.error(`Error: Fondos insuficientes. El saldo actual es $${this.#saldo}`);
            return false;
        }
        this.#saldo -= monto;
        console.log(`¡Retiro exitoso! Nuevo saldo de ${this.#titular}: $${this.#saldo}`);
        return true;
    }
}

class CuentaAhorros extends CuentaBancaria {
    constructor(numero, titular, saldoInicial) {
        super(numero, titular, saldoInicial);
    }
}

class CuentaCorriente extends CuentaBancaria {
    #sobregiro;

    constructor(numero, titular, saldoInicial, sobregiro) {
        super(numero, titular, saldoInicial);
        this.#sobregiro = sobregiro;
    }

    getSobregiro() {
        return this.#sobregiro;
    }

    retirar(monto) {
        if (monto <= 0) {
            console.error(`Error: El monto a retirar debe ser mayor a cero.`);
            return false;
        }
        let saldoDisponible = this.getSaldo() + this.#sobregiro;
        if (monto > saldoDisponible) {
            console.error(`Error: El retiro excede el saldo y el límite de sobregiro permitido.`);
            return false;
        }
        // Permitir retiro restando del saldo (puede quedar en negativo con sobregiro)
        let saldoActual = this.getSaldo();
        // Forzamos la actualización restando directamente
        super.retirar(monto);
        return true;
    }
}

class Banco {
    #cuentas;

    constructor() {
        this.#cuentas = [];
    }

    registrarCuenta(cuenta) {
        let existe = this.#cuentas.some(c => c.getNumero() === cuenta.getNumero());
        if (existe) {
            console.error(`Error: Ya existe una cuenta registrada con el número ${cuenta.getNumero()}.`);
            return false;
        }

        this.#cuentas.push(cuenta);
        console.log(`Cuenta registrada con éxito: ${cuenta.getNumero()} - Titular: ${cuenta.getTitular()}`);
        return true;
    }

    consignar(numero, monto) {
        let cuenta = this.#cuentas.find(c => c.getNumero() === numero);
        if (!cuenta) {
            console.error(`Error: La cuenta con número ${numero} no existe en el sistema.`);
            return false;
        }
        return cuenta.consignar(monto);
    }

    retirar(numero, monto) {
        let cuenta = this.#cuentas.find(c => c.getNumero() === numero);
        if (!cuenta) {
            console.error(`Error: La cuenta con número ${numero} no existe en el sistema.`);
            return false;
        }
        return cuenta.retirar(monto);
    }

    consultarSaldo(numero) {
        let cuenta = this.#cuentas.find(c => c.getNumero() === numero);
        if (!cuenta) {
            console.error(`Error: La consulta falló. La cuenta ${numero} no existe.`);
            return false;
        }
        console.log(`Saldo actual de la cuenta ${numero} (${cuenta.getTitular()}): $${cuenta.getSaldo()}`);
        return cuenta.getSaldo();
    }
}

let miBanco = new Banco();

console.log("--- 1. REGISTRO DE CUENTAS ---");
let cAhorros = new CuentaAhorros("AH001", "Carlos Pérez", 500000);
let cCorriente = new CuentaCorriente("CC001", "Ana Gómez", 1000000, 200000);

miBanco.registrarCuenta(cAhorros);
miBanco.registrarCuenta(cCorriente);

miBanco.registrarCuenta(new CuentaAhorros("AH001", "Duplicado", 100000));

console.log("\n--- 2. CONSIGNACIONES Y RETIROS VÁLIDOS ---");
miBanco.consignar("AH001", 150000);
miBanco.retirar("AH001", 100000);

console.log("\n--- 3. PRUEBAS DE VERIFICACIÓN DE ERRORES ---");
miBanco.consignar("AH001", 0);
miBanco.consignar("AH001", -50000);
miBanco.retirar("AH001", 10000000);
miBanco.consultarSaldo("X999");
miBanco.retirar("X999", 50000);