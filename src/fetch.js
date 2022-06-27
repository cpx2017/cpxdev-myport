var ul = '';
var added = false;
var reg = 'Loading';


function Flowup() {
     if (Math.floor(Math.random() * 2) == 0) {
          return {
             ul: "https://cpxapiweb2.azurewebsites.net",
             nme: "Worldwide (Zone 2)"
         }
     } else {
          return {
             ul: "https://cpxapiweb.azurewebsites.net",
             nme: "Worldwide (Zone 1)"
         }
     }
}

export default Flowup;
