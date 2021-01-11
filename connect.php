<?php

require_once('config.php');

$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://api.netatmo.com/oauth2/token",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "grant_type=".$grant_type."&client_id=".$client_id."&client_secret=".$client_secret."&username=".$username."&password=".$password,
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/x-www-form-urlencoded;charset=UTF-8",
    "Host: api.netatmo.com"
  ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  $response = json_decode($response);
  // echo '<pre>';
  // var_dump($response->access_token);
  // echo '</pre>';
  // die();
  header('Location: map.php?token='.$response->access_token);
}