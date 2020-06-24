<?php
header("Access-Control-Allow-Origin: http://localhost:8080");
date_default_timezone_set("America/Los_Angeles");

$dir = "../img/sketch_files";
$files = scandir($dir);
$returnArray = array();
foreach ($files as $file) {
  if (is_dir($file)) {
    continue;
  }
  if ($file[0] == '.') {
    continue;
  }
  $returnFile = new stdClass();
  $time = filemtime("../img/sketch_files/" . $file);
  $returnFile->src = $file;
  $returnFile->date = $time;
  $returnArray[] = $returnFile;
}
usort($returnArray, function($a, $b) {
  return $a->date <= $b->date;
});
echo json_encode($returnArray);