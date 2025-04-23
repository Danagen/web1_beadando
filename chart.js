
document.addEventListener("DOMContentLoaded", () => {
    const rows = document.querySelectorAll("#chartTable tbody tr");
    const ctx = document.getElementById("lineChart").getContext("2d");

    let chart = null;

    rows.forEach(row => {
        row.addEventListener("click", () => {
            const cells = row.querySelectorAll("td");
            const label = cells[0].textContent;
            const values = Array.from(cells).slice(1).map(td => parseInt(td.textContent));

            if (chart) chart.destroy();

            chart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: ["Adat1", "Adat2", "Adat3", "Adat4", "Adat5"],
                    datasets: [{
                        label: `Adatok (${label})`,
                        data: values,
                        fill: false,
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });
    });
});
