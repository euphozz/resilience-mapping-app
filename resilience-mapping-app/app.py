from flask import Flask, render_template, jsonify
import json
import os

app = Flask(__name__)

# Load sample data
def load_geojson(filename):
    with open(f'data/{filename}') as f:
        return json.load(f)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/soil-carbon')
def soil_carbon():
    return jsonify(load_geojson('soil_data.geojson'))

@app.route('/api/biodiversity')
def biodiversity():
    return jsonify(load_geojson('biodiversity.geojson'))

@app.route('/api/erosion')
def erosion():
    return jsonify({
        "type": "FeatureCollection",
        "features": []
    })

@app.route('/api/heat-islands')
def heat_islands():
    return jsonify({
        "type": "FeatureCollection",
        "features": []
    })

if __name__ == '__main__':
    app.run(debug=True)