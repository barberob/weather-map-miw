let datalist = __('#adresses');

function req()
{
  // Création d'une instance de la classe XMLHttpRequest

  let req = Xhr();

  req.onreadystatechange = function()
  {
    if(this.readyState==this.DONE)
    {
      let reponse = JSON.parse(this.responseText);

      console.log(reponse);

      /*alert(reponse.features.length);*/

      datalist.innerHTML = "";

      for(let i=0; i<reponse.features.length; i++)
      {
        /*console.log(reponse.features[i].properties.label);*/
        createEl("option", {value:reponse.features[i].properties.label}, "", datalist);
      }

      __('#adresse').setAttribute('list', '');
      __('#adresse').setAttribute('list', 'adresses');
    }
  };

  // Récupération des infos de la ville en mode asynchrone

  req.open("GET", "https://api-adresse.data.gouv.fr/search/?q="+__('#adresse').value, true); // true pour asynchrone

  req.send(null);
}

__('#adresse').addEventListener("input", function(e){req();}, false);