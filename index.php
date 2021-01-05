<?php

require_once('config.php');

if ($GET_['state'] !== 'hoplacbongros') {
    header('Location: https://api.netatmo.com/oauth2/authorize?client_id='. $client_id .'&redirect_uri=http://localhost/weather-map-miw/connected.php&scope='.$scope.'&state='.$state);
} else {
    echo 'connected, code is => ' . $_GET['code'];
}