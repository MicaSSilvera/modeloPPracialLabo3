"use strict";
/// <reference path="./Neumatico.ts"/>
var Entidades;
(function (Entidades) {
    class NeumaticoBD extends Entidades.Neumatico {
        constructor(marca, medida, precio, id, pathFoto) {
            super(marca, medida, precio);
            this._id = id;
            this._pathFoto = pathFoto;
        }
        ToJSON() {
            let cadena = '{"id"=' + this._id + ', "pathFoto"=' + this._pathFoto + ', ' + super.ToString() + '}';
            return JSON.parse(cadena);
        }
    }
    Entidades.NeumaticoBD = NeumaticoBD;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=NeumaticoBD.js.map