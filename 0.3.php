<?php

$query = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='.$_POST["lat"].','.$_POST["lon"].'&radius=1500&type='.rawurlencode($_POST["type"]).'&keyword='.rawurlencode($_POST["name"]).'&key=AIzaSyCiiGMDYKNmN1tSiWbYWg2Yt9Dy73OFmqE';

$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $query);
$html = curl_exec($ch);

$location = $html;

$myfile = fopen("newfile3.json", "w") or die("Unable to open file!");

fwrite($myfile, $location);
fclose($myfile);

$request = array(
    "url" => $query,
    "data" => json_decode($location)
);


header('Content-Type: application/json; charset=utf-8');
echo json_encode($request);
?>
