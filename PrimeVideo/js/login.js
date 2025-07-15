// login.js
// Certifique-se de que dbUsuarios está disponível globalmente, conforme as correções anteriores em db.js

function realizarLogin(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const mensagemErroElement = document.getElementById('mensagem-erro'); // Elemento para mensagens

  // Limpar qualquer mensagem anterior
  mensagemErroElement.innerText = '';
  mensagemErroElement.style.color = 'red'; // Garante que a cor padrão seja vermelha para erros

  dbUsuarios.allDocs({ include_docs: true }).then(result => {
    const usuarios = result.rows.map(row => row.doc);
    const usuario = usuarios.find(user => user.email === email && user.senha === senha);

    if (usuario) {
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

      // Exibir mensagem de sucesso na própria página
      mensagemErroElement.style.color = 'green'; // Mudar cor para sucesso
      mensagemErroElement.innerText = `Login efetuado com sucesso! Redirecionando...`;

      // Redirecionar após um pequeno atraso para o usuário ver a mensagem
      setTimeout(() => {
        if (usuario.tipo === 'admin') {
          window.location.href = 'admin-filme.html';
        } else {
          window.location.href = 'index.html';
        }
      }, 1500); // Atraso de 1.5 segundos (1500 milissegundos)
      
    } else {
      mensagemErroElement.style.color = 'red'; // Garantir que a cor seja vermelha para erro
      mensagemErroElement.innerText = 'Email ou senha incorretos. Tente novamente.';
    }
  }).catch(err => {
    console.error('Erro no login:', err);
    mensagemErroElement.style.color = 'red'; // Garantir que a cor seja vermelha para erro
    mensagemErroElement.innerText = 'Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.';
  });
}