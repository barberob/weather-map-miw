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
        <link rel="stylesheet" type="text/css" href="css/marker_group.css">
         <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    </head>
    <body>
        <form class="saisie">
            <input type="text" class="form-control" name="adresse" id="adresse" list="adresses" placeholder="Saisissez une adresse">
            <datalist id="adresses"></datalist>

            <!-- <input type="submit" class="btn btn-info send" name="envoyer" id="envoyer" value="Envoyer" onclick="req()"> -->

            <button type="submit" class="btn btn-info send" name="envoyer" id="envoyer" onclick="req()">
                Envoyer <img src="images/astronaut.svg" width="24" height="24">
            </button>
        </form>

        <div class="infoMap">
            <div id="maCarte"></div>
            
            <table class="table">
                <thead align="center">
                    <tr>
                      <th scope="col"> Donnée </th>
                      <th scope="col"> Moyenne de l'aperçu </th>
                    </tr>
                </thead>

                <tbody align="center">
                    <tr class="table-info">
                      <th scope="row"> Température </th>
                      <td></td>
                    </tr>

                    <tr class="table-info">
                      <th scope="row"> Humidité </th>
                      <td></td>
                    </tr>

                    <tr class="table-info">
                      <th scope="row"> Pression </th>
                      <td></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- <div class="copyright"> © Benoît Barberot et Théo Meozzi </div> -->

        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
                   integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
                   crossorigin=""
                   type="text/javascript">
        </script>
        <script src="js/marker_group.js"></script>
        <script type="text/javascript" src="js/lib.js"></script>
        <script type="text/javascript" src="js/app.js"></script>
    </body>
</html>
