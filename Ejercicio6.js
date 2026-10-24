class RecursoBiblioteca {
    #codigo;
    #titulo;
    #disponibilidad;

    constructor(codigo, titulo) {
        this.#codigo = codigo;
        this.#titulo = titulo;
        this.#disponibilidad = true;
    }

    getCodigo() {
        return this.#codigo;
    }
    getTitulo() {
        return this.#titulo;
    }
    isDisponible() {
        return this.#disponibilidad;
    }

    setDisponibilidad(estado) {
        this.#disponibilidad = estado;
    }

    calcularPlazoPrestamo() {
        return 0;
    }
}

class LibroImpreso extends RecursoBiblioteca {
    #autor;

    constructor(codigo, titulo, autor) {
        super(codigo, titulo);
        this.#autor = autor;
    }

    getAutor() {
        return this.#autor;
    }

    calcularPlazoPrestamo() {
        return 15;
    }
}

class RecursoDigital extends RecursoBiblioteca {
    #formato;

    constructor(codigo, titulo, formato) {
        super(codigo, titulo);
        this.#formato = formato;
    }

    getFormato() {
        return this.#formato;
    }

    calcularPlazoPrestamo() {
        return 7;
    }
}

let recursos = [];
let prestamos = [];

function registrarRecurso(recurso) {
    let existe = recursos.some(r => r.getCodigo() === recurso.getCodigo());
    if (existe) {
        console.error(`Error: Ya existe un recurso con el código ${recurso.getCodigo()}`);
        return false;
    }
    recursos.push(recurso);
    console.log(`Recurso registrado con éxito: ${recurso.getTitulo()}`);
    return true;
}

function prestarRecurso(codigo) {
    let recurso = recursos.find(r => r.getCodigo() === codigo);

    if (!recurso) {
        console.error(`Error: El recurso con código ${codigo} no fue encontrado.`);
        return false;
    }

    if (!recurso.isDisponible()) {
        console.error(`Error: El recurso "${recurso.getTitulo()}" ya se encuentra prestado.`);
        return false;
    }

    recurso.setDisponibilidad(false);
    prestamos.push({
        codigo: codigo,
        titulo: recurso.getTitulo(),
        plazo: recurso.calcularPlazoPrestamo()
    });

    console.log(`¡Préstamo exitoso! "${recurso.getTitulo()}" ha sido prestado por ${recurso.calcularPlazoPrestamo()} días.`);
    return true;
}

function devolverRecurso(codigo) {
    let recurso = recursos.find(r => r.getCodigo() === codigo);

    if (!recurso) {
        console.error(`Error: El código ${codigo} no corresponde a ningún recurso del sistema.`);
        return false;
    }

    if (recurso.isDisponible()) {
        console.error(`Error: El recurso "${recurso.getTitulo()}" no puede ser devuelto porque no estaba prestado.`);
        return false;
    }

    recurso.setDisponibilidad(true);
    console.log(`¡Devolución exitosa! El recurso "${recurso.getTitulo()}" está nuevamente disponible.`);
    return true;
}

console.log("--- 1. REGISTRO DE RECURSOS ---");
let lib1 = new LibroImpreso("L001", "Cien Años de Soledad", "Gabriel García Márquez");
let dig1 = new RecursoDigital("D001", "JavaScript Avanzado", "PDF");

registrarRecurso(lib1);
registrarRecurso(dig1);
registrarRecurso(new LibroImpreso("L001", "Libro Repetido", "Autor X"));

console.log("\n--- 2. PRUEBAS DE PRÉSTAMOS ---");
prestarRecurso("L001");
prestarRecurso("D001");
prestarRecurso("L001");
prestarRecurso("X999");

console.log("\n--- 3. PRUEBAS DE DEVOLUCIONES ---");
devolverRecurso("L001");
devolverRecurso("L001");