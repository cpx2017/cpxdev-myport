var ul = '';
var added = false;
var reg = 'Loading';


function Flowup() {
     if (Math.floor(Math.random() * 3) == 1) {
          return {
             ul: "https://cpxapiweb2.azurewebsites.net",
             nme: "Worldwide"
         }
     } else if (Math.floor(Math.random() * 3) == 2) {
          return {
             ul: "https://apiweb.cpxdev.tk",
             nme: "Worldwide"
         }
     } else {
          return {
             ul: "https://cpxapiweb.azurewebsites.net",
             nme: "Worldwide"
         }
     }
}

export default Flowup;
