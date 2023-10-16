<?php
require_once("./Clases/IParte1.php");

interface IParte2 extends IParte1v{

    static function eliminar($patente) : bool;
    function modificar($patente) : bool;
}