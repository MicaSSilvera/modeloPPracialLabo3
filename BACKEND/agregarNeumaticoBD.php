<?php
use micaelasiolvera\NeumaticoBD;

require_once("./BACKEND/neumaticoBD.php");

//CREO EL OBJETO DE RETORNO
$objetoretorno = new stdClass();
$objetoretorno->exito =false;
$objetoretorno->mensaje="";

//OBTENGO LOS DATOS RECIBIDOS POR POST
$marca = isset($_POST["marca"]) ? (string) $_POST["marca"] : "";
$medidas = isset($_POST["medidas"]) ? (string) $_POST["medidas"] : "";
$precio = isset($_POST["precio"]) ? (float) $_POST["precio"] : 0;
$_FILES["foto"]["name"] = "./neumaticos/imagenes/".$marca . date("his") .".png";

//VALIDO QUE RECIBI TODOS LOS DATOS 
if($precio != 0 && $medidas != "" && $marca != "") {

    //CREO EL NUEVO NEUMATICO
    $neumatico = new NeumaticoBD($marca,$precio,$medidas,100,$_FILES["foto"]["name"]);

    //VALIDO QUE EL NEUMATICO NO EXISTA
    if($neumatico->existe(NeumaticoBD::traer())) {

        $objetoretorno->exito =true;
        $objetoretorno->mensaje="El neumatico ya existe";

    } else{

        //AGREGO EL NEUMATICO A LA BASE DE DATOS
        if($neumatico->agregar()){

            //MUEVO EL ARCHIVO DEL TEMPORAL AL PATH CORRESPONDIENTE
            if(move_uploaded_file($_FILES["foto"]["tmp_name"],$_FILES["foto"]["name"]))
            {
                $objetoretorno->mensaje= "se agrego el neumatico y la foto";
                $objetoretorno->exito =true;
            }
            else
            {
                $objetoretorno->mensaje= "se agrego el neumatico pero no la foto";
            }

        }else{

            $objetoretorno->mensaje="El neumatico no ah sido agregado";
        }
    }

}else{

    $objetoretorno->mensaje="No recibio parametros";
}

//RETORNO A TRAVEZ DE UN OBJETO LO SUCEDIDO
var_dump($objetoretorno);