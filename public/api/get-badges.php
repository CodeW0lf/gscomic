<?php
header("Access-Control-Allow-Origin: http://localhost:8080");

$badgeObj = new stdClass();
$badgeObj->newLore = true;

echo json_encode($badgeObj);