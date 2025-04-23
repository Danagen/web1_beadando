
const code = "BOCKPM007asd";
const api = "http://gamf.nhely.hu/ajax2/";

function showMessage(msg) {
    alert(msg);
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loadData").addEventListener("click", () => {
        fetch(api, {
            method: "POST",
            body: new URLSearchParams({ op: "read", code })
        })
        .then(res => res.json())
        .then(data => {
            const output = document.getElementById("dataOutput");
            output.innerHTML = "";
            if (!data.list || !Array.isArray(data.list)) {
                output.innerHTML = "<p>Nem sikerült beolvasni az adatokat.</p>";
                return;
            }
            let heights = [], total = 0;
            data.list.forEach(item => {
                const height = Number(item.height);
                heights.push(height);
                output.innerHTML += `<p>${item.id}: ${item.name} (${item.height} cm, ${item.weight} kg)</p>`;
            });
            if (heights.length > 0) {
                const sum = heights.reduce((a, b) => a + b, 0);
                const avg = (sum / heights.length).toFixed(2);
                const max = Math.max(...heights);
                output.innerHTML += `<p>Összeg: ${sum}, Átlag: ${avg}, Max: ${max}</p>`;
            }
        });
    });

    document.getElementById("createForm").addEventListener("submit", e => {
        e.preventDefault();
        const name = document.getElementById("cname").value;
        const height = document.getElementById("cheight").value;
        const weight = document.getElementById("cweight").value;
        if (!name || !height || !weight) return showMessage("Minden mező kötelező!");
        if ([name, height, weight].some(v => v.length > 30)) return showMessage("Max 30 karakter!");

        fetch(api, {
            method: "POST",
            body: new URLSearchParams({ op: "create", code, name, height, weight })
        })
        .then(res => res.json())
        .then(() => showMessage("Sikeres hozzáadás!"));
    });

    document.getElementById("getData").addEventListener("click", () => {
        const id = document.getElementById("uid").value;
        fetch(api, {
            method: "POST",
            body: new URLSearchParams({ op: "read", code })
        })
        .then(res => res.json())
        .then(data => {
            if (!data.list || !Array.isArray(data.list)) return showMessage("Nincs elérhető adat.");
            const item = data.list.find(i => i.id == id);
            if (!item) return showMessage("Nem található ilyen ID.");
            document.getElementById("uname").value = item.name;
            document.getElementById("uheight").value = item.height;
            document.getElementById("uweight").value = item.weight;
            document.getElementById("fresh").style.display = "inline-block"
        });
    });

    document.getElementById("updateForm").addEventListener("submit", e => {
        e.preventDefault();
        const id = document.getElementById("uid").value;
        const name = document.getElementById("uname").value;
        const height = document.getElementById("uheight").value;
        const weight = document.getElementById("uweight").value;
        if (!id || !name || !height || !weight) return showMessage("Minden mező kötelező!");
        if ([name, height, weight].some(v => v.length > 30)) return showMessage("Max 30 karakter!");

        fetch(api, {
            method: "POST",
            body: new URLSearchParams({ op: "update", code, id, name, height, weight })
        })
        .then(res => res.json())
        .then(() => showMessage("Sikeres frissítés!"));
    });

    document.getElementById("deleteForm").addEventListener("submit", e => {
        e.preventDefault();
        const id = document.getElementById("did").value;
        fetch(api, {
            method: "POST",
            body: new URLSearchParams({ op: "delete", code, id })
        })
        .then(res => res.json())
        .then(() => showMessage("Sikeres törlés!"));
    });
});