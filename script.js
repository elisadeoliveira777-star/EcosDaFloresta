// ===============================================================
//  ELEMENTOS PRINCIPAIS(DOM)
// ===============================================================
const player = document.querySelector('.player');
const dialogBox = document.querySelector('.dialog-box');
const portrait = document.querySelector('.portrait');
const nomeDialogo = document.querySelector('.dialog-name');
const textoDialogo = document.querySelector('.dialog-text');
const bg = document.querySelector('.background');
const teleporte10 = document.getElementById("teleporteFase10");
const scoreBox = document.getElementById("hud-pontuacao");
const npc1 = document.getElementById("npc1"); // Fase 3
const npc2 = document.getElementById("npc2"); // Fase 5
const musicaFinalBoa = new Audio("sounds/ambiente/Theme1.mp3");  
const musicaFinalRuim = new Audio("sounds/ambiente/Vazio.mp3");

 // Esconder Score Menu
scoreBox.classList.add("hidden");

const imagensParaCarregar = [
    "imagens/sprite1.png",
    "imagens/sprite2.png",
    "imagens/personagem_andando.gif",
    "imagens/background1.png",
    "imagens/npc1.png",
    // coloque todas as outras imagens aqui
];

imagensParaCarregar.forEach(src => {
    const img = new Image();
    img.src = src;
});
 
// BANCO DE PERGUNTAS
const bancoPerguntasNPC1 = [
    {
        pergunta: "Por que incêndios na Amazônia podem continuar mesmo após a chuva?",
        alternativas: ["Porque o solo é inflamável", "Porque a floresta úmida retém brasa em troncos e raízes secas", "Porque a chuva aumenta a temperatura"],
        correta: 1
    },
    {
        pergunta: "Qual desses animais é encontrado somente na floresta amazônica?",
        alternativas: ["Boto-cor-de-rosa", "Onça-pintada", "Sucuri-verde"],
        correta: 0
    },
    {
        pergunta: "Por que não devemos arrancar musgos e líquens de árvores?",
        alternativas: ["Matam a planta instantaneamente", "São tóxicos", "Ajudam a indicar a qualidade do ar"],
        correta: 2
    },
    {
        pergunta: "Por que limpar o solado do sapato antes de entrar em uma trilha ajuda?",
        alternativas: ["Impede que fungos e pragas de outras regiões contaminem a floresta", "Evita escorregar", "Impede novos cheiros que podem atrair animais selvagens"],
        correta: 0
    },
    {
        pergunta: "Qual dessas frutas é nativa da floresta amazônica?",
        alternativas: ["Manga", "Açaí", "Kiwi"],
        correta: 1
    },
    {
        pergunta: "Por que deixar folhas secas em jardins pode ser benéfico?",
        alternativas: ["Aumentam a temperatura do solo", "Atraem animais silvestres para um local seguro", "Formam abrigo e alimento para insetos polinizadores"],
        correta: 2
    },
    {
        pergunta: "Qual hábito doméstico ajuda a reduzir microplásticos nos rios?",
        alternativas: ["Lavar roupas com filtro de fibras", "Usar sabão vegetal", "Deixar roupas de molho desde o dia anterior"],
        correta: 0
    },
    {
        pergunta: "Qual desses animais está em risco de extinção?",
        alternativas: ["Tamanduá-mirim", "Gavião-real-da-mata", "Arara-canindé"],
        correta: 1
    },
    {
        pergunta: "Qual atitude evita atrair animais para áreas urbanas e causar desequilíbrios?",
        alternativas: ["Evitar plantar árvores frutíferas", "Colocar avisos", "Fechar bem as lixeiras"],
        correta: 2
    },
    {
        pergunta: "Qual hábito reduz o consumo invisível de água?",
        alternativas: ["Usar duas toalhas por banho", "Comprar menos roupas", "Comprar mais tecidos sintéticos"],
        correta: 1
    },
    {
        pergunta: "O que realmente protege polinizadores em casa?",
        alternativas: ["Evitar pesticidas no quintal", "Spray com cheiro de flores no quintal", "Ligar luzes externas a noite"],
        correta: 0
    },
    {
        pergunta: "Qual escolha de planta ajuda mais o meio ambiente em jardins urbanos?",
        alternativas: ["Usar só flores importadas", "Usar plantas de plástico", "Usar espécies nativas"],
        correta: 2
    },
    {
        pergunta: "Qual cuidado evita incêndios em áreas naturais?",
        alternativas: ["Nunca acender fogueiras, independente do local", "Nunca soltar balões, independente do local", "Nunca acender fósforos, independente do local"],
        correta: 1
    },
     {
        pergunta: "O que ajuda a diminuir o lixo orgânico enviado a aterros?",
        alternativas: ["Usar sacolas ecológicas para guarda-lo", "Limpar o lixo", "Fazer compostagem caseira"],
        correta: 2
    },
     {
        pergunta: "O que você deve fazer com uma pilha usada?",
        alternativas: ["Queimar", "Reciclar em ponto específico", "Jogar no lixo comum"],
        correta: 1
    },
     {
        pergunta: "Por que comprar madeira com certificação é melhor?",
        alternativas: ["Por que ajuda os animais a se localizarem", "Porque dura mais", "Porque garante origem legal"],
        correta: 2
    },
    {
        pergunta: "Por que preferir produtos locais ajuda o ambiente?",
        alternativas: ["Reduz transporte e poluição", "É sempre livre de agrotóxicos", "É mais saudável para consumo"],
        correta: 0
    },
    {
        pergunta: "Qual inseto é essencial para a polinização na Mata Atlântica?",
        alternativas: ["Libélula-rainha", "Borboleta lilás", "Abelha nativa"],
        correta: 2
    },
    {
        pergunta: "Qual desses animais costuma ser ameaçado pela caça ilegal?",
        alternativas: ["Onça-parda", "Lebre-europeia", "Jaguatirica"],
        correta: 0
    },
    {
        pergunta: "Qual espécie sofre risco por causa da destruição do seu habitat na Mata Atlântica?",
        alternativas: ["Panda", "Tamanduá-Bandeira", "Mico-leão-dourado"],
        correta: 2
    },


];
 
// ===============================================================
//  VARIÁVEIS GLOBAIS DO JOGO
// ===============================================================
let playerX = 500;
let dialogoAtivo = false;
let indiceDialogo = 0;
let podeFalar = false;
let faseAtual = 1;
let quizPerguntas = [];
let perguntaAtual = 0;
let pontuacao = 0;
let timer;
let modoQuiz = false;
let faseAnteriorDoQuiz = null;
let isOnGround = false;
let pontuacaoMapa = 0;   // Pontos coletados pelo cenário
let pontuacaoQuiz = 0;   // Pontos do quiz
let finalAtivado = false;
 
// ======================
// MÚSICA GLOBAL DO JOGO
// ======================
const musicaGlobal = new Audio("sounds/ambiente/ForestExpl1.mp3");
musicaGlobal.volume = 0.3;
musicaGlobal.loop = true;
 
//Música Menu
const menuMusic = new Audio("sounds/ambiente/Theme1.mp3");
menuMusic.volume = 0.3;
menuMusic.loop = true;
 
// =====================================
// SISTEMA DE ÁUDIO AMBIENTE
// =====================================
// Criar players de som ambiente
const musicaAmbiente = new Audio();
const somAmbienteExtra = new Audio();
 
musicaAmbiente.loop = true;
somAmbienteExtra.loop = true;
 
musicaAmbiente.volume = 0.1;  
somAmbienteExtra.volume = 0.2;
 
// Lista de músicas por fase
const sonsPorFase = {
    1: { musica: "sounds/ambiente/FlorestExpl1.mp3", extra: "sounds/ambiente/Forest1.mp3" },
    2: { extra: "sounds/ambiente/Forest1.mp3" },                 
    3: { extra: "sounds/ambiente/Forest2Night.mp3" },            
    4: { musica: "sounds/ambiente/Waterfall.mp3" },              
    5: { musica: "sounds/ambiente/River.mp3", extra: "sounds/ambiente/Forest1.mp3" },
    6: { extra: "sounds/ambiente/Forest1.mp3" },                 
    10:{ extra: "sounds/ambiente/Forest3Dawn.mp3" }
};

//Função Áudio
let faseTocando = null;
 
function tocarSomDaFase(fase) {
    if (faseTocando === fase) return; 
    faseTocando = fase;

    const pacote = sonsPorFase[fase];

    //PAUSA TUDO ANTES DE TOCAR QUALQUER COISA
    musicaAmbiente.pause();
    musicaAmbiente.currentTime = 0;

    somAmbienteExtra.pause();
    somAmbienteExtra.currentTime = 0;

    // Se a fase não tem sons, tudo fica parado
    if (!pacote) return;

    // Música principal DA FASE (toca junto com musicaGlobal)
    if (pacote.musica) {
        musicaAmbiente.src = pacote.musica;
        musicaAmbiente.currentTime = 0;
        musicaAmbiente.play().catch(()=>{});
    }

    // Som extra
    if (pacote.extra) {
        somAmbienteExtra.src = pacote.extra;
        somAmbienteExtra.currentTime = 0;
        somAmbienteExtra.play().catch(()=>{});
    }
}
 
// =====================================
// SONS DE EFEITO (SFX)
// =====================================
const sfx = {
    pulo: new Audio("sounds/sfx/Jump5.mp3"),
    passo: new Audio("sounds/sfx/Passos2.mp3"),
    dialogo: new Audio("sounds/sfx/Dialogo.mp3")
};
 
// Volumes
sfx.pulo.volume = 0.1;
sfx.passo.volume = 0.9;
sfx.dialogo.volume = 0.1;
 
// Controle de intervalo entre passos
let lastFootstepTime = 0;
const footstepInterval = 250; // milissegundos entre cada passo
 
function updateFootstepSound() {
    const agora = Date.now();
 
    // Verifica se o player está andando no chão
    if (isOnGround && !isJumping && (keys.right || keys.left)) {
       
        // Toca apenas se já passou o intervalo mínimo
        if (agora - lastFootstepTime > footstepInterval) {
            sfx.passo.currentTime = 0;
            sfx.passo.play();
            lastFootstepTime = agora;
        }
 
    } else {
        // Se parar de andar, não toca nada
        // NÃO daremos PAUSE
    }
}
 
menuMusic.play();
 
 
// BACKGROUNDS DE CADA FASE
const backgrounds = {
    1: "imagens/background1.png",
    2: "imagens/background2.png",
    3: "imagens/background3.png",
    4: "imagens/background4.png",
    5: "imagens/background5.png",
    6: "imagens/background6.png",
    7: "imagens/background7.png",
    10:"imagens/background10.png"
   
   
};
 
// PLATAFORMAS
const plataformasPorFase = {
    2: [
        { id: "plataforma1", left: 400, bottom: 250, cor: "rgba(112, 88, 65, 0.29)" },
        { id: "plataforma2", left: 200, bottom: 430, cor: "rgba(112, 88, 65, 0.29)" },
        { id: "plataforma3", left: 450, bottom: 570, cor: "rgba(112, 88, 65, 0.29)" },
        { id: "plataforma4", left: 10,  bottom: 755, cor: "rgba(112, 88, 65, 0.29)" },
        { id: "plataforma5", left: 1000,  bottom: 500, cor: "rgba(112, 88, 65, 0.29)" }
    ],
    10: [
        { id: "plataforma1", left: 300, bottom: 250, cor: "rgba(154, 233, 122, 0.49)" },
        { id: "plataforma2", left: 600, bottom: 430, cor: "rgba(226, 233, 122, 0.47)" },
        { id: "plataforma3", left: 900, bottom: 600, cor: "rgba(155, 228, 241, 0.28)" }
    ],
    4: [{ id: "plataforma1", left: 1200, bottom: 250, cor: "rgba(155, 228, 241, 0.28)" },
        { id: "plataforma2", left: 1200, bottom: 420, cor: "rgba(155, 228, 241, 0.28)" },
        { id: "plataforma3", left: 1200, bottom: 600, cor: "rgba(155, 228, 241, 0.28)" },
        { id: "plataforma4", left: 200, bottom: 250, cor: "rgba(155, 228, 241, 0.28)" },
        { id: "plataforma5", left: 200, bottom: 420, cor: "rgba(155, 228, 241, 0.28)" },
        { id: "plataforma6", left: 200, bottom: 600, cor: "rgba(155, 228, 241, 0.28)" }
    ],
    6: [ { id: "plataforma1", left: 250, bottom: 250, cor: "rgba(164, 255, 151, 0.28)" },
        { id: "plataforma2", left:  450, bottom: 350, cor: "rgba(164, 255, 151, 0.28)" },
        { id: "plataforma3", left:  650, bottom: 450, cor: "rgba(164, 255, 151, 0.28))" },
        { id: "plataforma4", left:  850, bottom: 550, cor: "rgba(164, 255, 151, 0.28)" },
        { id: "plataforma5", left:  1050, bottom: 650, cor: "rgba(164, 255, 151, 0.28)" },
        { id: "plataforma6", left:  1250, bottom: 750, cor: "rgba(164, 255, 151, 0.28)" },  
    ],
    7: [ { id: "plataforma1", left: 900, bottom: 450, cor: "rgba(163, 255, 151, 0.02)" },
        { id: "plataforma2", left:  790, bottom: 450, cor: "rgba(163, 255, 151, 0.02)" },
        { id: "plataforma3", left:  570, bottom: 217, cor: "rgba(163, 255, 151, 0.02)" },
        { id: "plataforma4", left:  740, bottom: 217, cor: "rgba(163, 255, 151, 0.02)" },
        { id: "plataforma5", left:  470, bottom: 327, cor: "rgba(163, 255, 151, 0.02)" },
        { id: "plataforma6", left:  270, bottom: 327, cor: "rgba(163, 255, 151, 0.02)" },
       
    ],
   
};
 
// ITENS
 const itensPorFase = {
    1: [
        { id: "item_f1_1", left: 200, bottom: 100, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f1_2", left: 1200, bottom: 150, img: "imagens/lixo.gif", valor: 15 }
       
    ],
    2: [
        { id: "item_f2_1", left: 400, bottom: 250, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f2_2", left: 200, bottom: 430, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f2_3", left: 450, bottom: 570, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f2_4", left: 1000, bottom: 500, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f2_5", left: 1000, bottom: 800, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f2_6", left: 1000, bottom: 90, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f2_7", left: 1600, bottom: 600, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f2_8", left: 1400, bottom: 90, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f2_9", left: 1590, bottom: 700, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f2_10", left: 800, bottom: 500, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f2_11", left: 850, bottom: 300, img: "imagens/lixo.gif", valor: 15 }
    ],
    10: [
        { id: "item_f10_1", left: 330, bottom: 250, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f10_2", left: 630, bottom: 430, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f10_3", left: 900, bottom: 600, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f10_4", left: 1000, bottom: 500, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f10_5", left: 1000, bottom: 100, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f10_6", left: 900, bottom: 300, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f10_7", left: 200, bottom: 650, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f10_8", left: 400, bottom: 800, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f10_9", left: 1500, bottom: 90, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f10_10", left: 1500, bottom: 400, img: "imagens/lixo.gif", valor: 15 }
    ],
    3: [
        { id: "item_f3_1", left: 400, bottom: 90, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f3_2", left: 600, bottom: 350, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f3_3", left: 800, bottom: 90, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f3_4", left: 1000, bottom: 350, img: "imagens/lixo.gif", valor: 15 }
    ],
    4: [
        { id: "item_f4_1", left: 400, bottom: 420, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f4_2", left: 400, bottom: 600, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f4_3", left: 400, bottom: 800, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f4_4", left: 600, bottom: 420, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f4_5", left: 600, bottom: 600, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f4_6", left: 600, bottom: 800, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f4_7", left: 800, bottom: 420, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f4_8", left: 800, bottom: 600, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f4_9", left: 800, bottom: 800, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f4_10", left: 1000, bottom: 420, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f4_11", left: 1000, bottom: 600, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f4_12", left: 1000, bottom: 800, img: "imagens/lixo.gif", valor: 15 }  
    ],
    5: [
        { id: "item_f5_1", left: 400, bottom: 90, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f5_2", left: 600, bottom: 350, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f5_3", left: 800, bottom: 90, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f5_4", left: 1000, bottom: 350, img: "imagens/lixo.gif", valor: 15 }
    ],
   
    6: [
        { id: "item_f6_1", left: 550, bottom: 250, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f6_2", left: 750, bottom: 350, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f6_3", left: 950, bottom: 450, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f6_4", left: 1150, bottom: 550, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f6_5", left: 1350, bottom: 650, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f6_6", left: 1550, bottom: 750, img: "imagens/lixo.gif", valor: 15 }
       
    ],
    7: [
        { id: "item_f7_1", left: 900, bottom: 470, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f7_2", left: 570, bottom: 225, img: "imagens/lixo.gif", valor: 15 },
        { id: "item_f7_3", left: 470, bottom: 345, img: "imagens/lixo.gif", valor: 15 }
    ]
   
};
 
//Pegar Itens
const somColeta = new Audio("sounds/sfx/Coin.mp3");
somColeta.volume = 0.5;
 
function pegarItem(item) {
    let valor = Number(item.dataset.valor) || 1;
 
    pontuacaoMapa += valor;
    pontuacao = pontuacaoMapa;
    atualizarPontuacao();
    scoreBox.innerText = "Score: " + pontuacao;
 
    somColeta.currentTime = 0;
    somColeta.play().catch(()=>{});
 
    item.classList.add("pego");
 
    setTimeout(() => {
    item.classList.add("pego");   // Coletado
    item.classList.add("hidden"); // Esconde Permanente
}, 300);
}
// Colisão Itens
function verificarColeta() {
    const itens = document.querySelectorAll(".item:not(.pego)");
 
    itens.forEach(item => {
        let R1 = player.getBoundingClientRect();
        let R2 = item.getBoundingClientRect();
 
        if (R1.right > R2.left &&
            R1.left < R2.right &&
            R1.bottom > R2.top &&
            R1.top < R2.bottom) {
            pegarItem(item);
        }
    });
}
 
// Impedir Repetição Diálogos
let dialogoFeito = {
    3: false,
    5: false,
   
};
 
 // Atualiza o HUD da pontuação
function atualizarPontuacao() {
    document.getElementById("hud-pontuacao").textContent = "Pontos: " + pontuacao;
}
 
//Teleporte Fase 10
teleporte10.style.left = "1130px";
teleporte10.style.bottom = "730px"; // Ponto onde o player encosta para voltar
 
 
// ===============================================================
//  DIÁLOGOS POR FASE
// ===============================================================
const dialogos = {
    3: [
        { nome: "Onça", texto: "Ei Curupira! Quem está te seguindo?", imagem: "imagens/Onça1.png" },
        { nome: "Curupira", texto: "Não se preocupe, é amigo", imagem: "imagens/Curupira2.png" },
        { nome: "Onça", texto: "Amigo? Você tem mania de chamar qualquer um assim! Aposto que acabou de conhecê-lo!", imagem: "imagens/Onça1.png" },
        { nome: "Curupira", texto: " ...", imagem: "imagens/Curupira8.png"},
        { nome: "Curupira", texto: "Talvez...", imagem: "imagens/Curupira7.png"},
        { nome: "Onça", texto: "CHEGA! Eu mesma vou testa-lo!", imagem: "imagens/Onça2.png"},
        { nome: "Onça", texto: "Ei estranho! Vou te fazer perguntas! Você tem 25 segundos para responder cada uma!", imagem: "imagens/Onça2.png"},
        { nome: "Onça", texto: "...E eu não vou te ajudar com o tempo!", imagem: "imagens/Onça1.png"},
        { nome: "Curupira", texto: "Se prepare...", imagem: "imagens/Curupira3.png"},
        { nome: "Curupira", texto: " ! ", imagem: "imagens/Onça1.png"},
 
    ],
    5: [
        { nome: "Sucuri", texto: "Ssss Para onde acham que vão?", imagem: "imagens/Sucuri1.png" },
        { nome: "Curupira", texto: "Olá minha querida amiga! Como tem passado?", imagem: "imagens/Curupira1.png" },
        { nome: "Sucuri", texto: "Curupira! Tem um estranho te seguindo, precisa de ajuda? Sssss", imagem: "imagens/Sucuri2.png" },
        { nome: "Curupira", texto: "Não se preocupe, é nosso amigo, vai nos ajudar na missão", imagem: "imagens/Curupira7.png" },
        { nome: "Sucuri", texto: "E ele tem capacidade? Sabe algo sobre? Ssss", imagem: "imagens/Sucuri1.png" },
        { nome: "Curupira", texto: "Hmm... ", imagem: "imagens/Curupira8.png" },
        { nome: "Sucuri", texto: "SSSSSS já entendi, sempre assim, eu tenho que fazer tudo...", imagem: "imagens/Sucuri1.png" },
        { nome: "Sucuri", texto: "Ei estranho! Prepare-se! Ssss sss ss", imagem: "imagens/Sucuri1.png" },
       
    ],
    "intro": [
        { nome: "Curupira", texto: "Ei, quem é você? Está perdido?", imagem: "imagens/Curupira1.png" },
        { nome: "Curupira", texto: "Ah entendi! Você é amigo e veio ajudar na missão do meio ambiente, certo?", imagem: "imagens/Curupira7.png" },
        { nome: "Curupira", texto: "Me falaram mesmo sobre alguém que queria ver o futuro...Bom, no final, eu posso te mostrar", imagem: "imagens/Curupira1.png" },
        { nome: "Curupira", texto: "Tudo bem, não precisa falar nada, é só me ajudar a limpar essa parte da floresta, está cheio de lixo espalhado por aí", imagem: "imagens/Curupira7.png" },
        { nome: "Curupira", texto: "Vamos lá! Não é difícil, eu confio em você!", imagem: "imagens/Curupira2.png" }
        
    ],
    "finalBom": [
    { nome: "Curupira", texto: "Você conseguiu! Eu sabia que podia confiar em você!", imagem: "imagens/Curupira6.png" },
    { nome: "Curupira", texto: "Obrigado! Todo o meio ambiente agradece!", imagem: "imagens/Curupira6.png" },
    { nome: "Curupira", texto: "Venha! Vou te mostrar seu futuro!", imagem: "imagens/Curupira7.png" }
    ],
    "finalRuim": [
    { nome: "Curupira", texto: "Você não era meu amigo, afinal...", imagem: "imagens/Curupira9.png" },
    { nome: "Curupira", texto: "Você não se importa o suficiente, não é?", imagem: "imagens/Curupira9.png" },
    { nome: "Curupira", texto: "Você insiste em ver seu futuro?", imagem: "imagens/Curupira9.png" },
    { nome: "Curupira", texto: "Muito bem, vou mostra-lo a você...", imagem: "imagens/Curupira9.png" }
]
    
 
};
 // Diálogos finais do quiz
let dialogoFinalQuiz = {
    perfeito: [
        { nome: "Curupira", texto: "Boa! Não duvidei nem por um momento! Acertou todas!", imagem: "imagens/Curupira6.png" },
        { nome: "Curupira", texto: "Agora, deixe-nos passar por favor", imagem: "imagens/Curupira7.png" }
    ],
 
    medio: [
        { nome: "Curupira", texto: "Não acertou tudo, mas mandou bem", imagem: "imagens/Curupira2.png" },
        { nome: "Curupira", texto: "Agora, deixe-nos passar por favor", imagem: "imagens/Curupira1.png" }
    ],
 
    ruim: [
        { nome: "Curupira", texto: "Hmm… você ainda precisa estudar um pouco", imagem: "imagens/Curupira4.png" },
        { nome: "Curupira", texto: "...Preocupante, mas ainda acredito em você! Por favor, deixe-nos passar..", imagem: "imagens/Curupira8.png" }
    ]
};
 
 
//Função Embaralhar
 function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
 
 
//==============================================================
//FUNÇÃO INICIAR QUIZ
//==============================================================
function iniciarQuizNPC1() {
    dialogoAtivo = true;
 
    // copia todas as perguntas
    quizPerguntas = [...bancoPerguntasNPC1];
 
    // embaralha
    embaralhar(quizPerguntas);
 
    // escolhe 5
    quizPerguntas = quizPerguntas.slice(0, 5);
 
    perguntaAtual = 0;
 
    mostrarPerguntaQuiz();
}
 
//Exibir perguntas
function mostrarPerguntaQuiz() {
    dialogBox.classList.remove("hidden");
    dialogoAtivo = true;
    modoQuiz = true;
    nomeDialogo.style.display = "none"; // Oculta título
 
    let p = quizPerguntas[perguntaAtual];
 
    nomeDialogo.textContent = "Pergunta";
 
    // Cria alternativas em botão
    let html = `<p>${p.pergunta}</p><br>`;
 
    p.alternativas.forEach((alt, i) => {
        html += `<button class="alt-btn" onclick="responder(${i})">${alt}</button><br>`;
    });
 
    textoDialogo.innerHTML = html;
 
    iniciarTimer();
}
 // Respostas personalizadas do quiz
const respostasQuiz = {
    acertos: [
        "...Ok, você acertou",
        "Mandou bem!",
        "Você acertou!",
        "Nossa! Acertou!",
        "...Ok, você acertou"
    ],
    erros: [
        "Ops! Não foi dessa vez.",
        "Quase! Mas essa você errou.",
        "Errou…",
        "Acertou! Só que não...",
        "Você errou!"
    ],
    tempo: "O tempo acabou! "
};
 
function responder(indice) {
    let p = quizPerguntas[perguntaAtual];
    clearTimeout(timer);

    let estourouTempo = (indice === -1);

    // TEMPO ACABOU
    if (estourouTempo) {
        textoDialogo.textContent = respostasQuiz.tempo;
        pontuacaoQuiz -= 10;
    }
    // ACERTOU
    else if (indice === p.correta) {
        textoDialogo.textContent = respostasQuiz.acertos[perguntaAtual];
        pontuacaoQuiz += 50;
    }
    // ERROU
    else {
        textoDialogo.textContent = respostasQuiz.erros[perguntaAtual];
        pontuacaoQuiz -= 20;
    }

    // Atualiza HUD
    pontuacao = pontuacaoMapa;
    atualizarPontuacao();

    perguntaAtual++;

    setTimeout(() => {
        if (perguntaAtual >= quizPerguntas.length) {
            finalizarQuiz();
            return;
        }

        mostrarPerguntaQuiz();
    }, 1200);
}
 
// Timer
 
function iniciarTimer() {
    timer = setTimeout(() => {
        responder(-1); // força erro
    }, 25000); // 25s
}
 
// Finalizar Quiz
function finalizarQuiz() {
    modoQuiz = false;
    dialogoAtivo = true;
 
    // Determina qual bloco usar
    let blocoFinal;
 
    if (pontuacaoQuiz >= 250) {
        blocoFinal = dialogoFinalQuiz.perfeito;
    }
    else if (pontuacaoQuiz >= 75) {
        blocoFinal = dialogoFinalQuiz.medio;
    }
    else {
        blocoFinal = dialogoFinalQuiz.ruim;
    }
 
    //  Salva a fase real antes do diálogo final
faseAnteriorDoQuiz = faseAtual;
 
// Configura o sistema de diálogo para esse bloco final
dialogos["finalQuiz"] = blocoFinal;
faseAtual = "finalQuiz";
indiceDialogo = 0;

 // Somo a pontuação do quiz ao total do jogo
pontuacaoMapa += pontuacaoQuiz;

// Atualiza HUD
pontuacao = pontuacaoMapa;
atualizarPontuacao();

// Zera os pontos do quiz (para caso jogue novamente)
pontuacaoQuiz = 0;

    
    mostrarDialogo();
}
 
 
 
// ===============================================================
//  FUNÇÃO MOSTRAR DIÁLOGO
// ===============================================================
 
function mostrarDialogo() {
    let d = dialogos[faseAtual][indiceDialogo];
 
    dialogBox.classList.remove("hidden");
    nomeDialogo.textContent = d.nome;
    textoDialogo.textContent = d.texto;
 
    portrait.classList.remove("ativo");
    portrait.src = d.imagem;
 
    setTimeout(() => portrait.classList.add("ativo"), 10);
}
 
// Avançar diálogo
 function avancarDialogo() {
    indiceDialogo++;

    sfx.dialogo.currentTime = 0;
    sfx.dialogo.play();

    // TERMINOU O DIÁLOGO
    if (indiceDialogo >= dialogos[faseAtual].length) {

        // FINAL DO JOGO
        if (faseAtual === "finalBom" || faseAtual === "finalRuim") {
            dialogoAtivo = false;
            dialogBox.classList.add("hidden");

            document.getElementById("imagemFinalJogo").src = imagemFinal;
            document.getElementById("telaFinalJogo").classList.remove("hidden");
            return;
        }

        // DIÁLOGO INICIAL
        if (faseAtual === "intro") {
            dialogoAtivo = false;
            dialogBox.classList.add("hidden");

            faseAtual = 1;
            podeFalar = false;
            return;
        }

        // DIÁLOGO FINAL DO QUIZ
        if (faseAtual === "finalQuiz") {
            dialogoAtivo = false;
            podeFalar = false;
            dialogBox.classList.add("hidden");

            faseAtual = faseAnteriorDoQuiz;
            return;
        }

        // DIÁLOGO NORMAL
        indiceDialogo = 0;
        iniciarQuizNPC1();
        return;
    }

    mostrarDialogo();
}
//Final do Jogo
// Final do Jogo (versão corrigida)
function ativarFinalDoJogo() {

    // Pausar os players principais que você declarou (sem usar window)
    [
      menuMusic,
      musicaGlobal,
      musicaAmbiente,
      somAmbienteExtra,
      musicaFinalBoa,
      musicaFinalRuim
    ].forEach(a => {
        try {
            if (a && typeof a.pause === "function") {
                a.pause();
                try { a.currentTime = 0; } catch(e){}
            }
        } catch(e){}
    });

    // Pause SFX usados no jogo (usa o objeto sfx que você declarou)
    if (sfx) {
        try { if (sfx.passo)  { sfx.passo.pause();  sfx.passo.currentTime = 0; } } catch(e){}
        try { if (sfx.pulo)   { sfx.pulo.pause();   sfx.pulo.currentTime = 0; } } catch(e){}
        try { if (sfx.dialogo){ sfx.dialogo.pause(); sfx.dialogo.currentTime = 0; } } catch(e){}
    }

    // Garantir que não exista som ambiente "ativo" marcado
    try { faseTocando = null; } catch(e){}

    // Certifica-se de que os players de ambiente estejam zerados
    try { musicaAmbiente.pause(); musicaAmbiente.currentTime = 0; } catch(e){}
    try { somAmbienteExtra.pause(); somAmbienteExtra.currentTime = 0; } catch(e){}

    dialogoAtivo = true;
    finalAtivado = true;
    indiceDialogo = 0;

    // Para música global também (você já fazia)
    try { musicaGlobal.pause(); musicaGlobal.currentTime = 0; } catch(e){}

    // Escolher final e tocar a música do final
    if (pontuacao >= 650) {
        faseAtual = "finalBom";
        imagemFinal = "imagens/finalBom3.png";

        try { musicaFinalBoa.play(); } catch(e){}
        document.getElementById("textoFinal").textContent = "Final Bom! Você está pronto para o novo mundo!";
    } else {
        faseAtual = "finalRuim";
        imagemFinal = "imagens/finalRuim.png";

        try { musicaFinalRuim.play(); } catch(e){}
        document.getElementById("textoFinal").textContent = "Final Ruim... Você sente um vazio indescritível...";
    }

    mostrarDialogo();
}
// Botão reiniciar
document.getElementById("btnReiniciar").onclick = () => {
    location.reload(); // Reinicia página inteira
};

//Diálogo inicial
function iniciarDialogoInicial() {
    dialogoAtivo = true;
    faseAtual = "intro";
    indiceDialogo = 0;
    podeFalar = false;

    mostrarDialogo();
}

document.getElementById('feedbackButton').addEventListener('click', () => {
    window.open('https://docs.google.com/forms/d/1GPCf4yEQO9fcS9LOiLvRrg7hQeNaadPlLzghPjRQrCQ/edit', '_blank');
});
 
// ===============================================================
//   CONTROLE DO DIÁLOGO (TECLA SPACE)
// ===============================================================
document.addEventListener("keydown", (e) => {
 
    // Space apenas
    if (e.code !== "Space") return;
 
    // Se está em modo de quiz, impede avanço normal
    if (modoQuiz) {
        e.preventDefault();
        return;
    }
 
    // Se o diálogo está ativo, avança diálogo
    if (dialogoAtivo) {
        e.preventDefault();
        avancarDialogo();
        return;
    }
 
    // Se não está ativo, mas podeFalar, inicia diálogo
    if (podeFalar) {
        e.preventDefault();
        dialogoAtivo = true;
        mostrarDialogo();
    }
});
 
//Plataformas
function mostrarPlataformasDaFase(fase) {
 
    document.querySelectorAll(".plataforma")
            .forEach(p => p.classList.add("hidden"));
 
    const lista = plataformasPorFase[fase];
    if (!lista) return;
 
    lista.forEach(plat => {
        const p = document.getElementById(plat.id);
        p.classList.remove("hidden");
 
        p.style.left = plat.left + "px";
        p.style.bottom = plat.bottom + "px";
 
        if (plat.cor) p.style.background = plat.cor;
    });
}
// ===============================================================
//  SISTEMA DE FASES
// ===============================================================
 
function mudarFase(novaFase, resetarPosicao = true) {
 
    let faseAnterior = faseAtual;
    faseAtual = novaFase;
    bg.src = backgrounds[novaFase];
 
    if (sonsPorFase[novaFase]) tocarSomDaFase(novaFase);
 
    if (novaFase === 10) teleporte10.classList.remove("hidden");
    else teleporte10.classList.add("hidden");
 
    npc1.classList.add("hidden");
    npc2.classList.add("hidden");
    if (novaFase === 3) npc1.classList.remove("hidden");
    if (novaFase === 5) npc2.classList.remove("hidden");
 
    if (resetarPosicao) {
        if (novaFase > faseAnterior) playerX = 20;
        else playerX = 1520;
        player.style.left = playerX + "px";
    }
 
    
    mostrarItensDaFase(novaFase);
    mostrarPlataformasDaFase(novaFase);
}
 //Função mostrar Itens da fase
function mostrarItensDaFase(fase) {
    const itens = itensPorFase[fase] || [];
 
    // Esconde todos os itens (mas NÃO remove classe .pego)
    document.querySelectorAll(".item").forEach(item => {
        item.classList.add("hidden");
    });
 
    // Mostrar somente os itens da fase atual que NÃO foram pegos
    itens.forEach(dados => {
        const el = document.getElementById(dados.id);
 
        // Se já foi pego, não mostra
        if (el.classList.contains("pego")) return;
 
        el.style.left = dados.left + "px";
        el.style.bottom = dados.bottom + "px";
        el.style.backgroundImage = `url('${dados.img}')`;
        el.dataset.valor = dados.valor;
 
        el.classList.remove("hidden");
    });
}
 
 
// ===============================================================
//  TROCA DE FASE
// ===============================================================
function verificarTrocaDeFase() {
 
    //  Travar esquerda SOMENTE na fase 10
    if (faseAtual === 10) {
        if (playerX < 0) {
            playerX = 0;
            player.style.left = playerX + "px";
        }
        return; // Impede que o resto rode
    }
 
    //  Voltar fase (todas as fases EXCETO fase 10)
    if (playerX < 0 && faseAtual > 1) {
        mudarFase(faseAtual - 1);
        return;
    }
 
    //  Avançar fase normalmente
    if (playerX > 1550 && faseAtual < 7) {
        mudarFase(faseAtual + 1);
        return;
    }
    // ATIVAR FINAL DO JOGO NA FASE 7
if (faseAtual === 7 && playerX >= 1300 && !finalAtivado) {
    ativarFinalDoJogo();
}

}
 
// ===============================================================
//  PROXIMIDADE DO NPC
// ===============================================================
 
function verificarProximidadeNPC() {
    let npc = null;
 
   
    if (faseAtual === 3) npc = npc1;
    if (faseAtual === 5) npc = npc2;
   
    if (!npc || dialogoFeito[faseAtual]) return;
 
    const distancia = Math.abs(playerX - npc.offsetLeft);
 
    if (distancia < 120 && !dialogoAtivo) {
         indiceDialogo = 0; //reseta o diálogo do npc1
        dialogoAtivo = true;
        mostrarDialogo();
        dialogoFeito[faseAtual] = true;
    }
}
 
// ===============================================================
//  MECÂNICA DO PLAYER
// ===============================================================
 
let playerBottom = 70;      // Altura inicial do chão
let isJumping = false;
let isMoving = false;
let direction = 1;           // 1 = direita, -1 = esquerda
let moveSpeed = 10;
let gravity = 1.2;
let verticalVelocity = 0;    // velocidade Y
let jumpForce = 20;          // força do pulo
 
// Sprites
const spriteIdle = "imagens/Player0.gif";
const spriteRun  = "imagens/PlayerRun.gif";
const spriteJump = "imagens/PlayerJump.gif";
 
let currentState = "idle"; // idle | run | jump
 
// ===============================================================
//  DEFINIR ESTADO E ATUALIZAR SPRITES
// ===============================================================
function setState(state) {
    if (currentState === state) return;
    currentState = state;
 
    if (state === "jump") {
        player.src = spriteJump;
    }
    else if (state === "run") {
        player.src = spriteRun + "?v=" + Date.now(); // reinicia GIF
    }
    else {
        player.src = spriteIdle;
    }
 
    player.style.transform = `scaleX(${direction})`; // espelha
}
 
// Estado inicial
setState("idle");
player.style.left = playerX + "px";
player.style.bottom = playerBottom + "px";
 
 
// ===============================================================
//  CONTROLE DO TECLADO
// ===============================================================
 
let keys = {
    right: false,
    left: false,
    jump: false
};
 
document.addEventListener("keydown", (e) => {
    if (dialogoAtivo) return; // trava movimento no diálogo
 
   if (e.key === "ArrowRight" || e.key === "d") {
    keys.right = true;
    keys.left = false;  
    direction = 1;
}
 
   if (e.key === "ArrowLeft" || e.key === "a") {
    keys.left = true;
    keys.right = false;  
    direction = -1;
}
    if ((e.key === "ArrowUp" || e.key === "w") && !isJumping) {
        keys.jump = true;
        isJumping = true;
        verticalVelocity = jumpForce;
        setState("jump");
        sfx.pulo.play()
        // impedir passos no ar
        sfx.pulo.currentTime = 0;
       
    }
});
 
document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowRight" || e.key === "d") keys.right = false;
    if (e.key === "ArrowLeft" || e.key === "a") keys.left = false;
});
 
//Menu do jogo
btnJogar.addEventListener("click", () => {

    // Esconde o menu
    menuInicial.style.display = "none";

    // Mostra o HUD
    scoreBox.classList.remove("hidden");

    // Troca de música
    menuMusic.pause();
    menuMusic.currentTime = 0;

    musicaGlobal.play();

    // Fase inicial
    mudarFase(1, false);

    // INICIAR DIÁLOGO INICIAL AQUI
    iniciarDialogoInicial();
});

 
// ===============================================================
//  LOOP PRINCIPAL DE FÍSICA DO PLAYER
// ===============================================================
 
setInterval(() => {
 
 
    if (dialogoAtivo) return;
 
    // Corrige direção sempre que uma tecla estiver ativa
    if (keys.right && !keys.left) direction = 1;
    if (keys.left && !keys.right) direction = -1;
 
    // Atualiza visualmente a rotação
    player.style.transform = `scaleX(${direction})`;
 
    // -------------------------
    // MOVIMENTO LATERAL
    // -------------------------
    if (keys.right) {
        playerX += moveSpeed;
        if (!isJumping) setState("run");
    }
 
    if (keys.left) {
        playerX -= moveSpeed;
        if (!isJumping) setState("run");
    }
 
    if (!keys.right && !keys.left && !isJumping) {
        setState("idle");
    }
   
    verificarTrocaDeFase();
// ==============================
// COLISÃO UNIVERSAL DE PLATAFORMAS
// ==============================
const plataformasVisiveis = document.querySelectorAll(".plataforma:not(.hidden)");
 
let tocouAlguma = false;
 
plataformasVisiveis.forEach(p => {
    const rect = p.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();
 
    let emCima =
        playerRect.bottom >= rect.top &&
        playerRect.bottom <= rect.top + 30 &&
        playerRect.right > rect.left &&
        playerRect.left < rect.right &&
        verticalVelocity <= 0;
 
    if (emCima) {
    tocouAlguma = true;
 
    playerBottom = parseInt(p.style.bottom) + 20;
    verticalVelocity = 0;
    isJumping = false;
    isOnGround = true;
 
    if (keys.right || keys.left) setState("run");
    else setState("idle");
    }
});
 
if (!tocouAlguma) {
    isJumping = true;
    isOnGround = false;  
}
 
    // -------------------------
    // FÍSICA DO PULO
    // -------------------------
    if (isJumping) {
        verticalVelocity -= gravity;
        playerBottom += verticalVelocity;
 
        if (playerBottom <= 90) {
            playerBottom = 90;
            isJumping = false;
            verticalVelocity = 0;
 
            if (keys.right || keys.left) setState("run");
            else setState("idle");
        }
 
        if (!isJumping) {
    if (sfx.passo.paused) {
       
        sfx.passo.play();
    }
 
    if (!keys.right && !keys.left) {
    sfx.passo.pause();
    sfx.passo.currentTime = 0;
}
}
 
        player.style.bottom = playerBottom + "px";
    }
 
    // ==============================================
    //   ACESSO AO TETO (FASE 10)
    // ==============================================
 
    // SUBIU ALTO O SUFICIENTE NA FASE 2,  IR PARA FASE 10
    if (faseAtual === 2 && playerBottom > 800 && isJumping) {
 
        mudarFase(10);
 
        playerBottom = 400;        // aparece alto
        verticalVelocity = -5;     // força a queda
        player.style.bottom = playerBottom + "px"; //  atualização visual
    }
 
 
    // -------------------------
    // LIMITES DA TELA
    // -------------------------
    if (playerX < 0) playerX = 0;
    if (playerX > 1550) playerX = 1550;
 
    player.style.left = playerX + "px";
 
// ====================================
// COLISÃO COM TELEPORTE DA FASE 10
// ====================================
if (faseAtual === 10) {
 
    let tpLeft = parseInt(teleporte10.style.left);
    let tpBottom = parseInt(teleporte10.style.bottom);
    let tpWidth = teleporte10.offsetWidth;
    let tpHeight = teleporte10.offsetHeight;
 
    // Posições do player
    let pLeft = playerX;
    let pRight = playerX + player.offsetWidth;
    let pBottom = playerBottom;
    let pTop = playerBottom + player.offsetHeight;
 
    // Checagem simples de colisão AABB(Entender)
    if (
        pRight > tpLeft &&
        pLeft < tpLeft + tpWidth &&
        pTop > tpBottom &&
        pBottom < tpBottom + tpHeight
    ) {
        // TELEPORTOU! Volta para a fase 2
        mudarFase(2);
        playerBottom = 300;            // aparece caindo
        playerX = 1000;
        verticalVelocity = 5;         // começa caindo suavemente
        player.style.bottom = playerBottom + "px";
    }
}
 
    // -------------------------
    // Verificações do jogo
    // -------------------------
    verificarTrocaDeFase();
    verificarProximidadeNPC();
    updateFootstepSound();
    verificarColeta();
 
}, 20);

 


