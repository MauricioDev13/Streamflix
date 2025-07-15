// ./js/script.js

// Garante que dbFilmes está disponível globalmente através de db.js

if(!localStorage.getItem('usuarioLogado')) {
  window.location.href = 'login.html'; 
}

if (typeof dbFilmes === 'undefined') {
  console.error("Erro: 'dbFilmes' não está definido. Verifique se db.js está carregado corretamente.");
}

document.addEventListener('DOMContentLoaded', () => {
    carregarFilmes();
});

async function carregarFilmes() {
    try {
        const result = await dbFilmes.allDocs({ include_docs: true });
        const filmes = result.rows.map(row => row.doc);

        exibirFilmesDestaque(filmes);
        exibirFilmesGrid(filmes);

    } catch (err) {
        console.error('Erro ao carregar filmes:', err);
        const filmesContainer = document.getElementById('filmes');
        filmesContainer.innerHTML = '<p>Erro ao carregar filmes. Por favor, tente novamente mais tarde.</p>';
    }
}

function exibirFilmesDestaque(filmes) {
    const destaqueContainer = document.getElementById('destaque');
    destaqueContainer.innerHTML = ''; // Limpa o conteúdo existente

    if (filmes.length === 0) {
        destaqueContainer.innerHTML = '<p>Nenhum filme em destaque para exibir.</p>';
        return;
    }

    const filmesEmDestaque = filmes.sort(() => 0.5 - Math.random()).slice(0, Math.min(filmes.length, 3)); // Exibe até 3 destaques

    if (filmes.length > 0) {
    const destaqueFilme = filmes[0];
    const destaqueDiv = document.createElement('div');
    destaqueDiv.className = 'filme-destaque-item';
    destaqueDiv.innerHTML = `
        <a href="filme.html?id=${destaqueFilme._id}">
            <img src="${destaqueFilme.imagem}" alt="${destaqueFilme.titulo}">
            <div class="info-overlay">
                <h3>${destaqueFilme.titulo}</h3>
                <p>${destaqueFilme.descricao.substring(0, 150)}...</p>
                <span class="categoria-tag">${destaqueFilme.categoria}</span>
                </div>
        </a>
    `;
    destaqueContainer.appendChild(destaqueDiv);
    }
}

function exibirFilmes(filmes) {
  const containerFilmes = document.getElementById('filmes-populares'); // Ou 'destaque', etc.
  containerFilmes.innerHTML = ''; // Limpa o container
  
  filmes.forEach(filme => {
    const filmeCard = document.createElement('div');
    filmeCard.className = 'filme-card'; // Nova classe para estilização
    
    const linkDetalhes = document.createElement('a');
    linkDetalhes.href = `filme.html?id=${filme._id}`; // Passa o ID do filme na URL
    
    const imagem = document.createElement('img');
    imagem.src = filme.imagem;
    imagem.alt = filme.titulo;

    const tituloCard = document.createElement('h3');
    tituloCard.innerText = filme.titulo;

    linkDetalhes.appendChild(imagem);
    linkDetalhes.appendChild(tituloCard); // Adicione o título dentro do link também se quiser

    filmeCard.appendChild(linkDetalhes);
    containerFilmes.appendChild(filmeCard);
  });
}

function exibirFilmesGrid(filmes, categoria = null) {
    const filmesContainer = document.getElementById('filmes');
    filmesContainer.innerHTML = ''; // Limpa o conteúdo existente

    let filmesParaExibir = filmes;
    if (categoria && categoria !== 'Todos') {
        filmesParaExibir = filmes.filter(filme => filme.categoria === categoria);
    }

    if (filmesParaExibir.length === 0) {
        filmesContainer.innerHTML = `<p>Nenhum filme encontrado na categoria "${categoria}".</p>`;
        return;
    }

    filmesParaExibir.forEach(filme => {
        const filmeCard = document.createElement('div');
        filmeCard.className = 'filme-card';
        filmeCard.innerHTML = `
            <img src="${filme.imagem}" alt="${filme.titulo}">
            <h4>${filme.titulo}</h4>
            <p>${filme.categoria}</p>
            <a href="filme.html?id=${filme._id}" class="btn-card-detalhes">Detalhes</a>
        `;
        filmesContainer.appendChild(filmeCard);
    });
}

// Função chamada pelos botões de categoria no index.html
function filtrarCategoria(categoria) {
    dbFilmes.allDocs({ include_docs: true }).then(result => {
        const filmes = result.rows.map(row => row.doc);
        exibirFilmesGrid(filmes, categoria);
    }).catch(err => {
        console.error('Erro ao filtrar filmes:', err);
    });
}


window.onload = function() {
  window.dbFilmes.allDocs({ include_docs: true }).then(result => {
    const filmes = result.rows.map(row => row.doc);
   exibirFilmes(filmes); // Chame sua função para exibir
  }).catch(err => {
    console.error('Erro ao buscar filmes:', err);
  });
};

window.filtrarCategoria = filtrarCategoria;