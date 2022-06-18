<?php

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
