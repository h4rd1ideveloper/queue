const axios = require("axios"); // package para enviar as requisições

const host = "http://localhost:3000/api/queue?email=h4rd1i@gmail.com&name=yan";

const nReqs = 500; // número de requisições para enviar
const reqs = []; // array para inserir as requisições

// Preparando array de requisições
for (let i = 0; i < nReqs; i++) {
    reqs.push(axios.get(host+"-"+i));
}

// Enviando requisções para a api de forma simultânea.
Promise.all(reqs).then(
    (_) => console.log("SUCESSO! Todas as requisições foram enviadas."),
    (err) => console.log(err)
);