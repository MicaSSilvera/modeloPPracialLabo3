<?php

use micaelasilvera\NeumaticoBD;

require_once("./BACKEMD/neumaticoBD.php");

$tabla = isset($_GET["tabla"]) ? (string) $_GET["tabla"] : "";

if($tabla == "mostrar"){

    $array = NeumaticoBD :: traer();
    
    $tabla ="TABLA<TABLE BORDER><TR><TH>Id</TH> <TH>MARCA</TH> <TH>MEDIDAS</TH> <TH>PRECIO</TH> <TH>PATH FOTO</TH>  <TH>FOTO</TH></TR>";

    foreach($array as $elemento){

        $tabla .='<tr><td>' . $elemento->id .'</td><td>' . $elemento->marca . '</td><td>' . $elemento->medidas .'</td><td>' . $elemento->precio . '</td><td>' .$elemento->foto. '</td><td>' . "<img src=\"$elemento->foto \" width=\"50\" height=\"50\" />". '</td></tr>';
    }
    
    $tabla .= `  </tbody>
    </table>`;
    
    echo $tabla;
}
else{
    echo json_encode(NeumaticoBD :: traer());
}