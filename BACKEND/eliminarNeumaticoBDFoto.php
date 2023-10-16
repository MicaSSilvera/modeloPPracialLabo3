<?php
use micaelasilvera\NeumaticoBD;

require_once("./BACKEND/neumaticoBD.php");

$objetoretorno = new stdClass();
$objetoretorno->exito =false;
$objetoretorno->mensaje="";

$json = isset($_POST["neumatico_json"]) ? (string) $_POST["neumatico_json"] : "";

if($json != "")
{
    $objeto = json_decode($json);
    $array = NeumaticoBD :: traer();

    foreach ($array as $elemento) 
    {
        if($elemento->id == $objeto->id)
        {
            if($elemento->foto == null)
            {
                $neumatico = new NeumaticoBD($elemento->marca,$elemento->precio,$elemento->medidas,$elemento->id);
            }
            else
            {
                $neumatico = new NeumaticoBD($elemento->marca,$elemento->precio,$elemento->medidas,$elemento->id,$elemento->foto);
            }
            break;
        }
    }
    
    if(isset($neumatico))
    {
        if(NeumaticoBD :: eliminar($objeto->id))
        {
            $arrayPath = explode("/",$neumatico->getPathFoto());
            if(copy($neumatico->getPathFoto(),"./neumaticosBorrados/". $arrayPath[3]))
            {
                unlink($neumatico->getPathFoto());
                $neumatico->guardarEnArchivo();
                $objetoretorno->mensaje=" Se elimino el neumatico y se paso la foto";
            }
            else
            {
                $objetoretorno->mensaje= "Se elimino el neumatico, no la foto";
            }
        }
        else
        {
            $objetoretorno->mensaje="No se pudo eliminar";
        }
    }
    else
    {
        $objetoretorno->mensaje="No existe el id";
    }
    
}
else
{
    $objetoretorno->mensaje="No recibio parametros";
}

var_dump($objetoretorno);