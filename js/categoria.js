document.addEventListener("DOMContentLoaded", () => {

    const tituloEl = document.getElementById("tituloTrabalho");
    const container = document.getElementById("listaCategorias");

    const params = new URLSearchParams(window.location.search);
    const idTrabalho = params.get("idTrabalho") || params.get("id");

    // Agora só existe listagem de TODAS as categorias
    carregarTodasCategorias();

    async function carregarTodasCategorias() {
        try {
            const url = "http://localhost:8080/categorias?page=0&size=20";
            const resposta = await fetch(url);

            if (!resposta.ok) {
                throw new Error("Erro ao buscar categorias.");
            }

            const page = await resposta.json();
            const lista = page.content || [];

            if (tituloEl) {
                tituloEl.innerText = "Categorias";
            }

            renderizarCategorias(lista);

        } catch (erro) {
            console.error("Erro ao carregar categorias:", erro);
            container.innerHTML =
                "<p style='color:white;font-size:1.05rem;'>Erro ao carregar categorias.</p>";
        }
    }

    function renderizarCategorias(lista) {
        container.innerHTML = "";

        if (!lista || lista.length === 0) {
            container.innerHTML =
                "<p style='color:white;font-size:1.05rem;'>Nenhuma categoria encontrada.</p>";
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
