from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt

# create a Flask app
app = Flask(__name__, template_folder='ui', static_folder='ui/static')

# apply app configurations
app.config.from_pyfile('config.py')

# initialize app dependencies
db = SQLAlchemy(app)
ma = Marshmallow(app)
bcrypt = Bcrypt(app)

# routes all nonexistent route to / (UI)
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html'), 200

# blueprint api (API)
from api import api_bp
app.register_blueprint(api_bp)

if __name__ == "__main__":
    app.run()