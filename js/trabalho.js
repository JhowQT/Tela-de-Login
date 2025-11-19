document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const idCategoria = params.get("idCategoria");

    const tituloEl = document.getElementById("tituloCategoria");
    const container = document.getElementById("listaTrabalhos");

    if (!idCategoria) {
        container.innerHTML = "<p style='color:white;'>Categoria inválida.</p>";
        return;
    }

    carregarTrabalhos(idCategoria);

    async function carregarTrabalhos(idCategoria) {
        try {
            const resposta = await fetch(`http://localhost:8080/trabalhos/categoria/${idCategoria}`);

            if (!resposta.ok) throw new Error("Erro ao carregar trabalhos.");

            const lista = await resposta.json();

            if (lista.length > 0) {
                tituloEl.innerText =
                    `Trabalhos da Categoria: ${lista[0].categoria.nomeCategoria}`;
            } else {
                tituloEl.innerText =
                    "Nenhum trabalho encontrado para esta categoria.";
            }

            renderizarTrabalhos(lista);

        } catch (erro) {
            container.innerHTML =
                "<p style='color:white;'>Erro ao carregar os trabalhos.</p>";
        }
    }

    function renderizarTrabalhos(lista) {
        container.innerHTML = "";

        lista.forEach(tb => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <h3>${tb.nomeTrabalho}</h3>
                <p>${tb.conteudoTrabalho}</p>

                <a href="#" class="btn-card">Ver Mais</a>
            `;

            container.appendChild(card);
        });
    }

});
