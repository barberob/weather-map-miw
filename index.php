<!DOCTYPE html>
<html lang="fr">
    <head>
        <title> MIW Weather Map - LeNomDeLaTeam </title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="css/style.css">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                 integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
                 crossorigin=""/>
    </head>
    <body>
        <div id="maCarte"></div>

        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
                   integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
                   crossorigin=""
                   type="text/javascript">
        </script>
        <script type="text/javascript" src="js/lib.js"></script>
        <script type="text/javascript" src="js/app.js"></script>

        <script>
            ajax('connect.php', (res) => {
                console.log(JSON.parse(res.response));
            })
        </script>
    </body>
</html>
