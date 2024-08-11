document.addEventListener("DOMContentLoaded", function() {
    const lengthInput = document.getElementById('id_length');
    const widthInput = document.getElementById('id_width');
    const serviceSelect = document.getElementById('service-select');
    const materialSelect = document.getElementById('material-select');
    const timeEstimateInput = document.getElementById('id_time_estimate');

    function calculateTimeEstimate() {
        const length = parseFloat(lengthInput.value) || 0;
        const width = parseFloat(widthInput.value) || 0;
        const serviceRate = parseFloat(serviceSelect.options[serviceSelect.selectedIndex].dataset.rate) || 1;
        const materialFactor = parseFloat(materialSelect.options[materialSelect.selectedIndex].dataset.factor) || 1;

        if (length > 0 && width > 0) {
            const area = length * width;
            const timeEstimate = (area * materialFactor) / serviceRate;
            timeEstimateInput.value = timeEstimate.toFixed(2); // Устанавливаем рассчитанное время в поле
        }
    }

    // Добавляем события на изменение значений для автоматического пересчета времени
    lengthInput.addEventListener('input', calculateTimeEstimate);
    widthInput.addEventListener('input', calculateTimeEstimate);
    serviceSelect.addEventListener('change', calculateTimeEstimate);
    materialSelect.addEventListener('change', calculateTimeEstimate);
});
