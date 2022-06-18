<?php

function isComicReleased($comicNum, $latest, $releaseTime): bool {
  if ($comicNum <= $latest) {
    return true;
  }
  try {
    $today = new DateTime();
    $numWeeks = $comicNum - $latest;
    $releaseDate = new DateTime();
    $releaseDate->setTimestamp($releaseTime);
    $releaseDate->modify("+$numWeeks weeks");
    if ($today >= $releaseDate) {
      return true;
    }
  } catch (Exception $e) {
    // ignored
  }
  return false;
}
