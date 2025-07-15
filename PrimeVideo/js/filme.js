// filme.js

const urlParams = new URLSearchParams(window.location.search);
const filmeId = urlParams.get('id');

if (filmeId) {
  // Usa dbFilmes
  dbFilmes.get(filmeId).then(filme => {
    document.getElementById('titulo').innerText = filme.titulo;
    document.getElementById('descricao').innerText = filme.descricao;
    document.getElementById('categoria').innerText = filme.categoria;
    document.getElementById('trailer').src = filme.trailer;
  }).catch((err) => { // Adicionado tratamento de erro
    console.error('Erro ao carregar filme:', err);
    document.getElementById('titulo').innerText = 'Filme não encontrado.';
  });
}