document.addEventListener("DOMContentLoaded", () => {

    const tituloEl = document.getElementById("tituloTrabalho");
    const container = document.getElementById("listaCategorias");

    // Inicia a página carregando todas as categorias
    carregarTodasCategorias();

    /**
     * Busca todas as categorias na API (paginadas)
     */
    async function carregarTodasCategorias() {
        try {
            const resposta = await fetch("http://localhost:8080/categorias?page=0&size=20");

            if (!resposta.ok) {
                throw new Error("Erro ao buscar categorias.");
            }

            const page = await resposta.json();
            const lista = page.content || [];

            // Define o título da página
            tituloEl.innerText = "Categorias";

            // Renderiza os cards
            renderizarCategorias(lista);

        } catch (erro) {
            console.error("Erro ao carregar categorias:", erro);
            container.innerHTML =
                "<p style='color:white;font-size:1.1rem;'>Erro ao carregar categorias.</p>";
        }
    }

    /**
     * Renderiza os cards de categorias
     * @param {Array} lista 
     */
    function renderizarCategorias(lista) {
        container.innerHTML = "";

        if (!lista || lista.length === 0) {
            container.innerHTML =
                "<p style='color:white;font-size:1.1rem;'>Nenhuma categoria encontrada.</p>";
            return;
        }

        lista.forEach(cat => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <h3>${cat.nomeCategoria}</h3>
                <p>${cat.conteudoCategoria}</p>

                <a href="trabalho.html?idCategoria=${cat.idCategoria}" class="btn-card">
                    Ver Mais
                </a>
            `;

            container.appendChild(card);
        });
    }

});
