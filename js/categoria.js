document.addEventListener("DOMContentLoaded", () => {

    const tituloEl = document.getElementById("tituloTrabalho");
    const container = document.getElementById("listaCategorias");

    // Pega idTrabalho OU id (para ficar flexível)
    const params = new URLSearchParams(window.location.search);
    const idTrabalho = params.get("idTrabalho") || params.get("id");

    // ===============================
    //   INICIALIZAÇÃO
    // ===============================
    if (idTrabalho) {
        // Cenário 1: categorias de UM trabalho específico
        carregarCategoriasPorTrabalho(idTrabalho);
    } else {
        // Cenário 2: todas as categorias (sem filtro)
        carregarTodasCategorias();
    }

    // ===============================
    //   BUSCA TODAS AS CATEGORIAS (/categorias)
    //   Resposta no formato Page (content[...])
    // ===============================
    async function carregarTodasCategorias() {
        try {
            // Ajuste page/size se quiser paginação real
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
            console.error("Erro ao carregar TODAS as categorias:", erro);
            container.innerHTML =
                "<p style='color:white;font-size:1.05rem;'>Erro ao carregar categorias.</p>";
        }
    }

    // ===============================
    //   BUSCA CATEGORIAS POR TRABALHO
    //   (/categorias/trabalho/{idTrabalho})
    // ===============================
    async function carregarCategoriasPorTrabalho(idTrabalho) {
        try {
            const url = `http://localhost:8080/categorias/trabalho/${idTrabalho}`;
            const resposta = await fetch(url);

            if (!resposta.ok) {
                throw new Error("Erro ao buscar categorias por trabalho.");
            }

            const categorias = await resposta.json();

            // Ajusta o título com o nome do trabalho, se vier no JSON
            if (categorias.length > 0 && categorias[0].trabalho) {
                if (tituloEl) {
                    tituloEl.innerText = `Categorias - ${categororias[0].trabalho.nomeTrabalho}`;
                }
            } else if (tituloEl) {
                tituloEl.innerText = "Categorias do Trabalho";
            }

            renderizarCategorias(categorias);

        } catch (erro) {
            console.error("Erro ao carregar categorias por trabalho:", erro);
            container.innerHTML =
                "<p style='color:white;font-size:1.05rem;'>Erro ao carregar categorias deste trabalho.</p>";
        }
    }

    // ===============================
    //   RENDERIZAÇÃO DOS CARDS
    // ===============================
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

            // Para futuro: ao clicar no botão, você pode abrir outra tela
            // ex: trabalhos-por-categoria.html?idCategoria=cat.idCategoria
            card.innerHTML = `
                <h3>${cat.nomeCategoria}</h3>
                <p>${cat.conteudoCategoria}</p>
                <small style="display:block;margin-bottom:0.5rem;opacity:.8;">
                    Trabalho: ${cat.trabalho ? cat.trabalho.nomeTrabalho : "N/A"}
                </small>
                <a href="#" class="btn-card">Ver Mais</a>
            `;

            container.appendChild(card);
        });
    }

});
