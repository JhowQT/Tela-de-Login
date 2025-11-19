document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".box");
    const emailInput = document.getElementById("loginEmail");
    const senhaInput = document.getElementById("loginSenha");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // impede o refresh da página

        const email = emailInput.value.trim();
        const senha = senhaInput.value.trim();

        if (email === "" || senha === "") {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            const resposta = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    senha: senha
                })
            });

            if (!resposta.ok) {
                alert("Email ou senha incorretos.");
                return;
            }

            const data = await resposta.json();

            // Salva o token JWT
            localStorage.setItem("token", data.token);

            // Salva dados do usuário logado
            localStorage.setItem("idUsuario", data.usuario.idUsuario);
            localStorage.setItem("emailUsuario", data.usuario.email);
            localStorage.setItem("nomeUsuario", data.usuario.nomeUsuario);

            // Redireciona para a página de categorias
            window.location.href = "categoria.html";

        } catch (erro) {
            console.error("Erro ao fazer login:", erro);
            alert("Erro ao conectar com o servidor.");
        }
    });

});
