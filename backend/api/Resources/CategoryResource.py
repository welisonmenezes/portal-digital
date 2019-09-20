from flask import request
from flask_restful import Resource

from api.Model import db, Category, CategorySchema, Post

from api.Validations.Auth import hasPermissionByToken, getJWTEncode
from api.Validations.MustHaveId import mustHaveId

class CategoryResource(Resource):
    def get(self, id=None):
        if not id:
            args = request.args
            page = 1
            if (args and args['page']):
                page = int(args['page'])
            category_schema = CategorySchema(many=True)
            paginate = Category.query.filter(id==None).paginate(page=page, per_page=10, error_out=False)
            categories = paginate.items
            categories = category_schema.dump(categories)
            if categories:
                return {
                    'data': categories,
                    'pagination': {
                        'next_num': paginate.next_num,
                        'prev_num': paginate.prev_num,
                        'total': paginate.total
                    }
                }, 200
            else:
                return {
                    'error': True,
                    'code': '101',
                    'message': 'Nenhuma categoria encontrada'
                }, 404
        else:
            category_schema = CategorySchema()
            category = Category.query.get(id)
            if category:
                category = category_schema.dump(category)
                return category, 200
            return {
                'error': True,
                'code': '101',
                'message': 'Nenhuma categoria encontrada'
            }, 404

    def post(self):
        json_data = request.get_json()
        if json_data:
            try:
                category = Category(
                    json_data['name'],
                    json_data['description'])

                db.session.add(category)
                db.session.commit()
                last_id = category.id
                return {
                    'message': 'Categoria salva com sucesso',
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
                'code': '103',
                'message': 'dados não enviados'
            }, 400

    @mustHaveId
    def put(self, id=None):
        json_data = request.get_json()
        if json_data:
            category = Category.query.filter_by(id=id).first()
            if category:
                try:
                    category.name = json_data['name']
                    category.description = json_data['description']
                    db.session.commit()
                    return {
                        'message': 'Categoria editada com sucesso',
                        'id': id
                    }, 200
                except:
                    db.session.rollback()
                    return {
                        'error': True,
                        'code': '103',
                        'message': 'Erro ao tentar editar a categoria'
                    }, 500
            else:
                return {
                    'error': True,
                    'code': '103',
                    'message': 'Post não encontrado'
                }, 404
        else:
            return {
                'error': True,
                'code': '103',
                'message': 'Dados não enviados'
            }, 400

    @mustHaveId
    def delete(self, id=None):
        category = Category.query.filter_by(id=id).first()
        if category:
            try:
                somepost = Post.query.filter_by(category_id=id).first()
                print(somepost)
                if not somepost:
                    db.session.delete(category)
                    db.session.commit()
                    return {
                        'message': 'Categoria deletada com sucesso',
                        'id': id
                    }, 200
                else:
                    return {
                        'error': True,
                        'message': 'A categoria não pode ser deletada pois existem posts relacionadas a ela na base de dados.',
                        'id': id
                    }, 405
            except:
                db.session.rollback()
                return {
                    'error': True,
                    'code': '103',
                    'message': 'Erro ao tentar deletar a categoria'
                }, 500
        else:
            return {
                'error': True,
                'code': '103',
                'message': 'Categoria não encontrada'
            }, 404

