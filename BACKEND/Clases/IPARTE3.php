<?php
require_once("./Clases/IParte2.php");

interface IParte3 extends IParte2
{
    function existe($array) : bool;
}