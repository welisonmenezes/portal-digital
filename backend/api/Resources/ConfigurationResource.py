from flask import  request
from flask_restful import Resource

from api.Validations.Auth import hasPermissionByToken
from api.Model import db, Configuration, ConfigurationSchema, Image
from api.Validations.ConfigurationValidations import ConfigurationValidation

class ConfigurationResource(Resource):
    def get(self):
        config_schema = ConfigurationSchema()
        config = Configuration.query.first()
        if config:
            config = config_schema.dump(config)
            return config, 200
        return {'message': 'Dados ainda não cadastrados'}, 404


    @hasPermissionByToken(['admin'], False, 'Configuration')
    def post(self):
        return manageConfiguration()
        

    @hasPermissionByToken(['admin'], False, 'Configuration')
    def put(self):
        return manageConfiguration()



def manageConfiguration():
    json_data = request.get_json()
    if json_data:
        config_schema = ConfigurationSchema()
        config = Configuration.query.first()
        if config:
            # validate the fields
            configValidator = ConfigurationValidation(json_data)
            if configValidator.isValid(config) == True:
                try:
                    config.name = json_data['name']
                    config.email = json_data['email']
                    config.phone = json_data['phone']
                    config.image = None

                    delete_images = set(json_data.get('old_images')) - set(json_data.get('new_images'))
                    add_images = set(json_data.get('new_images')) - set(json_data.get('old_images'))

                    for image_id in delete_images:
                        try:
                            id = int(image_id)
                        except:
                            return {'message': 'Os ID da imagem deve ser um número inteiro'}, 501
                        image = Image.query.get(id)
                        if not image:
                            return {'message': 'A imagem ' + str(image_id) + ' não existe na base de dados'}, 501
                        else:
                            if image in config.images:
                                config.images.remove(image)

                    for image_id in add_images:
                        try:
                            id = int(image_id)
                        except:
                            return {'message': 'Os ID da imagem deve ser um número inteiro'}, 501
                        image = Image.query.get(id)
                        if not image:
                            return {'message': 'A imagem ' + str(image_id) + ' não existe na base de dados'}, 501
                        else:
                            config.images.append(image)

                    db.session.commit()
                    config = config_schema.dump(config)
                    return {
                        'configuration': config,
                        'message': 'Dados salvos com sucesso'
                    }, 200
                except:
                    return {'message': 'Erro ao conectar com o banco de dados'}, 501
            else:
                return configValidator.response
        else:
            # validate the fields
            configValidator = ConfigurationValidation(json_data)
            if configValidator.isValid(None) == True:
                try:

                    config = Configuration(
                        json_data['name'],
                        json_data['phone'],
                        json_data['email']
                    )
                    db.session.add(config)

                    for image_id in json_data.get('new_images'):
                        try:
                            id = int(image_id)
                        except:
                            return {'message': 'Os ID da imagem deve ser um número inteiro'}, 501
                        image = Image.query.get(id)
                        if not image:
                            return {'message': 'A imagem ' + str(image_id) + ' não existe na base de dados'}, 501
                        else:
                            config.images.append(image)

                    db.session.commit()
                    config = config_schema.dump(config)
                    return {
                        'configuration': config,
                        'message': 'Configurações salvas com sucesso'
                    }, 201
                except:
                    db.session.rollback()
                    return {'message': 'Erro ao conectar com o banco de dados'}, 501
            else:
                return configValidator.response
    else:
        return {'message': 'Dados não enviados'}, 400