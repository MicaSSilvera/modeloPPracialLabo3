<?php
require_once("./BACKEND/neumatico.php");

use micaelasilvera\Neumatico;

echo json_encode(Neumatico::traerJSON("./archivos/neumaticos.json"));