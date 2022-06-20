
async function Latency(url) {
    var Ms = 0
    var InTErval = setInterval(function(){ 
        Ms += 1
     }, 1);
    await fetch(url, {
        method: 'GET', // or 'PUT'
        })
        .then(data => {
            clearInterval(InTErval)
        })
        .catch((error) => {
            clearInterval(InTErval)
    });
    return Ms
}

export default Latency;