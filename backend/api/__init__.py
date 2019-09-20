from flask import current_app, Blueprint
from flask_restful import Api
from flask_cors import CORS

# initialize the api blueprint
api_bp = Blueprint('api', __name__, url_prefix='/api')
cors = CORS(api_bp, resources={r"/api/*": {"origins": "*"}})
api = Api(api_bp)

# import the resources
from api.Resources import *

# register the resources
api.add_resource(UserByIdResource, '/user/<int:id>')
api.add_resource(UserResource, '/user', '/user/<int:id>')

api.add_resource(PostByIdResource, '/post/<int:id>')
api.add_resource(PostResource, '/post', '/post/<int:id>')

api.add_resource(MediaResource, '/media/<int:id>')
api.add_resource(ImageByIdResource,'/image/<int:id>')
api.add_resource(ImageResource, '/image', '/image/<int:id>')

api.add_resource(ConfigurationResource, '/configuration')
api.add_resource(CategoryResource, '/category', '/category/<int:id>')
api.add_resource(AuthResource, '/auth')