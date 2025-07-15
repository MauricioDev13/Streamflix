const dbFilmes = new PouchDB('streamflix');
const dbUsuarios = new PouchDB('usuarios');

window.dbFilmes = dbFilmes;
window.dbUsuarios = dbUsuarios;

function logout(event) {
    if (event) event.preventDefault(); 
    localStorage.removeItem('usuarioLogado'); 
    window.location.href = 'login.html'; 


window.logout = logout;
}
console.log('Banco de dados de filmes (dbFilmes) inicializado:', window.dbFilmes);
console.log('Banco de dados de usuários (dbUsuarios) inicializado:', window.dbUsuarios);