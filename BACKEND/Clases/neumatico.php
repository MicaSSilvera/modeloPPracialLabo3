<?php
namespace micaelasilvera
{
    use stdClass;
    
    class Neumatico
    {
        public float $_precio;
        public string $_marca;
        public string $_medidias;
        
        function __construct(string $marca, float $precio, string $medida)
        {
            $this->_precio = $precio;
            $this->_marca = $marca;
            $this->_medidias = $medida;
        }
    
        function ToJSON() : string
        { 
            $objeto = new stdClass();
            $objeto->precio = $this->_precio;
            $objeto->marca = $this->_marca;
            $objeto->medidas = $this->_medidias;
            
            return json_encode($objeto);
        }

        function guardarJSON(string $path): string
        {
            $retorno = false;
            $archivo = fopen($path,"a");
           
            if($archivo != false)
            {
                if(fwrite($archivo, $this->ToJSON()."\r\n") != false)
                {
                    $retorno = true;
                    $mensaje = "escritura exitosa";
                }
                else
                {
                    $mensaje = "No se pudo escribir en el archivo";
                }
                fclose($archivo);
            }
            else
            {
                $mensaje = "No se pudo abrir el archivo";
            }
    
            $objeto = new stdClass();
            
            $objeto->bool = $retorno;
            $objeto->mensaje = $mensaje;
    
            return json_encode($objeto);
        }


        static function traerJSON(string $path) : array
        {
            $array = array();
            $ar = fopen($path, "r");
    
            while(!feof($ar))
            {
                $linea = fgets($ar);
                $linea = trim($linea);
                if($linea != "")
                {
                    $objeto = json_decode($linea);
                    array_push($array, new Neumatico($objeto->marca,$objeto->precio,$objeto->medidas));
                }
            }
    
            fclose($ar);
            return  $array;
        }   

        static function verificarNeumaticoJSON(Neumatico $neumatico,string $path)
        {
            $objetoRetorno = new stdClass();
            $objetoRetorno->exito = false;
            $objetoRetorno->mensaje ="No se encontro al neumatico";

            $array = Neumatico :: traerJSON($path);

            if($array != null)
            {
                for($i =0;$i<count($array);$i++)
                if($array[$i]->_marca == $neumatico->_marca && $array[$i]->_medidias == $neumatico->_medidias)
                {
                    $array[$i]->_precio += $neumatico->_precio;

                    $objetoRetorno->mensaje =  $array[$i]->_precio + $neumatico->_precio;
                    $objetoRetorno->exito = true;
                    break;
                }
            }
            
            return  $objetoRetorno;
        }   
    }
}//fin namespace