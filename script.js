document.addEventListener('DOMContentLoaded', () => {
    const garland = document.querySelector('.circular-garland');
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan'];
    const step = 30; // Расстояние между лампочками
    const totalBulbs = Math.floor(window.innerWidth / step) * Math.floor(window.innerHeight / step); // Количество лампочек на экране

    // Создаем лампочки
    for (let i = 0; i < totalBulbs; i++) {
        const bulb = document.createElement('div');
        bulb.classList.add('bulb');
        garland.appendChild(bulb);
    }

    // Расположение лампочек в спиральной змейке
    function positionBulbs() {
        const gridWidth = Math.floor(window.innerWidth / step); // Ширина сетки в лампочках
        const gridHeight = Math.floor(window.innerHeight / step); // Высота сетки в лампочках
        
        let x = 0, y = 0; // Начальные координаты
        let dx = 1, dy = 0; // Направление вправо
        let minX = 0, maxX = gridWidth - 1;
        let minY = 0, maxY = gridHeight - 1;
        
        const bulbs = document.querySelectorAll('.bulb');
        bulbs.forEach((bulb) => {
            // Устанавливаем позицию для лампочки
            bulb.style.left = `${x * step}px`;
            bulb.style.top = `${y * step}px`;
            
            // Изменяем направление на границах
            if (dx === 1 && x >= maxX) { dx = 0; dy = 1; minY++; }       // Поворот вниз
            else if (dy === 1 && y >= maxY) { dx = -1; dy = 0; maxX--; } // Поворот влево
            else if (dx === -1 && x <= minX) { dx = 0; dy = -1; maxY--; } // Поворот вверх
            else if (dy === -1 && y <= minY) { dx = 1; dy = 0; minX++; }  // Поворот вправо
            
            // Обновляем координаты
            x += dx;
            y += dy;
        });
    }

    // Смена цветов лампочек
    function changeBulbColors() {
        const bulbs = document.querySelectorAll('.bulb');
        bulbs.forEach(bulb => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            bulb.style.backgroundColor = randomColor;
            bulb.style.boxShadow = `0 0 15px 5px ${randomColor}`;
        });
    }

    // Устанавливаем начальные позиции и запускаем эффекты
    positionBulbs();
    setInterval(changeBulbColors, 1000);

    // Обновляем расположение при изменении размера окна
    window.addEventListener('resize', () => {
        garland.innerHTML = ''; // Очищаем старые лампочки
        positionBulbs(); // Заново устанавливаем их позиции
    });
});
