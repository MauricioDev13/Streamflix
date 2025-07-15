// js/auth_check.js

document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    const path = window.location.pathname;
    const currentPage = path.substring(path.lastIndexOf('/') + 1);


    const paginasPublicas = ['login.html', '']; // '' para o caso de acessar a raiz do projeto (ex: localhost:8080/)

    // Verifica se a página atual NÃO é uma página pública (ou seja, exige login)
    
    if (!paginasPublicas.includes(currentPage) && !paginasPublicas.includes(currentPage.split('?')[0])) {
        if (!usuarioLogado) {
            window.location.replace('login.html'); // Usa replace para não deixar rastro no histórico
        } else {
            const usuario = JSON.parse(usuarioLogado);
            if (currentPage.startsWith('admin-') && usuario.tipo !== 'admin') {
                alert('Acesso negado. Apenas administradores podem acessar esta página.');
                window.location.replace('index.html'); // Redireciona para a página inicial se não for admin
            }
        }
    }
});



// Função de logout global para ser usada em qualquer página
function logout(event) {
    if (event) event.preventDefault(); 
    localStorage.removeItem('usuarioLogado'); 
    window.location.replace('login.html'); 
}

window.logout = logout;