
class Vehicle {
    constructor(type) {
        this.type = type;
    }

    describe() {
        return `Ez egy jármű: ${this.type}`;
    }
}

class Car extends Vehicle {
    constructor(brand, model) {
        super("autó");
        this.brand = brand;
        this.model = model;
    }

    info() {
        return `${this.describe()} - Márka: ${this.brand}, Modell: ${this.model}`;
    }
}

document.getElementById("addCarBtn").addEventListener("click", () => {
    const cars = {
        "Toyota": ["Corolla", "Yaris", "Camry"],
        "Ford": ["Focus", "Mondeo", "Fiesta"],
        "BMW": ["X5", "3-as", "M4"],
        "Audi": ["A4", "Q5", "A6"],
        "Skoda": ["Octavia", "Fabia", "Superb"]
    };

    const brands = Object.keys(cars);
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const modelList = cars[brand];
    const model = modelList[Math.floor(Math.random() * modelList.length)];

    const car = new Car(brand, model);

    const p = document.createElement("p");
    p.textContent = car.info();
    document.getElementById("carList").appendChild(p);
});
