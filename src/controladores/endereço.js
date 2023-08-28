const { buscarEndereco } = require('utils-playground');
const fs = require('fs/promises');

const buscarEnderecoPeloCep = async (req, res) => {
    const cep = req.params.cep;

    try {
        const endereco = await buscarEndereco(cep);

        const listaDeEnderecos = await fs.readFile('./src/enderecos.json');
        const listaDeEnderecosObj = JSON.parse(listaDeEnderecos);

        for (let i = 0; i < listaDeEnderecosObj.length; i++) {

            if (listaDeEnderecosObj[i].cep === endereco.cep) {

                return res.json(`Este CEP já foi cadastrado. Por gentileza, informe outro.`)

            }

        }

        listaDeEnderecosObj.push(endereco);

        const listaDeEnderecosString = JSON.stringify(listaDeEnderecosObj);
        await fs.writeFile('./src/enderecos.json', listaDeEnderecosString);

        return res.json(endereco);
    } catch (erro) {
        return res.json(`Houve um erro: ${erro.message}`);
    }
}

module.exports = {
    buscarEnderecoPeloCep
}