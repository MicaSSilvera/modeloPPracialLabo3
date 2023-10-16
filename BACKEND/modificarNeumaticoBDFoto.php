<?php
use micaelasilvera\NeumaticoBD;

require_once("./BACKEND/neumaticoBD.php");

//CREO EL OBJETO DE RETORNO
$objetoretorno = new stdClass();
$objetoretorno->exito =false;
$objetoretorno->mensaje="";

//RECIBO LOS DATO MEDIANTE POST
$json = isset($_POST["neumatico_json"]) ? (string) $_POST["neumatico_json"] : "";


if($json != ""){

    $objeto = json_decode($json);
    
    //CREO EL NUEVO PATH DEL FILE QUE ME LLEGO
    $_FILES["foto"]["name"] = "./neumaticos/imagenes/".$objeto->marca . date("his") .".png";

    //BUSCO EL ID QUE ME LLEGO DEL JSON EN LA BASE DE DATOS
    $array = NeumaticoBD :: traer();

    foreach ($array as $elemento) {

        if($elemento->id == $objeto->id)
        {
            if($elemento->foto == null)
            {
                $neumaticoViejo = new NeumaticoBD($elemento->marca,$elemento->precio,$elemento->medidas,$elemento->id);

            }else{
                $neumaticoViejo = new NeumaticoBD($elemento->marca,$elemento->precio,$elemento->medidas,$elemento->id,$elemento->foto);
                
            }
            break;
        }
    }

    //VERIFICO QUE EXISTA UN NEUMATICO CON EL ID
    if(isset($neumaticoViejo))
    {
        //CREO EL NUEVO NEUMATICO
        $neumatico = new NeumaticoBD($objeto->marca,$objeto->precio,$objeto->medidas,$objeto->id,$_FILES["foto"]["name"]);

        //MODIFICO LA BASE DE DATOS
        if($neumatico->modificar($objeto->id))
        {

            //MUEVO EL ARCHIVO DEL TEMPORAL AL PATH QUE LE CORRESPONDE
            if(move_uploaded_file($_FILES["foto"]["tmp_name"],$_FILES["foto"]["name"]))
            {
                //VALIDO SI EL VIEJO NEUMATICO TENIA UNA FOTO GUARDADA
                if($neumaticoViejo->getPathFoto() !="")
                {
                    //CREO EL NUEVO PATH DONDE GUARDARE LA FOTO DEL NEUMATICO ANTERIOR
                    $nuevoPath = "./neumaticosModificados/". $neumaticoViejo->getID().".".$neumaticoViejo->_marca.".modificado.".date("his").".png";
                    
                    //PASO LA FOTO DEL NEUMATICO ANTERIOR AL NUEVO PATH
                    if(copy($neumaticoViejo->getPathFoto(), $nuevoPath))
                    {

                        //DESVINCULO LA FOTO VIEJA DEL NEUMATICO
                        if(unlink($neumaticoViejo->getPathFoto()))
                        {
                            $objetoretorno->exito =true;
                            $objetoretorno->mensaje= "Todo ah sido exitoso";
                        }
                        else
                        {
                            $objetoretorno->mensaje= "se modifico y se paso la foto pero no se elimino del directorio anterior";
                        }
                       
                    }
                    else
                    {
                        $objetoretorno->mensaje= "se modifico pero no se paso la foto";
                    }
                }
                else
                {
                    $objetoretorno->exito =true;
                    $objetoretorno->mensaje= "Se modifico el neumatico. El neumatico anterior no contenia foto";
                }
            }
            else
            {
                $objetoretorno->mensaje= "se modifico la base pero no se guardo al foto en el directorio";
            }
        }
        else
        {
            $objetoretorno->mensaje="no se pudo modificar el neumatico";
        }
    }
    else
    {
        $objetoretorno->mensaje="No existe un neumatico con ese id";
    }
}
else
{
    $objetoretorno->mensaje="No recibio parametros";
}

//DEVUEVLO UN OBJETO QUE DIRA LO ACONTESIDO
var_dump($objetoretorno);