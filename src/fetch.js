var ul = '';
var added = false;
var reg = 'Loading';

ul = "https://apiweb.cpxdev.tk";
reg = "Worldwide"


async function Flowup() {
     const response = await fetch(ul + '/home/status', {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
  });
    if (response.text() == "OK") {
        return {
        ul: ul,
        nme: reg
    }
    } else {
         return {
            ul: "https://cpxapiweb.somee.com",
            nme: reg
        }
    }
        
    
}

export default Flowup;
