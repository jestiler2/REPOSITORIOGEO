<?php
require "geo.php";
error_reporting(E_ERROR | E_PARSE);

if (!isset($_POST["lat1"], $_POST["lat2"], $_POST["lon1"], $_POST["lon2"])){
   echo "Faltan parametros...";
   exit();
}

$amenity = array();
$highway = array();
$ways = array();
$json_data = null;

$query= array('https://www.overpass-api.de/api/interpreter?data=[out:json];(node["highway"]('.$_POST["lat1"].','.$_POST["lon1"].','.$_POST["lat2"].','.$_POST["lon2"].');node["amenity"]('.$_POST["lat1"].','.$_POST["lon1"].','.$_POST["lat2"].','.$_POST["lon2"].');node(w)->.x;);out;',
              'https://www.overpass-api.de/api/interpreter?data=[out:json];(way["highway"]('.$_POST["lat1"].','.$_POST["lon1"].','.$_POST["lat2"].','.$_POST["lon2"].');node(w)->.x;);out;');

for ($i = 0; $i < 2; $i++) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $query[$i]);
    $html = curl_exec($ch);

    if ($i == 0) {
        $geojson = Overpass2Geojson::convertNodes($html,false);
        $geojson = json_encode($geojson);
        $decoded_json = json_decode($geojson, false);

        $json_data = $decoded_json->features;

        foreach ($json_data as $data) {
            $props = $data->properties;

            if (!empty($props->amenity)) {
                $temp = $props->amenity;
                array_push($amenity, $temp);
            }
            if (!empty($props->highway)) {
                $temp = $props->highway;
                array_push($highway, $temp);
            }
        }
    } else {
        $geojson = Overpass2Geojson::convertWays($html,false);
        $geojson = json_encode($geojson);
        $decoded_json = json_decode($geojson, false);
        $json_data = $decoded_json->features;

        foreach ($json_data as $data) {
            $props = $data->properties;

            if (!empty($props->highway)) {
                $temp = $props->highway;
                array_push($ways, $temp);
            }
        }
    }
}

$myfile = fopen("newfile.json", "w") or die("Unable to open file!");

fwrite($myfile, json_encode($json_data));
fclose($myfile);

$amenity = array_values(array_unique($amenity));
$highway = array_values(array_unique($highway));
$ways = array_values(array_unique($ways));

$request = array(
    "amenity"=> $amenity,
    "highway"=> $highway,
    "way"=> $ways //,
    // "url"=> $query[0],
    // "data" => $json_data
);

header('Content-Type: application/json; charset=utf-8');
echo json_encode($request);
?>
