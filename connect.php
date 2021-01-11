<?php

ini_set('xdebug.var_display_max_depth', '10');
ini_set('xdebug.var_display_max_children', '256');
ini_set('xdebug.var_display_max_data', '1024');

include('src/netatmo/autoload.php');

$config=array();
$config['client_id']="5ff429268309d175c32ea399";
$config['client_secret']="DzpvTNZf6LlblgDVo5huO1YQyeLEt8NWFVbJOexQe";
$config['scope']='read_station read_thermostat';
$client=new \Netatmo\Clients\NAApiClient($config);

$client->setVariable('username', 'buzzcola73@hotmail.fr');
$client->setVariable('password', 'k9UApbUddbc94u3++');
try
{
    $tokens = $client->getAccessToken();
    $refresh_token = $tokens['refresh_token'];
    $access_token = $tokens['access_token'];
}



catch(Netatmo\Exceptions\NAClientException $ex)
{
    echo "An error occcured while trying to retrive your tokens \n";
}

try{
    $params = [
        'lat_ne' => '50.8838492',
        'lon_ne' => '8.0209591',
        'lat_sw' => '42.5999',
        'lon_sw' => '-5.57175'

    ];
    $response = $client->api('getpublicdata','GET',$params);
    $response = json_encode($response);
}

catch(Netatmo\Exceptions\NAClientException $ex)
{
    echo "An error occcured while trying to retrive your tokens \n";
}

?>
