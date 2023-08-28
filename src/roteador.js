const express = require('express');
const endereco = require('./controladores/endereço');
const rota = express();

rota.get('/enderecos/:cep', endereco.buscarEnderecoPeloCep);

module.exports = rota;