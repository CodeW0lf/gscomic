<?php
header("Access-Control-Allow-Origin: *");
date_default_timezone_set("America/Los_Angeles");

const LATEST = 101;
$RELEASE_TIME = mktime(0, 0, 0, 6, 23, 2021);

function isComicReleased($comicNum): bool {
  global $RELEASE_TIME;
  if ($comicNum <= LATEST) {
    return true;
  }
  try {
    $today = new DateTime();
    $numWeeks = $comicNum - LATEST;
    $releaseDate = new DateTime();
    $releaseDate->setTimestamp($RELEASE_TIME);
    $releaseDate->modify("+$numWeeks weeks");
    if ($today >= $releaseDate) {
      return true;
    }
  } catch (Exception $e) {
    // ignored
  }
  return false;
}

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
$returnObj->chapters = [0, 18, 39, 56, 72, 88, 98];
echo json_encode($returnObj);