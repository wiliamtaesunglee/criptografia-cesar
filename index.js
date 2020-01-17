const fetch = require('node-fetch');
const fs = require('fs');
const sha1 = require('js-sha1');
const FormData = require('form-data');

const form = new FormData();

const token = '512fc2dbee90b61b4b5a05015b3f19d56b4b6a42'

fetch(`https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=${token}`)
  .then(
    response => {
      if (response.status !== 200) {
        console.log(response.status);
        return;
      }

      //Passing Data catched from the api requst
      response.json().then(function(data) {

      //Desencrip the data recived
      let cript = data.cifrado
      let ref = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z".toLowerCase().split(' ')
      let indice = data.numero_casas;

      let response = []

      for(let i = 0; i < cript.length; i++) {

        if(/\W/.test(cript[i])) response.push(cript[i]);
        ref.forEach((element, index) => {
         if(element === cript[i] && index - indice >= 0) response.push(ref[index - indice]);
         if(element === cript[i] && index - indice < 0) response.push(ref[index - indice + 26]);
        })
      };

      let newResponse = response.join('');
      data.decifrado = sha1(newResponse);
      console.log(data);

      //Create a new file
      let newData = JSON.stringify(data)
      fs.writeFile('answer.json', newData, (err) => {
       err ? console.log(err) : console.log('saved');
      });



      /*async function postData(url = `https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=${token}`, data = {}) {
      // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data) // body data type must match "Content-Type" header
          });
          return await response.json(); // parses JSON response into native JavaScript objects
          }*/

      //post data





      //post data


      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

