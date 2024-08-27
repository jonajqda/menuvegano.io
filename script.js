// Asegúrate de que jsPDF esté cargado
const { jsPDF } = window.jspdf;

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const meals = ['Desayuno', 'Almuerzo', 'Cena'];
const recipes = {
    'Desayuno': [
        'Panqueques veganos con compota de frutos rojos',
        'Revuelto de tofu con verduras',
        'Avena con frutas y nueces',
        'Tostada de aguacate con brotes',
        'Bowl de smoothie con granola',
        'Burrito de desayuno vegano',
        'Tortilla de harina de garbanzo'
    ],
    'Almuerzo': [
        'Ensalada de quinoa y frijoles negros',
        'Sopa de lentejas y verduras',
        'Wrap vegetal con hummus',
        'Quiche de espinacas y champiñones',
        'Salteado de verduras con tofu',
        'Bowl de arroz de coliflor',
        'Sándwich de ensalada de garbanzos'
    ],
    'Cena': [
        'Lasaña de verduras',
        'Pimientos rellenos con quinoa',
        'Berenjena a la parmesana',
        'Curry de verduras con arroz',
        'Espaguetis de calabacín con pesto',
        'Filetes de portobello',
        'Chili vegano con pan de maíz'
    ]
};
const ingredients = {
    'Panqueques veganos con compota de frutos rojos': {'Harina': 200, 'Leche vegetal': 250, 'Frutos rojos mixtos': 150, 'Sirope de arce': 50},
    'Revuelto de tofu con verduras': {'Tofu': 200, 'Pimiento': 50, 'Cebolla': 50, 'Espinacas': 50},
    'Avena con frutas y nueces': {'Avena': 50, 'Leche vegetal': 100, 'Frutas mixtas': 100, 'Nueces mixtas': 30},
    'Tostada de aguacate con brotes': {'Pan integral': 2, 'Aguacate': 1, 'Brotes': 30},
    'Bowl de smoothie con granola': {'Frutas congeladas': 150, 'Leche vegetal': 200, 'Granola': 50},
    'Burrito de desayuno vegano': {'Tortilla integral': 1, 'Tofu': 100, 'Pimiento': 30, 'Cebolla': 30},
    'Tortilla de harina de garbanzo': {'Harina de garbanzo': 100, 'Agua': 150, 'Cebolla': 50},
    // Agregar más recetas e ingredientes aquí
};

function updatePortions() {
    // Código para actualizar las porciones en función de la cantidad seleccionada
    // Puedes añadir lógica aquí si es necesario
}

function generateAndDownloadShoppingList() {
    const doc = new jsPDF();
    doc.text('Lista de Compras', 20, 20);

    const items = {};
    for (const meal in recipes) {
        recipes[meal].forEach(recipe => {
            if (ingredients[recipe]) {
                for (const [ingredient, quantity] of Object.entries(ingredients[recipe])) {
                    if (!items[ingredient]) items[ingredient] = 0;
                    items[ingredient] += quantity;
                }
            }
        });
    }

    let y = 30;
    for (const [ingredient, quantity] of Object.entries(items)) {
        doc.text(`${ingredient}: ${quantity}g`, 20, y);
        y += 10;
    }

    doc.save('lista_de_compras.pdf');
}

function generateAndDownloadMenu() {
    const doc = new jsPDF();
    doc.text('Menú Semanal', 20, 20);

    days.forEach((day, index) => {
        doc.text(day, 20, 30 + (index * 60));
        meals.forEach((meal, mealIndex) => {
            const recipe = recipes[meal][index % recipes[meal].length];
            doc.text(`${meal}: ${recipe}`, 20, 40 + (index * 60) + (mealIndex * 10));
        });
    });

    doc.save('menu_semanal.pdf');
}

function downloadPreparationInstructions() {
    const doc = new jsPDF();
    doc.text('Instrucciones de Preparación', 20, 20);

    let y = 30;
    Object.keys(recipes).forEach(meal => {
        doc.text(meal, 20, y);
        y += 10;
        recipes[meal].forEach(recipe => {
            doc.text(`- ${recipe}`, 20, y);
            y += 10;
        });
        y += 10;
    });

    doc.save('instrucciones_de_preparacion.pdf');
}

document.addEventListener('DOMContentLoaded', () => {
    const weekPlanner = document.getElementById('weekPlanner');
    days.forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        dayDiv.innerHTML = `<h3>${day}</h3>`;
        meals.forEach(meal => {
            const select = document.createElement('select');
            select.id = `${day}-${meal}`;
            select.innerHTML = recipes[meal].map((recipe, index) => `<option value="${recipe}">${recipe}</option>`).join('');
            dayDiv.appendChild(select);
        });
        weekPlanner.appendChild(dayDiv);
    });
});
