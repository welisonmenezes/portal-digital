from flask import  request
from flask_restful import Resource
import sys
import base64
import re

from api.Model import db, Image, ImageSchema

from api.Validations.Auth import hasPermissionByToken, getJWTEncode
from api.Validations.MustHaveId import mustHaveId

from api.Utils import getBase64Size

class ImageResource(Resource):
    def get(self, id=None):
        if not id:
            args = request.args
            page = 1
            if (args and args['page']):
                page = int(args['page'])
            images_schema = ImageSchema(many=True)
            paginate = Image.query.filter(id==None).paginate(page=page, per_page=1, error_out=False)
            images = paginate.items
            images = images_schema.dump(images)
            return {
                'data': images,
                'pagination': {
                    'next_num': paginate.next_num,
                    'prev_num': paginate.prev_num,
                    'total': paginate.total
                }
            }, 200
        else:
            image_schema = ImageSchema()
            image = Image.query.get(id)
            if image:
                image = image_schema.dump(image)
                return image, 200
            return {
                'error': True,
                'code': '103',
                'message': 'Imagem não encontrada'
            }, 404


    def post(self):
        json_data = request.get_json()
        if json_data:
            if (int(getBase64Size(json_data['image'])) <= int(5017969)):
                baseType = re.search('data:image/(.+?);base64,', json_data['image'])
                if (baseType and ( baseType.group(1) == 'png' or
                                    baseType.group(1) == 'jpg' or
                                    baseType.group(1) == 'jpeg' or
                                    baseType.group(1) == 'gif') ):
                    try:
                        image = Image(json_data['image'])
                        db.session.add(image)
                        db.session.commit()
                        last_id = image.id
                        return {
                            'message': 'Imagem salva com sucesso',
                            'id': last_id
                        }, 200
                    except:
                        db.session.rollback()
                        return {
                            'error': True,
                            'code': '101',
                            'message': 'Error ao conectar como banco de dados'
                        }, 501
                else:
                    return {
                        'error': True,
                        'code': '104',
                        'message': 'Tipo de arquivo inválido'
                    }, 400
            else:
                return {
                        'error': True,
                        'code': '102',
                        'message': 'O tamanho da imagem não deve exceder 5mb'
                    }, 400
        else:
            return {
                        'error': True,
                        'code': '103',
                        'message': 'O campo image não pode ser vazio'
                    }, 400
        

    @mustHaveId
    def put(self, id=None):
        json_data = request.get_json()
        if json_data:
            image = Image.query.filter_by(id=id).first()
            if image:
                try:
                    image.image = json_data['image']
                    db.session.commit()
                    return {
                        'message': 'Imagem editada com sucesso',
                        'id': id
                    }, 200
                except:
                    db.session.rollback()
                    return {
                        'error': True,
                        'code': '103',
                        'message': 'Erro ao tentar editar a imagem'
                    }, 500
            else:
               return {
                    'error': True,
                    'code': '103',
                    'message': 'Imagem não encontrada'
                }, 404
        else:
            return {
                'error': True,
                'code': '103',
                'message': 'O Campo image não pode ser vazio'
            }, 400


    @mustHaveId
    def delete(self, id=None):
        image = Image.query.filter_by(id=id).first()
        if image:
            try:
                db.session.delete(image)
                db.session.commit()
                return {
                    'message': 'Imagem deletada com sucesso',
                    'id': id
                }, 200
            except:
                db.session.rollback()
                return {
                    'error': True,
                    'code': '103',
                    'message': 'Erro ao tentar deletar a imagem'
                }, 500
        else:
            return {
                'error': True,
                'code': '103',
                'message': 'Imagem não encontrada'
            }, 404

