const gameArea = document.getElementById("gameArea");
const player = document.getElementById("player");

let stage = 1; // Asteroide
let playerSize = 20;
let position = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let speed = 5;

// Manejo del movimiento
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      position.y -= speed;
      break;
    case "ArrowDown":
      position.y += speed;
      break;
    case "ArrowLeft":
      position.x -= speed;
      break;
    case "ArrowRight":
      position.x += speed;
      break;
  }
  updatePlayerPosition();
});

function updatePlayerPosition() {
  player.style.left = `${position.x}px`;
  player.style.top = `${position.y}px`;
}

// Generar partículas de energía
function spawnEnergy() {
  const energy = document.createElement("div");
  energy.classList.add("energy");
  const size = Math.random() * 10 + 5;
  energy.style.width = `${size}px`;
  energy.style.height = `${size}px`;
  energy.style.top = `${Math.random() * gameArea.offsetHeight}px`;
  energy.style.left = `${Math.random() * gameArea.offsetWidth}px`;

  gameArea.appendChild(energy);

  // Detectar colisiones
  const interval = setInterval(() => {
    const energyRect = energy.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if (
      playerRect.left < energyRect.right &&
      playerRect.right > energyRect.left &&
      playerRect.top < energyRect.bottom &&
      playerRect.bottom > energyRect.top
    ) {
      // Crecimiento
      playerSize += size / 2;
      player.style.width = `${playerSize}px`;
      player.style.height = `${playerSize}px`;
      gameArea.removeChild(energy);
      clearInterval(interval);

      // Cambiar etapa si es necesario
      checkStage();
    }
  }, 100);
}

function checkStage() {
  if (playerSize > 50 && stage === 1) {
    stage = 2; // Convertirse en planeta
    player.classList.remove("stage-asteroid");
    player.classList.add("stage-planet");
    player.style.background = "blue";
  } else if (playerSize > 100 && stage === 2) {
    stage = 3; // Convertirse en estrella
    player.classList.remove("stage-planet");
    player.classList.add("stage-star");
    player.style.background = "orange";
    player.style.boxShadow = "0 0 20px orange";
  }
  // Puedes seguir añadiendo etapas aquí.
}

// Generar energía constantemente
setInterval(spawnEnergy, 2000);