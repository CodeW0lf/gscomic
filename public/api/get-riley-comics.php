<?php
header("Access-Control-Allow-Origin: *");
date_default_timezone_set("America/Phoenix");

require_once "shared/comic-util.php";

$version = $_GET["version"] ?? "a";
$fileSuffix = "a";

if ($version != "a") {
  $fileSuffix = "b";
}

const LATEST = 10;
$RELEASE_TIME = mktime(0, 0, 0, 9, 28, 2022);

$dir = "../img/riley_comics";
$files = scandir($dir);
$returnObj = new stdClass();
$returnObj->comics = new stdClass();
$latest = 1;
foreach ($files as $file) {
  $isMatch = preg_match("/Page_0*(\d+)[$fileSuffix]\.(jpg|png)/", $file, $matches);
  if ($isMatch) {
    $val = $matches[1];
    if (!isComicReleased($val, LATEST, $RELEASE_TIME)) {
      continue;
    }
    $returnObj->comics->$val = $file;
    if ($matches[1] > $latest) {
      $latest = $matches[1];
    }
  }
}
$returnObj->latest = $latest;
$returnObj->chapters = [];
echo json_encode($returnObj);
