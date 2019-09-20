from flask import  request
from flask_restful import Resource

from api.Model import db, Configuration, ConfigurationSchema, Image

class ConfigurationResource(Resource):
    def get(self):
        config_schema = ConfigurationSchema()
        config = Configuration.query.first()
        if config:
            config = config_schema.dump(config)
            return config, 200
        return {
            'error': True,
            'code': '101',
            'message': 'Dados ainda não cadastrados'
        }, 400


    def post(self):
        return manageConfiguration()
        

    def put(self):
        return manageConfiguration()


def manageConfiguration():
    config_schema = ConfigurationSchema()
    config = Configuration.query.first()
    if config:
        try:
            config.name = 'updated33'

            image = Image.query.get(1)
            config.images.append(image)
            #config.images.remove(image)

            db.session.commit()
            config = config_schema.dump(config)
            return {
                'configuration': config,
                'message': 'Dados salvos com sucesso'
            }, 200
        except:
            return {
                'error': True,
                'code': '101',
                'message': 'Error ao conectar como banco de dados'
            }, 501
    else:
        try:
            config = Configuration('add', '2222-4444', 'add@email.com')
            db.session.add(config)

            image = Image.query.get(1)
            config.images.append(image)
            #config.images.remove(image)

            print(config)

            db.session.commit()
            config = config_schema.dump(config)
            return {
                'configuration': config,
                'message': 'Dados cirados com sucesso'
            }, 201
        except:
            db.session.rollback()
            return {
                'error': True,
                'code': '101',
                'message': 'Error ao conectar como banco de dados'
            }, 501