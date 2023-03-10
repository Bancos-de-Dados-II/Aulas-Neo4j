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

async function criarAmizade(email1, email2){
    var session = driver.session();

    const retorno = await session.run(
        'MATCH (p1:Pessoa{email:$email1}) OPTIONAL MATCH (p2:Pessoa{email:$email2}) CREATE (p1)-[:AMIGO]->(p2)',
        {email1: email1,
        email2: email2});

    console.log(retorno.summary.counters);

    await session.close();
    await driver.close();
}

async function listarAmigos(email){
    var session = driver.session();

    const retorno = await session.run(
        'MATCH (:Pessoa{email:$email})-[:AMIGO]->(p2) RETURN p2.nome',
        {email: email});

    retorno.records.forEach(r => console.log(r._fields[0]));


    await session.close();
    await driver.close();
}

// const pessoa = {
//     nome:'Ana',
//     email:'ana@gmail.com'
// }

// salvarPessoa(pessoa);

// criarAmizade('maria@gmail.com', 'ana@gmail.com');

listarAmigos('maria@gmail.com');