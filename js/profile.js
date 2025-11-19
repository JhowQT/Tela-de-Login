// =========================
// CONFIGURAÇÕES
// =========================
const API_URL = "http://localhost:8080/usuarios"; // ajuste se necessário

// Pegando ID do usuário logado (salvo após o login)
const userId = localStorage.getItem("idUsuario");

if (!userId) {
  alert("Nenhum usuário logado!");
  window.location.href = "login.html";
}

// Seletores
const fotoInput = document.getElementById("fotoInput");
const fotoPreview = document.getElementById("fotoPreview");
const nomeInput = document.getElementById("nomeUsuario");
const emailInput = document.getElementById("emailUsuario");
const senhaInput = document.getElementById("senhaUsuario");
const mensagem = document.getElementById("mensagem");
const formPerfil = document.getElementById("formPerfil");

// =======================================
// 1. Buscar dados do usuário ao carregar
// =======================================
async function carregarPerfil() {
  try {
    const resp = await fetch(`${API_URL}/${userId}`);
    if (!resp.ok) throw new Error("Erro ao carregar o perfil.");

    const data = await resp.json();

    nomeInput.value = data.nomeUsuario;
    emailInput.value = data.email;

    if (data.fotoBase64) {
      fotoPreview.src = `data:image/png;base64,${data.fotoBase64}`;
    }

  } catch (error) {
    mensagem.textContent = error.message;
  }
}

carregarPerfil();

// =======================================
// 2. Preview da imagem ao selecionar
// =======================================
fotoInput.addEventListener("change", () => {
  const file = fotoInput.files[0];
  if (file) {
    fotoPreview.src = URL.createObjectURL(file);
  }
});

// =======================================
// 3. Salvar alterações do perfil
// =======================================
formPerfil.addEventListener("submit", async (e) => {
  e.preventDefault();

  const body = {
    nomeUsuario: nomeInput.value,
    email: emailInput.value,
    senha: senhaInput.value || null
  };

  try {
    const resp = await fetch(`${API_URL}/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!resp.ok) {
      const erro = await resp.text();
      throw new Error(erro);
    }

    mensagem.style.color = "green";
    mensagem.textContent = "Perfil atualizado com sucesso!";

    // Atualizar foto se tiver sido enviada
    if (fotoInput.files.length > 0) {
      await atualizarFoto();
    }

  } catch (error) {
    mensagem.style.color = "red";
    mensagem.textContent = error.message;
  }
});

// =======================================
// 4. Atualizar apenas a foto (PATCH)
// =======================================
async function atualizarFoto() {
  const formData = new FormData();
  formData.append("foto", fotoInput.files[0]);

  const resp = await fetch(`${API_URL}/${userId}/foto`, {
    method: "PATCH",
    body: formData,
  });

  if (!resp.ok) {
    throw new Error("Erro ao atualizar a foto.");
  }
}

// =======================================
// 5. Logout
// =======================================
document.getElementById("btnLogout").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});
