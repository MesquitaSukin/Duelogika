let perguntas = {};
let profissaoAtual = "";
let perguntaAtual = null;

// Profissões e suas matérias
const profissoes = {
  cientista: ["quimica", "fisica"],
  professor: ["portugues", "historia"],
  engenheiro: ["matematica", "fisica"], 
  medico: ["biologia", "quimica"],
  biologo: ["biologia", "ciencias"],
  programador: ["matematica", "logica"],
  historiador: ["historia", "geografia"],
  arquiteto: ["geometria", "artes"]
};

// 🔹 Carrega perguntas do arquivo JSON
fetch("perguntas.json")
  .then(res => res.json())
  .then(data => {
    perguntas = data;
  })
  .catch(err => console.error("Erro ao carregar perguntas:", err));

function iniciarQuiz(profissao) {
  profissaoAtual = profissao;
  document.querySelector(".quiz").style.display = "block";
  proximaPergunta();
}

function proximaPergunta() {
  if (!profissoes[profissaoAtual]) {
    alert("Profissão não encontrada!");
    return;
  }

  const materias = profissoes[profissaoAtual];
  const materia = materias[Math.floor(Math.random() * materias.length)];

  const niveis = Object.keys(perguntas[materia]);
  const nivel = niveis[Math.floor(Math.random() * niveis.length)];

  const lista = perguntas[materia][nivel];
  perguntaAtual = lista[Math.floor(Math.random() * lista.length)];

  document.getElementById("pergunta").innerText =
    `[${materia.toUpperCase()} - ${nivel.toUpperCase()}] ${perguntaAtual.pergunta}`;
  document.getElementById("resultado").innerText = "";

  const opcoesDiv = document.getElementById("opcoes");
  opcoesDiv.innerHTML = "";
  perguntaAtual.opcoes.forEach(op => {
    const btn = document.createElement("button");
    btn.innerText = op;
    btn.onclick = () => verificarResposta(op);
    opcoesDiv.appendChild(btn);
  });
}

function verificarResposta(resposta) {
  if (resposta === perguntaAtual.resposta) {
    document.getElementById("resultado").innerText = "✅ Acertou!";
  } else {
    document.getElementById("resultado").innerText = "❌ Errou!";
  }
}
