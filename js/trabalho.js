document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const idCategoria = params.get("idCategoria");

    const tituloEl = document.getElementById("tituloCategoria");
    const container = document.getElementById("listaTrabalhos");

    const token = localStorage.getItem("token");

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
            }

            renderizarTrabalhos(lista);

        } catch (erro) {
            container.innerHTML =
                "<p style='color:white;'>Erro ao carregar os trabalhos.</p>";
        }
    }

    async function renderizarTrabalhos(lista) {
        container.innerHTML = "";

        for (const tb of lista) {

            const comentarios = await carregarComentarios(tb.idTrabalho);

            const card = document.createElement("div");
            card.classList.add("card");

            let comentariosHTML = "";

            if (comentarios.length === 0) {
                comentariosHTML = "<p style='opacity:.8'>Nenhum comentário ainda.</p>";
            } else {
                comentariosHTML = comentarios
                    .map(c => `
                        <p>
                            <strong>${c.nomeUsuario}</strong>: 
                            ${c.conteudoComentario}
                        </p>
                    `)
                    .join("");
            }

            const campoComentario = token ? `
                <textarea id="comentario-${tb.idTrabalho}" placeholder="Escreva um comentário..."></textarea>
                <button class="btn-card" onclick="comentar(${tb.idTrabalho})">Enviar</button>
            ` : `
                <p style="opacity:.7;margin-top:1rem;">
                    <a href="login.html" style="color:#8ab4ff;">Faça login</a> para comentar.
                </p>
            `;

            card.innerHTML = `
                <h3>${tb.nomeTrabalho}</h3>
                <p>${tb.conteudoTrabalho}</p>

                <h4>Comentários</h4>
                <div id="comentarios-${tb.idTrabalho}">
                    ${comentariosHTML}
                </div>

                ${campoComentario}
            `;

            container.appendChild(card);
        }
    }

    async function carregarComentarios(idTrabalho) {
        try {
            const resposta = await fetch(`http://localhost:8080/comentarios/trabalho/${idTrabalho}`);
            if (!resposta.ok) return [];
            return await resposta.json();
        } catch (erro) {
            return [];
        }
    }

    window.comentar = async function (idTrabalho) {

        const campo = document.getElementById(`comentario-${idTrabalho}`);
        const texto = campo.value.trim();

        if (texto === "") {
            alert("Digite um comentário.");
            return;
        }

        try {
            const resposta = await fetch(`http://localhost:8080/comentarios`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    conteudoComentario: texto,
                    idTrabalho: idTrabalho
                })
            });

            if (!resposta.ok) {
                alert("Erro ao enviar comentário. Faça login novamente.");
                return;
            }

            campo.value = "";

            const novos = await carregarComentarios(idTrabalho);
            const div = document.getElementById(`comentarios-${idTrabalho}`);

            div.innerHTML = novos
                .map(c => `
                    <p>
                        <strong>${c.nomeUsuario}</strong>: 
                        ${c.conteudoComentario}
                    </p>
                `)
                .join("");

        } catch (erro) {
            alert("Erro ao conectar com o servidor.");
        }
    };

});
