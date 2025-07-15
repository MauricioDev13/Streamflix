// admin-usuarios.js
// Não precisa mais do 'const db = new PouchDB('usuarios');' aqui
// pois dbUsuarios já é global através de db.js

function cadastrarUsuario(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const tipo = document.getElementById('tipo').value;

  if (!nome || !email || !senha || !tipo) {
    alert("Preencha todos os campos!");
    return;
  }

  const usuario = {
    _id: new Date().toISOString(),
    nome,
    email,
    senha,
    tipo
  };

  // Usa dbUsuarios
  dbUsuarios.put(usuario).then(() => {
    alert('Usuário cadastrado com sucesso!');
    document.getElementById('formUsuario').reset();
    listarUsuarios();
  }).catch((err) => {
    console.error('Erro ao salvar usuário:', err);
    alert('Erro ao salvar usuário.');
  });
}

function listarUsuarios() {
  const container = document.getElementById('lista-usuarios');
  container.innerHTML = '';

  // Usa dbUsuarios
  dbUsuarios.allDocs({ include_docs: true }).then(result => {
    result.rows.forEach(row => {
      const user = row.doc;
      const div = document.createElement('div');
      div.className = 'usuario';
      div.innerHTML = `
        <strong>${user.nome}</strong> - ${user.email} (${user.tipo})
        <button onclick="excluirUsuario('${user._id}', '${user._rev}')">Excluir</button>
      `;
      container.appendChild(div);
    });
  });
}

function excluirUsuario(id, rev) {
  // Usa dbUsuarios
  dbUsuarios.remove(id, rev).then(() => {
    alert('Usuário excluído!');
    listarUsuarios();
  }).catch((err) => {
    console.error('Erro ao excluir usuário:', err);
    alert('Erro ao excluir usuário.');
  });
}

window.onload = listarUsuarios;