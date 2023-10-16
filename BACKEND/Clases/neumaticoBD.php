<?php
namespace micaelasilvera
{
    use AccesoDatos;
    use IParte4;
    use PDO;
    use stdClass;
    require_once("./Clases/baseDeDatos.php");
    require_once("./Clases/neumatico.php");
    
    class NeumaticoBD extends Neumatico 
    {
        protected int $_id;
        protected string $_pathFoto;
        
        function getPathFoto()
        {
            return $this->_pathFoto;
        }
        function getID()
        {
            return $this->_id;
        }

        function __construct(string $marca = "", float $precio= 0, string $medida= "", int $id= -1, string $pathsFoto= "")
        {
            parent :: __construct($marca,$precio,$medida);
            $this->_id = $id;
            $this->_pathFoto = $pathsFoto;
        }
    
        function ToJSON() : string
        { 
            $objeto = new stdClass();

            $objeto->precio = $this->_precio;
            $objeto->marca = $this->_marca;
            $objeto->medidas = $this->_medidias;
            $objeto->id = $this->_id;
            $objeto->pathsFoto = $this->_pathFoto;
            
            return json_encode($objeto);
        }

        static function traer() : array
        {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
            $consulta = $objetoAccesoDato->retornarConsulta("SELECT * FROM neumaticos");        
            
            $consulta->execute();                                                

            return $consulta->fetchAll(PDO::FETCH_OBJ) ; 
        }

        function agregar() : bool
        {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
            $consulta =$objetoAccesoDato->retornarConsulta("INSERT INTO neumaticos (id, marca, medidas, precio, foto)"
                                                        . "VALUES(:id, :marca, :medidas, :precio, :foto)");     
            if($this->_id == -1)
            {
                $this->_id = 1000+rand(0,1000);
            }                      
            $consulta->bindValue(':id', $this->_id, PDO::PARAM_INT);
            $consulta->bindValue(':marca', $this->_marca, PDO::PARAM_STR);
            $consulta->bindValue(':medidas', $this->_medidias, PDO::PARAM_STR);
            $consulta->bindValue(':precio', $this->_precio, PDO::PARAM_STR);
            if($this->_pathFoto == "")
            {
                $consulta->bindValue(':foto', null, PDO::PARAM_NULL);
            }
            else
            {
                $consulta->bindValue(':foto', $this->_pathFoto, PDO::PARAM_STR);
            }                     

            $consulta->execute();  
            
            return true;
        }

        static function eliminar($id) : bool
        {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
            $retorno = false;
            $consulta =$objetoAccesoDato->retornarConsulta("DELETE FROM neumaticos WHERE id = :id");
            
            if($consulta != false)
            {
                $retorno =true;
                $consulta->bindValue(':id', $id, PDO::PARAM_INT);
                $consulta->execute();
            }

            return $retorno;
        }

        function modificar($id) : bool
        {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
            $retorno = false;
            $consulta =$objetoAccesoDato->retornarConsulta("UPDATE neumaticos SET marca = :marca, 
                                                            medidas = :medidas, precio = :precio, foto = :foto WHERE id = :id");
            
            if($consulta != false)
            {
                $consulta->bindValue(':id', $id, PDO::PARAM_INT);
                $consulta->bindValue(':marca', $this->_marca, PDO::PARAM_STR);
                $consulta->bindValue(':medidas', $this->_medidias, PDO::PARAM_STR);
                $consulta->bindValue(':precio', $this->_precio, PDO::PARAM_INT);
                if($this->_pathFoto == "")
                {
                    $consulta->bindValue(':foto', null, PDO::PARAM_NULL);
                }
                else
                {
                    $consulta->bindValue(':foto', $this->_pathFoto, PDO::PARAM_STR);
                }                     
    
                $retorno =true;
                $consulta->execute();
            }
            
            return $retorno;
        }

        function existe($array) : bool
        {
            $retorno = false;
            foreach ($array as $elemento) 
            {
                if($elemento->marca == $this->_marca && $elemento->medidas  == $this->_medidias)
                {
                    $retorno = true;
                    break;
                }
            }

            return $retorno;
        }

        function guardarEnArchivo()
        {
            $retorno = false;
            $archivo = fopen("./archivos/neumaticosbd_borrados.txt","a");
           
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

        static function mostrarBorradosJSON()
        {
            $array = array();
            $ar = fopen("./archivos/neumaticosbd_borrados.txt", "r");
    
            while(!feof($ar))
            {
                $linea = fgets($ar);
                $linea = trim($linea);
                if($linea != "")
                {
                    array_push($array,$linea);
                }
            }
    
            fclose($ar);
            return  $array;
        }

        static function mostrarModificados()
        {
           
        }
    }
}