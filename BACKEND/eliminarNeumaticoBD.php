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
    $neumatico = new NeumaticoBD($objeto->marca,$objeto->precio,$objeto->medidas);

    if(NeumaticoBD :: eliminar($objeto->id)){

        $objetoretorno->mensaje= $neumatico->guardarJSON("./archivos/neumaticos.json");
        $objetoretorno->exito =true;

    } else{
        $objetoretorno->mensaje="No se pudo eliminar";
    }
    
}else{
    $objetoretorno->mensaje="No recibio parametros";
}

var_dump($objetoretorno);