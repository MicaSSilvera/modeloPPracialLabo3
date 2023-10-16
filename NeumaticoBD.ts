
/// <reference path="./Neumatico.ts"/>

namespace Entidades{

    export class NeumaticoBD extends Neumatico{

        public  _id : number;
        public  _pathFoto : string; 

        constructor(marca:string, medida:string,precio:number, id:number, pathFoto : string) {

            super(marca,medida,precio);
            this._id = id;
            this._pathFoto = pathFoto;
        }

        public ToJSON():JSON {

            let cadena : string = '{"id"=' + this._id+ ', "pathFoto"=' + this._pathFoto + ', ' + super.ToString() + '}';
            
            return JSON.parse(cadena);  

        }
    }
}