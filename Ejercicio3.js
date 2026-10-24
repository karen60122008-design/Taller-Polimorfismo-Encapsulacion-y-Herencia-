class Vehiculo {
    #identificador;
    #capacidad;
    #estado; // "Disponible" o "Ocupado"

    constructor(identificador, capacidad) {
        this.#identificador = identificador;
        this.#capacidad = capacidad;
        this.#estado = "Disponible";
    }

    getIdentificador() {
        return this.#identificador;
    }
    getCapacidad() {
        return this.#capacidad;
    }
    getEstado() {
        return this.#estado;
    }

    setEstado(nuevoEstado) {
        this.#estado = nuevoEstado;
    }

    calcularCosto(distancia) {
        return 0;
    }
}

class Automovil extends Vehiculo {
    constructor(identificador, capacidad) {
        super(identificador, capacidad);
    }

    calcularCosto(distancia) {
        return distancia * 3000;
    }
}

class Motocicleta extends Vehiculo {
    constructor(identificador, capacidad) {
        super(identificador, capacidad);
    }

    calcularCosto(distancia) {
        return distancia * 1500;
    }
}

class Bicicleta extends Vehiculo {
    constructor(identificador, capacidad) {
        super(identificador, capacidad);
    }

    calcularCosto(distancia) {
        return distancia * 500;
    }
}

class EmpresaTransporte {
    #vehiculos;
    #viajes;

    constructor() {
        this.#vehiculos = [];
        this.#viajes = [];
    }

    registrarVehiculo(vehiculo) {
        if (vehiculo.getCapacidad() <= 0) {
            console.error(`Error: La capacidad del vehículo ${vehiculo.getIdentificador()} debe ser mayor a cero.`);
            return false;
        }

        let existe = this.#vehiculos.some(v => v.getIdentificador() === vehiculo.getIdentificador());
        if (existe) {
            console.error(`Error: Ya existe un vehículo registrado con el identificador ${vehiculo.getIdentificador()}.`);
            return false;
        }

        this.#vehiculos.push(vehiculo);
        console.log(`Vehículo registrado con éxito: ${vehiculo.getIdentificador()}`);
        return true;
    }

    registrarViaje(identificadorVehiculo, distancia) {
        if (distancia <= 0) {
            console.error(`Error: La distancia del viaje (${distancia} km) debe ser mayor a cero para evitar costos negativos.`);
            return false;
        }

        let vehiculoEncontrado = this.#vehiculos.find(v => v.getIdentificador() === identificadorVehiculo);

        if (!vehiculoEncontrado) {
            console.error(`Error: El vehículo con identificador ${identificadorVehiculo} no existe en el sistema.`);
            return false;
        }

        if (vehiculoEncontrado.getEstado() === "Ocupado") {
            console.error(`Error: El vehículo ${identificadorVehiculo} ya se encuentra ocupado en otro viaje.`);
            return false;
        }

        let costo = vehiculoEncontrado.calcularCosto(distancia);
        vehiculoEncontrado.setEstado("Ocupado");

        let viaje = {
            identificador: identificadorVehiculo,
            distancia: distancia,
            costo: costo
        };
        this.#viajes.push(viaje);

        console.log(`¡Viaje registrado con éxito! Vehículo: ${identificadorVehiculo} | Distancia: ${distancia}km | Costo: $${costo}`);
        return true;
    }
}

let empresa = new EmpresaTransporte();

console.log("--- 1. REGISTRO DE VEHÍCULOS ---");
let auto1 = new Automovil("A01", 4);
let moto1 = new Motocicleta("M01", 2);
let bici1 = new Bicicleta("B01", 1);

empresa.registrarVehiculo(auto1);
empresa.registrarVehiculo(moto1);
empresa.registrarVehiculo(bici1);

empresa.registrarVehiculo(new Automovil("A01", 2));
empresa.registrarVehiculo(new Bicicleta("B02", 0));

console.log("\n--- 2. PRUEBAS DE VIAJES ---");
empresa.registrarViaje("A01", 10);
empresa.registrarViaje("M01", 10);
empresa.registrarViaje("A01", 5);
empresa.registrarViaje("B01", -5);
empresa.registrarViaje("X999", 10);