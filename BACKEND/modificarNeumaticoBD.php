<?php
use micaelasilvera\NeumaticoBD;

require_once("./BACKEND/neumaticoBD.php");

$objetoretorno = new stdClass();
$objetoretorno->exito =false;
$objetoretorno->mensaje="";

$json = isset($_POST["neumatico_json"]) ? (string) $_POST["neumatico_json"] : "";

if($json != ""){

    $objeto = json_decode($json);
    $neumatico = new NeumaticoBD($objeto->marca,$objeto->precio,$objeto->medidas,$objeto->id);

    if($neumatico->modificar($objeto->id)){

        $objetoretorno->exito =true;
        $objetoretorno->mensaje="El neumatico ah sido modificado";
    }else{
        $objetoretorno->mensaje="El neumatico no ah sido modificado";
    }
}
else
{
    $objetoretorno->mensaje="No recibio parametros";
}

echo json_encode($objetoretorno);