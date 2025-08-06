# Resilience Mapping Application

A web-based tool for tracking environmental resilience factors including:
- Soil carbon retention
- Biodiversity corridors
- Erosion hotspots
- Heat-island dynamics

## Installation

1. Clone this repository
2. Create a virtual environment: `python -m venv venv`
3. Activate the environment: `source venv/bin/activate` (Linux/Mac) or `venv\Scripts\activate` (Windows)
4. Install requirements: `pip install -r requirements.txt`

## Running the Application

1. Start the Flask server: `python app.py`
2. Open http://localhost:5000 in your browser

## Deployment

To deploy to production:
1. Set up a WSGI server like Gunicorn
2. Configure a production database (PostgreSQL recommended)
3. Deploy to a cloud provider (Heroku, AWS, Render, etc.)