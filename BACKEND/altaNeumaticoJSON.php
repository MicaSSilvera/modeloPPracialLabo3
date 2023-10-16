<?php
require_once("./BACKEND/neumatico.php");

use mauroRacioppi\Neumatico;

//OBTENGO LOS DATOS RECIVIDOS POR POST
$marca = isset($_POST["marca"]) ? (string) $_POST["marca"] : "";
$medidas = isset($_POST["medidas"]) ? (string) $_POST["medidas"] : "";
$precio = isset($_POST["precio"]) ? (float) $_POST["precio"] : 0;

//VALIDO QUE RECIBI TODOS LOS DATOS IMPORTANTES
if($precio != 0 && $medidas != "" && $marca != "")
{
    //CREO EL NUEVO NEUMATICO
    $neumatico = new Neumatico($marca,$precio,$medidas);

    //GUARDO EL NEUMATICO EN EL JSON
    echo $neumatico->guardarJSON("./archivos/neumaticos.json");
}