<?php

require_once('config.php');

$code = $_GET['code'];

$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://api.netatmo.com/oauth2/token",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "grant_type=".$grant_type."&client_id=".$client_id."&client_secret=".$client_secret."&code=".$code."&redirect_uri=http%3A%2F%2Flocalhost%2Fmap.php&scope=".$scope,
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
  echo $response;
}
