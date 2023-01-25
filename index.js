var neo4j = require('neo4j-driver');

var driver = neo4j.driver(
  'bolt://localhost:7687',
  neo4j.auth.basic('neo4j', 'neo4j123')
);

async function salvarPessoa(pessoa){
    var session = driver.session();

    const retorno = await session.run(
        'CREATE (:Pessoa{nome:$nome, email:$email})',
        {nome: pessoa.nome,
        email: pessoa.email});

    console.log(retorno.summary.counters);

    await session.close();
    await driver.close();

}

const pessoa = {
    nome:'Ana',
    email:'ana@gmail.com'
}

salvarPessoa(pessoa);