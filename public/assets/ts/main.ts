import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import $ from 'jquery';
import axios from 'axios';

$(document).ready(() => {
    console.log("Página carregada com sucesso!");
});

axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then((response: any) => {
        console.log('Dados recebidos:', response.data);
    })
    .catch((error: any) => {
        console.error('Erro na requisição:', error);
    });
