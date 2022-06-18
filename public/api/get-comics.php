<?php
header("Access-Control-Allow-Origin: *");
date_default_timezone_set("America/Los_Angeles");

require_once "shared/comic-util.php";

const LATEST = 141;
$RELEASE_TIME = mktime(0, 0, 0, 6, 15, 2022);

$dir = "../img/comics";
$files = scandir($dir);
$returnObj = new stdClass();
$returnObj->comics = new stdClass();
$latest = 1;
foreach ($files as $file) {
  $isMatch = preg_match("/Page_0*(\d+)\.(jpg|png)/", $file, $matches);
  if ($isMatch) {
    $val = $matches[1];
    if (!isComicReleased($val)) {
      continue;
    }
    $returnObj->comics->$val = $file;
    if ($matches[1] > $latest) {
      $latest = $matches[1];
    }
  }
}
$returnObj->latest = $latest;
$returnObj->chapters = [0, 18, 39, 56, 72, 88, 98, 120];
echo json_encode($returnObj);