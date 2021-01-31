
<?php

ini_set('xdebug.var_display_max_depth', '10');
ini_set('xdebug.var_display_max_children', '256');
ini_set('xdebug.var_display_max_data', '1024');

include('src/Netatmo/autoload.php');

$config = array();
$config['client_id'] = "5ff429268309d175c32ea399";
$config['client_secret'] = "DzpvTNZf6LlblgDVo5huO1YQyeLEt8NWFVbJOexQe";
$config['scope'] = 'read_station read_thermostat';
$client = new \Netatmo\Clients\NAApiClient($config);

$client->setVariable('username', 'buzzcola73@hotmail.fr');
$client->setVariable('password', 'k9UApbUddbc94u3++');

try
{
    $tokens = $client->getAccessToken();
    $refresh_token = $tokens['refresh_token'];
    $access_token = $tokens['access_token'];
} catch(Netatmo\Exceptions\NAClientException $ex) {
    echo "An error occcured while trying to retrive your tokens \n";
}

try{
    $params = [
        'lat_ne' => $_GET['lat_ne'],
        'lon_ne' => $_GET['lon_ne'],
        'lat_sw' => $_GET['lat_sw'],
        'lon_sw' => $_GET['lon_sw']
    ];
    
    $response = $client->api('getpublicdata', 'GET', $params);
    $response = json_encode($response);
    echo $response;
    
} catch(Netatmo\Exceptions\NAClientException $ex) {
    echo "An error occcured while trying to retrive your tokens \n";
}

?>
