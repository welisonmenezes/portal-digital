from flask import request
from flask_restful import Resource
from app import bcrypt
from api.Model import User
from api.Validations.Auth import getJWTEncode

class AuthResource(Resource):
    def post(self):
        json_data = request.get_json()
        if json_data:
            if not json_data.get('registry'):
                return {'message': 'O campo matrícula é obrigatório'}, 501
            if not json_data.get('password'):
                return {'message': 'O campo senha é obrigatório'}, 501
            user = User.query.filter_by(registry=json_data['registry']).first()
            if user:
                if bcrypt.check_password_hash(user.password, json_data['password']):
                    token = getJWTEncode(user).decode('utf-8')
                    return {'token': token}
                else:
                    return {'message': 'Credenciais inválidas'}, 501
            else:
                return {'message': 'Credenciais inválidas'}, 501
        else:
            return {'message': 'Dados não enviados'}, 400
