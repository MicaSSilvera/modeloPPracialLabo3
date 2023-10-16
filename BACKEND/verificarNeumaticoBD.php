
<?php
use micaelasilvera\NeumaticoBD;

require_once("./BACKEND/neumaticoBD.php");

$json = isset($_POST["obj_neumatico"]) ? (string) $_POST["obj_neumatico"] : "";

if($json != "") {

    $objeto = json_decode($json);
    $neumatico = new NeumaticoBD($objeto->marca,4578,$objeto->medidas);

    if($neumatico->existe(NeumaticoBD::traer())){

        var_dump($neumatico->ToJSON());

    } else {

        echo "{}";

    }
    
}