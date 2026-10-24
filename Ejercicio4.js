class Profesional {
    #identificacion;
    #nombre;
    #disponibilidad;

    constructor(identificacion, nombre, disponibilidad) {
        this.#identificacion = identificacion;
        this.#nombre = nombre;
        this.#disponibilidad = disponibilidad;
    }

    getIdentificacion() {
        return this.#identificacion;
    }

    getNombre() {
        return this.#nombre;
    }

    getDisponibilidad() {
        return this.#disponibilidad;
    }

    setDisponibilidad(nuevaDisponibilidad) {
        this.#disponibilidad = nuevaDisponibilidad;
    }

    calcularDuracionConsulta() {
        return 30; 
    }

    infoProfesional() {
        return `ID: ${this.#identificacion} | Nombre: ${this.#nombre} | Disponibilidad: ${this.#disponibilidad}`;
    }
}


class MedicinaGeneral extends Profesional {
    constructor(identificacion, nombre, disponibilidad) {
        super(identificacion, nombre, disponibilidad);
    }

    
    calcularDuracionConsulta() {
        return 20;
    }
}

class Especialista extends Profesional {
    #areaEspecialidad;

    constructor(identificacion, nombre, disponibilidad, areaEspecialidad) {
        super(identificacion, nombre, disponibilidad);
        this.#areaEspecialidad = areaEspecialidad;
    }

    getAreaEspecialidad() {
        return this.#areaEspecialidad;
    }

    
    calcularDuracionConsulta() {
        return 45; 
    }
}

class CitaMedica {
    #idCita;
    #idProfesional;
    #paciente;
    #fechaHora;

    constructor(idCita, idProfesional, paciente, fechaHora) {
        this.#idCita = idCita;
        this.#idProfesional = idProfesional;
        this.#paciente = paciente;
        this.#fechaHora = fechaHora;
    }

    getIdCita() { return this.#idCita; }
    getIdProfesional() { return this.#idProfesional; }
    getPaciente() { return this.#paciente; }
    getFechaHora() { return this.#fechaHora; }
}


let listaProfesionales = [];
let listaCitas = [];


function registrarProfesional(profesional) {
    let existe = listaProfesionales.some(p => p.getIdentificacion() === profesional.getIdentificacion());
    if (existe) {
        console.error(`Error: Ya existe un profesional con la identificación ${profesional.getIdentificacion()}`);
        return false;
    }
    listaProfesionales.push(profesional);
    console.log(`Profesional registrado con éxito: ${profesional.getNombre()}`);
    return true;
}

function agendarCita(idCita, idProfesional, paciente, fechaHora) {
    if (!idCita || !idProfesional || !paciente || !fechaHora) {
        console.error("Error: Todos los campos de la cita son obligatorios.");
        return false;
    }

    let profesionalEncontrado = listaProfesionales.find(p => p.getIdentificacion() === idProfesional);
    if (!profesionalEncontrado) {
        console.error(`Error: El profesional con ID ${idProfesional} no existe en el sistema.`);
        return false;
    }

    let citaDuplicada = listaCitas.some(c => c.getIdCita() === idCita);
    if (citaDuplicada) {
        console.error(`Error: Ya existe una cita registrada con el ID ${idCita}.`);
        return false;
    }

   
    let horarioOcupado = listaCitas.some(c => c.getIdProfesional() === idProfesional && c.getFechaHora() === fechaHora);
    if (horarioOcupado) {
        console.error(`Error: El profesional ID ${idProfesional} ya tiene una cita ocupada en el horario ${fechaHora}.`);
        return false;
    }

    let nuevaCita = new CitaMedica(idCita, idProfesional, paciente, fechaHora);
    listaCitas.push(nuevaCita);
    
    console.log(`Cita ${idCita} agendada con éxito para ${paciente} con ${profesionalEncontrado.getNombre()}. Duración: ${profesionalEncontrado.calcularDuracionConsulta()} mins.`);
    return true;
}


console.log("--- REGISTRO DE PROFESIONALES ---");
let med1 = new MedicinaGeneral("P001", "Dra. Laura Pérez", "Mañana");
let esp1 = new Especialista("P002", "Dr. Carlos Gómez", "Tarde", "Cardiología");

registrarProfesional(med1);
registrarProfesional(esp1);

registrarProfesional(new MedicinaGeneral("P001", "Dr. Pepito", "Mañana"));

console.log("--- AGENDAMIENTO DE CITAS ---");

agendarCita("C101", "P001", "Ana María Rojas", "2026-06-10 08:00");

agendarCita("C102", "P001", "Juan Esteban", "2026-06-10 08:30");

agendarCita("C103", "P002", "Carlos Guerrero", "2026-06-10 01:30");

agendarCita("C104", "P999", "Sofía Ruiz", "2026-06-10 09:00");

agendarCita("C105", "P001", "Pedro Infante", "2026-06-10 08:00");

agendarCita("C101", "P002", "Luisa Fernanda", "2026-06-10 14:00");

agendarCita("C101", "P002", "Toby Andres", "");