document.addEventListener("DOMContentLoaded", function() {
    const serviceSelect = document.getElementById('service-select');
    const materialSelect = document.getElementById('material-select');
    
    serviceSelect.addEventListener('change', function() {
        const serviceId = this.value;

        // Очистка списка материалов перед загрузкой новых
        materialSelect.innerHTML = '';

        if (serviceId) {
            fetch(`/get-materials/?service_id=${serviceId}`)
                .then(response => response.json())
                .then(data => {
                    data.materials.forEach(material => {
                        const option = document.createElement('option');
                        option.value = material.id;
                        option.textContent = material.name;
                        materialSelect.appendChild(option);
                    });
                });
        }
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const serviceSelect = document.getElementById('service-select');
    const materialSelect = document.getElementById('material-select');
    const lengthInput = document.getElementById('id_length');
    const widthInput = document.getElementById('id_width');
    const timeEstimateInput = document.getElementById('id_time_estimate');

    serviceSelect.addEventListener('change', function() {
        const serviceId = this.value;

        materialSelect.innerHTML = '';

        if (serviceId) {
            fetch(`/get-materials/?service_id=${serviceId}`)
                .then(response => response.json())
                .then(data => {
                    data.materials.forEach(material => {
                        const option = document.createElement('option');
                        option.value = material.id;
                        option.textContent = material.name;
                        materialSelect.appendChild(option);
                    });
                });
        }
    });

    // Функция для расчета времени на основе длины и ширины
    function calculateTime() {
        const length = parseFloat(lengthInput.value) || 0;
        const width = parseFloat(widthInput.value) || 0;

        // Простая формула расчета времени: длина + ширина деленные на 10 (можно адаптировать под свои нужды)
        const estimatedTime = (length + width) / 10;

        timeEstimateInput.value = estimatedTime.toFixed(2);  // Устанавливаем рассчитанное время
    }

    // Обработчики событий для автоматического расчета времени
    lengthInput.addEventListener('input', calculateTime);
    widthInput.addEventListener('input', calculateTime);
});
