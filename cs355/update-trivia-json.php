<?php
  $newData = file_get_contents('php://input');

  // Read the existing data from the file
  $existingData = file_get_contents('triviaQuestions.json');
  
  // Decode the JSON data into a PHP array
  $existingArray = json_decode($existingData, true);
  
  // Decode the new data into a PHP array
  $newArray = json_decode($newData, true);
  
  // Merge the existing and new arrays
  $mergedArray = array_merge($existingArray, $newArray);
  
  // Encode the merged array into JSON
  $mergedJson = json_encode($newArray);
  
  // Write the updated JSON data to the file
  file_put_contents('triviaQuestions.json', $mergedJson);
?>