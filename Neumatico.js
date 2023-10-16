"use strict";
var Entidades;
(function (Entidades) {
    class Neumatico {
        constructor(marca, medida, precio) {
            this._marca = marca;
            this._medida = medida;
            this._precio = precio;
        }
        ToString() {
            let cadena = '"marca"=' + this._marca + ', "medida"=' + this._medida +
                ', "precio"=' + this._precio;
            return cadena;
        }
        ToJSON() {
            let cadena = '{' + this.ToString() + '}';
            return JSON.parse(cadena);
        }
    }
    Entidades.Neumatico = Neumatico;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=Neumatico.js.map