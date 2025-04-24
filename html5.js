
let worker;

function startWorker() {
  if (typeof(Worker) !== "undefined") {
    if (!worker) {
      worker = new Worker(URL.createObjectURL(new Blob([`
        let i = 0;
        setInterval(() => {
          postMessage("Szám: " + (++i));
        }, 1000);
      `])));
      worker.onmessage = function(e) {
        document.getElementById("workerOutput").innerText = e.data;
      };
    }
  } else {
    document.getElementById("workerOutput").innerText = "A böngésző nem támogatja a web munkaszálakat.";
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      document.getElementById("locationResult").innerText =
        "Szélesség: " + position.coords.latitude +
        ", Hosszúság: " + position.coords.longitude;
    }, () => {
      document.getElementById("locationResult").innerText = "Hozzáférés megtagadva vagy hiba történt.";
    });
  } else {
    document.getElementById("locationResult").innerText = "A böngésző nem támogatja a geolocation API-t.";
  }
}

// Drag & Drop
document.addEventListener("DOMContentLoaded", () => {
  const dragMe = document.getElementById("dragMe");
  const dropZone = document.getElementById("dropZone");

  dragMe.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text", "dragMe");
  });

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("text");
    const draggedEl = document.getElementById(draggedId);
    dropZone.appendChild(draggedEl);
  });

  // Canvas rajz
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(20, 20, 150, 50);
});
