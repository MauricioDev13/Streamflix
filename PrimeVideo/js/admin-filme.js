

// Função para salvar um filme (cadastrar ou atualizar)
function salvarFilme(event) {
  event.preventDefault();

  const filmeId = document.getElementById('filmeId').value;
  const filmeRev = document.getElementById('filmeRev').value;

  const filme = {
    titulo: document.getElementById('titulo').value,
    descricao: document.getElementById('descricao').value,
    categoria: document.getElementById('categoria').value,
    trailer: document.getElementById('trailer').value,
    imagem: document.getElementById('imagem').value
  };

  if (filmeId) {
    // Se filmeId existe, estamos editando um filme existente
    filme._id = filmeId;
    filme._rev = filmeRev;
    window.dbFilmes.put(filme).then(() => {
      alert('Filme atualizado com sucesso!');
      limparFormulario();
      listarFilmes(); // Recarrega a lista
    }).catch(err => {
      console.error('Erro ao atualizar filme:', err);
      alert('Erro ao atualizar filme.');
    });
  } else {
    // Se filmeId não existe, estamos cadastrando um novo filme
    filme._id = new Date().toISOString(); // Gera um ID único para o novo filme
    window.dbFilmes.post(filme).then(() => {
      alert('Filme cadastrado com sucesso!');
      limparFormulario();
      listarFilmes(); 
    }).catch(err => {
      console.error('Erro ao cadastrar filme:', err);
      alert('Erro ao cadastrar filme.');
    });
  }
}

// Função para listar todos os filmes
function listarFilmes() {
  const container = document.getElementById('lista-filmes');
  container.innerHTML = ''; // Limpa a lista antes de recarregar

  window.dbFilmes.allDocs({ include_docs: true }).then(result => {
    if (result.rows.length === 0) {
        container.innerHTML = '<p>Nenhum filme cadastrado ainda.</p>';
        return;
    }
    result.rows.forEach(row => {
      const filme = row.doc;
      const div = document.createElement('div');
      div.className = 'item-admin'; // Use uma classe para estilização
      div.innerHTML = `
        <img src="${filme.imagem}" alt="${filme.titulo}" class="admin-capa">
        <div class="item-info">
          <strong>${filme.titulo}</strong> (${filme.categoria})
          <p>${filme.descricao.substring(0, 100)}...</p>
        </div>
        <div class="item-actions">
          <button onclick="editarFilme('${filme._id}')" class="btn-editar">Editar</button>
          <button onclick="excluirFilme('${filme._id}', '${filme._rev}')" class="btn-excluir">Excluir</button>
        </div>
      `;
      container.appendChild(div);
    });
  }).catch(err => {
    console.error('Erro ao listar filmes:', err);
    container.innerHTML = '<p>Erro ao carregar filmes.</p>';
  });
}

// Função para carregar os dados de um filme no formulário para edição
function editarFilme(id) {
  window.dbFilmes.get(id).then(filme => {
    document.getElementById('filmeId').value = filme._id;
    document.getElementById('filmeRev').value = filme._rev;
    document.getElementById('titulo').value = filme.titulo;
    document.getElementById('descricao').value = filme.descricao;
    document.getElementById('categoria').value = filme.categoria; 
    document.getElementById('trailer').value = filme.trailer;
    document.getElementById('imagem').value = filme.imagem;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }).catch(err => {
    console.error('Erro ao carregar filme para edição:', err);
    alert('Não foi possível carregar o filme para edição.');
  });
}

// Função para excluir um filme
function excluirFilme(id, rev) {
  if (confirm('Tem certeza que deseja excluir este filme?')) {
    window.dbFilmes.remove(id, rev).then(() => {
      alert('Filme excluído com sucesso!');
      listarFilmes(); // Recarrega a lista
    }).catch(err => {
      console.error('Erro ao excluir filme:', err);
      alert('Erro ao excluir filme.');
    });
  }
}

function limparFormulario() {
  document.getElementById('formFilme').reset();
  document.getElementById('filmeId').value = '';
  document.getElementById('filmeRev').value = '';
  document.getElementById('categoria').value = ''; 
}


window.onload = listarFilmes;