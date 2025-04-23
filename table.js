
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("dataForm");
    const tableBody = document.querySelector("#dataTable tbody");
    const searchInput = document.getElementById("search");
    let data = [];

    function renderTable(filteredData = data) {
        tableBody.innerHTML = "";
        filteredData.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.age}</td>
                <td>${item.major}</td>
                <td>${item.email}</td>
                <td>
                    <button onclick="editItem(${index})">Szerkeszt</button>
                    <button onclick="deleteItem(${index})">Törlés</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    function validateForm(name, age, major, email) {
        if (!name || name.length < 2 || name.length > 30) return false;
        if (!age || age < 1 || age > 120) return false;
        if (!major || major.length < 2 || major.length > 30) return false;
        const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!emailRegex.test(email)) return false;
        return true;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const age = parseInt(document.getElementById("age").value);
        const major = document.getElementById("major").value.trim();
        const email = document.getElementById("email").value.trim();

        if (!validateForm(name, age, major, email)) {
            alert("Hibás adatmegadás!");
            return;
        }

        data.push({ name, age, major, email });
        renderTable();
        form.reset();
    });

    window.editItem = function(index) {
        const item = data[index];
        document.getElementById("name").value = item.name;
        document.getElementById("age").value = item.age;
        document.getElementById("major").value = item.major;
        document.getElementById("email").value = item.email;
        data.splice(index, 1);
        renderTable();
    };

    window.deleteItem = function(index) {
        if (confirm("Biztosan törli ezt a sort?")) {
            data.splice(index, 1);
            renderTable();
        }
    };

    searchInput.addEventListener("input", () => {
        const keyword = searchInput.value.toLowerCase();
        const filtered = data.filter(item =>
            item.name.toLowerCase().includes(keyword) ||
            item.major.toLowerCase().includes(keyword) ||
            item.email.toLowerCase().includes(keyword) ||
            item.age.toString().includes(keyword)
        );
        renderTable(filtered);
    });

    const headers = document.querySelectorAll("th[data-col]");
    headers.forEach(header => {
        header.style.cursor = "pointer";
        header.addEventListener("click", () => {
            const col = header.getAttribute("data-col");
            data.sort((a, b) => {
                if (typeof a[col] === "string") {
                    return a[col].localeCompare(b[col]);
                } else {
                    return a[col] - b[col];
                }
            });
            renderTable();
        });
    });
});
