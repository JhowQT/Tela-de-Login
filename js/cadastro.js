document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("formCadastro");

    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");
    const tipoUsuarioSelect = document.getElementById("tipoUsuario");

    // Carregar tipos de usuário da API
    carregarTiposUsuario();

    async function carregarTiposUsuario() {
        try {
            const resp = await fetch("http://localhost:8080/tipo-usuario/todos-tipos");

            if (!resp.ok) {
                console.error("Erro ao carregar tipos de usuário");
                return;
            }

            const lista = await resp.json();

            lista.forEach(tp => {
                const option = document.createElement("option");
                option.value = tp.idTipoUsuario;
                option.textContent = tp.nomeTipoUsuario;
                tipoUsuarioSelect.appendChild(option);
            });

        } catch (erro) {
            console.error("Erro:", erro);
        }
    }

    // Cadastro
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();
        const senha = senhaInput.value.trim();
        const idTipoUsuario = tipoUsuarioSelect.value;

        if (!nome || !email || !senha || !idTipoUsuario) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            const resposta = await fetch("http://localhost:8080/usuarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nomeUsuario: nome,
                    email: email,
                    senha: senha,
                    idTipoUsuario: idTipoUsuario
                })
            });

            if (!resposta.ok) {
                const erroTexto = await resposta.text();
                alert("Erro ao cadastrar: " + erroTexto);
                return;
            }

            alert("Cadastro realizado com sucesso!");

            // Redirecionar para categorias
            window.location.href = "categoria.html";

        } catch (erro) {
            console.error("Erro ao cadastrar:", erro);
            alert("Erro ao conectar ao servidor.");
        }
    });

});
