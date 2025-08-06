document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map').setView([39.8283, -98.5795], 4);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    const overlayLayers = {};
    
    document.querySelectorAll('.layer-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const layerType = this.dataset.layer;
            
            if (overlayLayers[layerType]) {
                map.removeLayer(overlayLayers[layerType]);
                delete overlayLayers[layerType];
                this.style.backgroundColor = '#4CAF50';
                return;
            }
            
            fetch(`/api/${layerType}`)
                .then(response => response.json())
                .then(data => {
                    const layer = L.geoJSON(data, {
                        style: getStyleForLayer(layerType),
                        onEachFeature: onEachFeature
                    }).addTo(map);
                    
                    overlayLayers[layerType] = layer;
                    this.style.backgroundColor = '#ff9800';
                });
        });
    });
    
    function getStyleForLayer(layerType) {
        const styles = {
            'soil-carbon': {color: '#8B4513', fillOpacity: 0.7},
            'biodiversity': {color: '#228B22', fillOpacity: 0.5},
            'erosion': {color: '#FF4500', fillOpacity: 0.7},
            'heat-islands': {color: '#FF0000', fillOpacity: 0.5}
        };
        return styles[layerType] || {};
    }
    
    function onEachFeature(feature, layer) {
        if (feature.properties && feature.properties.name) {
            layer.bindPopup(`<b>${feature.properties.name}</b><br>${feature.properties.description || ''}`);
        }
    }
});