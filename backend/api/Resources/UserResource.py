from flask import request
from flask_restful import Resource, reqparse
from sqlalchemy import or_
from app import bcrypt
from api.Model import db, User, UserSchema, Image, Post
from api.Validations.Auth import hasPermissionByToken
from api.Validations.MustHaveId import mustHaveId
from api.Validations.UserValidations import UserValidation

class UserResource(Resource):
    @hasPermissionByToken(['admin'], False, 'User')
    def get(self):
        
        parser = reqparse.RequestParser()
        parser.add_argument('page', type=int)
        parser.add_argument('role')
        parser.add_argument('name')
        args = parser.parse_args()

        filter = ()
        page = 1
        filterPage = args['page']
        filterRole = args['role']
        filterName = args['name']

        if (filterPage):
            page = filterPage
        if filterRole:
            filter = filter + (User.role == filterRole,)
        if filterName:
            filter = filter + (or_(User.first_name.like('%'+filterName+'%'), User.last_name.like('%'+filterName+'%')),)
        
        user_schema = UserSchema(many=True)
        paginate = User.query.filter(*filter).paginate(page=page, per_page=10, error_out=False)
        users = paginate.items
        users = user_schema.dump(users)

        pages = []
        for p in paginate.iter_pages(left_edge=2, left_current=2, right_current=3, right_edge=2):
            pages.append(p)
            
        if users:
            return {
                'data': users,
                'pagination': {
                    'next_num': paginate.next_num,
                    'prev_num': paginate.prev_num,
                    'total': paginate.total,
                    'pages': pages
                }
            }, 200
        else:
            return {'message': 'Nenhum usuário encontrado'}, 404

    @hasPermissionByToken(['admin'], None, 'User')
    def post(self):
        json_data = request.get_json()
        if json_data:
            # validate the fields
            userValidator = UserValidation(json_data)
            if userValidator.isValid(None) == True:
                try:
                    user = User(
                        json_data['first_name'],
                        json_data['last_name'],
                        json_data['registry'],
                        bcrypt.generate_password_hash(json_data['password']),
                        json_data['role'],
                        json_data['email'],
                        json_data['phone'],
                        None)
                    if json_data['image_id'] != '':
                        user.image_id = json_data['image_id']
                    db.session.add(user)
                    db.session.commit()
                    last_id = user.id
                    return {
                        'message': 'Usuário salvo com sucesso',
                        'id': last_id
                    }, 200
                except:
                    db.session.rollback()
                    return {'message': 'Erro ao conectar com o banco de dados'}, 501
            else:
                return userValidator.response
        else:
            return {'message': 'Dados não enviados'}, 400


    @hasPermissionByToken(['admin'], True, 'User')
    @mustHaveId
    def put(self, id=None):
        json_data = request.get_json()
        if json_data:
            user = User.query.filter_by(id=id).first()
            if user:
                # validate the fields
                userValidator = UserValidation(json_data)
                if userValidator.isValid(user) == True:
                    try:
                        user.first_name = json_data['first_name']
                        user.last_name = json_data['last_name']
                        user.registry = json_data['registry']
                        user.role = json_data['role']
                        user.email = json_data['email']
                        user.phone = json_data['phone']
                        user.image_id = None

                        if json_data['image_id'] != '':
                            user.image_id = json_data['image_id']

                        if json_data['password'] != '':
                            pw_hash = bcrypt.generate_password_hash(json_data['password'])
                            user.password = pw_hash

                        db.session.commit()
                        return {
                            'message': 'Usuário editado com sucesso',
                            'id': id
                        }, 200
                    except:
                        db.session.rollback()
                        return {'message': 'Erro ao conectar com o banco de dados'}, 501
                else:
                    return userValidator.response
            else:
                return {'message': 'Usuário não encontrado'}, 404
        else:
            return {'message': 'Dados não enviados'}, 400


    @hasPermissionByToken(['admin'], False, 'User')
    @mustHaveId
    def delete(self, id=None):
        post = Post.query.filter_by(user_id=id).first()
        if not post:
            user = User.query.filter_by(id=id).first()
            if user:
                try:
                    db.session.delete(user)
                    db.session.commit()
                    return {
                        'message': 'Usuário deletado com sucesso',
                        'id': id
                    }, 200
                except:
                    db.session.rollback()
                    return {'message': 'Erro ao conectar com o banco de dados'}, 501
            else:
                return {'message': 'Usuário não encontrado'}, 404
        else:
            return {'message': 'O usuário não pode ser deletado pois possui posts relacionados a ele'}, 501



class UserByIdResource(Resource):
    @hasPermissionByToken(['admin'], True, 'User')
    @mustHaveId
    def get(self, id=None):
        user_schema = UserSchema()
        user = User.query.get(id)
        if user:
            user = user_schema.dump(user)
            return user, 200
        return {'message': 'Usuário não encontrado'}, 404