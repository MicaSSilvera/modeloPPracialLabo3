<?php

use micaelasilvera\NeumaticoBD;

require_once("./BACKEND/neumaticoBD.php");

//CREO EL OBJETO DE RETORNO
$objetoretorno = new stdClass();
$objetoretorno->exito =false;
$objetoretorno->mensaje="";

//OBTENGO LOS DATOS RECIBIDOS POR POST
$json = isset($_POST["neumatico_json"]) ? (string) $_POST["neumatico_json"] : "";

//VALIDO QUE RECIBI BIEN LOS DATOS
if($json != ""){

    //DECODIFICO EL JSON RECIBIDO POR POST
    $objeto = json_decode($json);

    //CREO EL NUEVO NEUMATICO
    $neumatico = new NeumaticoBD($objeto->marca,$objeto->precio,$objeto->medidas);

    //AGREGO EL NEUMATICO
    if($neumatico->agregar()){
        
        $objetoretorno->mensaje= "se agrego el neumatico";
        $objetoretorno->exito =true;

    }else{

        $objetoretorno->mensaje="El neumatico no ah sido agregado";
    }
}
else{

    $objetoretorno->mensaje="No recibio parametros";
}

//RETORNO A TRAVEZ DE UN OBJETO LO SUCEDIDO
var_dump($objetoretorno);