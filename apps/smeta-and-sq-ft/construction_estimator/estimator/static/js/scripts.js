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
