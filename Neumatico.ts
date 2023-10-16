namespace Entidades{

    export class Neumatico{

        public  _marca : string; 
        public  _medida : string;
        public  _precio : number;
    
        constructor(marca:string, medida:string,precio:number) {

            this._marca = marca;
            this._medida = medida;
            this._precio = precio;
        }
    
        public ToString() : string {

            let cadena :string= '"marca"=' + this._marca + ', "medida"=' + this._medida + 
                                ', "precio"=' + this._precio;
            return cadena;
        }
    
        public ToJSON():JSON {

            let cadena : string = '{' + this.ToString() + '}';
            
            return JSON.parse(cadena);  
        }
    
    }

}
