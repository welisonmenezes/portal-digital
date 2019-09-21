from flask import request
from flask_restful import Resource, reqparse
from api.Model import db, Category, CategorySchema, Post
from api.Validations.Auth import hasPermissionByToken
from api.Validations.MustHaveId import mustHaveId
from api.Validations.CategoryValidations import CategoryValidation

class CategoryResource(Resource):
    def get(self):

        parser = reqparse.RequestParser()
        parser.add_argument('page', type=int)
        parser.add_argument('name')
        args = parser.parse_args()

        filter = ()
        page = 1
        filterPage = args['page']
        filterName = args['name']

        if (filterPage):
            page = filterPage
        if filterName:
            filter = filter + (Category.name.like('%'+filterName+'%'),)

        category_schema = CategorySchema(many=True)
        paginate = Category.query.filter(*filter).paginate(page=page, per_page=10, error_out=False)
        categories = paginate.items
        categories = category_schema.dump(categories)

        pages = []
        for p in paginate.iter_pages(left_edge=2, left_current=2, right_current=3, right_edge=2):
            pages.append(p)

        if categories:
            return {
                'data': categories,
                'pagination': {
                    'next_num': paginate.next_num,
                    'prev_num': paginate.prev_num,
                    'total': paginate.total,
                    'pages': pages
                }
            }, 200
        else:
            return {
                'error': True,
                'code': '101',
                'message': 'Nenhuma categoria encontrada'
            }, 404



    @hasPermissionByToken(['admin'], None, 'Category')
    def post(self):
        json_data = request.get_json()
        if json_data:
            # validate the fields
            categoryValidator = CategoryValidation(json_data)
            if categoryValidator.isValid(None) == True:
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
                    return {'message': 'Erro ao conectar com o banco de dados'}, 501
            else:
                return categoryValidator.response
        else:
            return {'message': 'Dados não enviados'}, 400



    @hasPermissionByToken(['admin'], None, 'Category')
    @mustHaveId
    def put(self, id=None):
        json_data = request.get_json()
        if json_data:
            category = Category.query.filter_by(id=id).first()
            if category:
                # validate the fields
                categoryValidator = CategoryValidation(json_data)
                if categoryValidator.isValid(category) == True:
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
                        return {'message': 'Erro ao conectar com o banco de dados'}, 501
                else:
                    return categoryValidator.response
            else:
                return {'message': 'Categoria não encontrada'}, 404
        else:
            return {'message': 'Dados não enviados'}, 400



    @hasPermissionByToken(['admin'], None, 'Category')
    @mustHaveId
    def delete(self, id=None):
        category = Category.query.filter_by(id=id).first()
        if category:
            try:
                somepost = Post.query.filter_by(category_id=id).first()
                if not somepost:
                    db.session.delete(category)
                    db.session.commit()
                    return {
                        'message': 'Categoria deletada com sucesso',
                        'id': id
                    }, 200
                else:
                    return {'message': 'A categoria não pode ser deletada pois existem posts relacionadas a ela na base de dados.'}, 400
            except:
                db.session.rollback()
                return {'message': 'Erro ao conectar com o banco de dados'}, 501
        else:
            return {'message': 'Categoria não encontrada'}, 404



class CategoryByIdResource(Resource):
    @mustHaveId
    def get(self, id=None):
        category_schema = CategorySchema()
        category = Category.query.get(id)
        if category:
            category = category_schema.dump(category)
            return category, 200
        return {'message': 'Categoria não encontrada'}, 404