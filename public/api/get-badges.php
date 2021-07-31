<?php
header("Access-Control-Allow-Origin: http://localhost:8080");

$badgeObj = new stdClass();
$badgeObj->newLore = false;
$badgeObj->newCharacters = true;

echo json_encode($badgeObj);