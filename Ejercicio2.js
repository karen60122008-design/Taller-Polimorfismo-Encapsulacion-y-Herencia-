class Producto {
    #identificador;
    #nombre;
    #precio;

    constructor(identificador, nombre, precio) {
        this.#identificador = identificador;
        this.#nombre = nombre;
        this.#precio = precio;
    }

    getIdentificador() {
        return this.#identificador;
    }
    getNombre() {
        return this.#nombre;
    }
    getPrecio() {
        return this.#precio;
    }

    calcularCostoFinal() {
        return this.#precio;
    }
}

class ProductoFisico extends Producto {
    #costoEnvio;

    constructor(identificador, nombre, precio, costoEnvio) {
        super(identificador, nombre, precio);
        this.#costoEnvio = costoEnvio;
    }

    getCostoEnvio() {
        return this.#costoEnvio;
    }

    calcularCostoFinal() {
        return this.getPrecio() + this.#costoEnvio;
    }
}

class ProductoDigital extends Producto {
    #descuentoPromo;

    constructor(identificador, nombre, precio, descuentoPromo) {
        super(identificador, nombre, precio);
        this.#descuentoPromo = descuentoPromo;
    }

    getDescuentoPromo() {
        return this.#descuentoPromo;
    }

    calcularCostoFinal() {
        return this.getPrecio() - (this.getPrecio() * this.#descuentoPromo);
    }
}

class CarritoCompras {
    #catalogo;
    #carrito;

    constructor() {
        this.#catalogo = [];
        this.#carrito = [];
    }

    registrarProductoCatalogo(producto) {
        if (producto.getPrecio() < 0) {
            console.error(`Error: El producto ${producto.getIdentificador()} no puede tener un precio negativo.`);
            return false;
        }

        let existe = this.#catalogo.some(p => p.getIdentificador() === producto.getIdentificador());
        if (existe) {
            console.error(`Error: Ya existe un producto en el catálogo con el identificador ${producto.getIdentificador()}.`);
            return false;
        }

        this.#catalogo.push(producto);
        console.log(`Producto registrado en catálogo: ${producto.getNombre()}`);
        return true;
    }

    agregarAlCarrito(identificador, cantidad) {
        if (cantidad <= 0) {
            console.error(`Error: La cantidad a agregar (${cantidad}) debe ser mayor a cero.`);
            return false;
        }

        let productoEncontrado = this.#catalogo.find(p => p.getIdentificador() === identificador);

        if (!productoEncontrado) {
            console.error(`Error: El producto con identificador ${identificador} no existe en el catálogo.`);
            return false;
        }

        let costoUnitario = productoEncontrado.calcularCostoFinal();

        let itemCarrito = {
            identificador: productoEncontrado.getIdentificador(),
            nombre: productoEncontrado.getNombre(),
            cantidad: cantidad,
            costoUnitario: costoUnitario,
            subtotal: costoUnitario * cantidad
        };

        this.#carrito.push(itemCarrito);
        console.log(`¡Agregado al carrito! ${cantidad} x ${productoEncontrado.getNombre()} | Subtotal: $${itemCarrito.subtotal}`);
        return true;
    }

    quitarDelCarrito(identificador) {
        let index = this.#carrito.findIndex(item => item.identificador === identificador);

        if (index === -1) {
            console.error(`Error: El producto con identificador ${identificador} no se encuentra en el carrito.`);
            return false;
        }

        let eliminado = this.#carrito.splice(index, 1);
        console.log(`¡Eliminado del carrito! Producto: ${eliminado[0].nombre}`);
        return true;
    }

    calcularTotal() {
        let total = this.#carrito.reduce((acumulador, item) => acumulador + item.subtotal, 0);
        console.log(`--- TOTAL A PAGAR EN EL CARRITO: $${total} ---`);
        return total;
    }
}

let miTienda = new CarritoCompras();

console.log("--- 1. REGISTRO DE PRODUCTOS EN CATÁLOGO ---");
let prod1 = new ProductoFisico("P001", "Laptop Gamer", 3000000, 25000);
let prod2 = new ProductoDigital("P002", "Licencia Antivirus", 100000, 0.15);

miTienda.registrarProductoCatalogo(prod1);
miTienda.registrarProductoCatalogo(prod2);

miTienda.registrarProductoCatalogo(new ProductoFisico("P001", "Duplicado", 50000, 5000));
miTienda.registrarProductoCatalogo(new ProductoDigital("P003", "Precio Negativo", -5000, 0));

console.log("\n--- 2. OPERACIONES EN EL CARRITO ---");
miTienda.agregarAlCarrito("P001", 1);
miTienda.agregarAlCarrito("P002", 2);

miTienda.agregarAlCarrito("P001", 0);
miTienda.agregarAlCarrito("X999", 1);

miTienda.calcularTotal();

console.log("\n--- 3. ELIMINACIÓN DE PRODUCTOS ---");
miTienda.quitarDelCarrito("P002");
miTienda.quitarDelCarrito("P002");
miTienda.calcularTotal();