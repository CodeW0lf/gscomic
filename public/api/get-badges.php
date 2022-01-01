<?php
header("Access-Control-Allow-Origin: *");

$badgeObj = new stdClass();
$badgeObj->newLore = false;
$badgeObj->newCharacters = true;

echo json_encode($badgeObj);