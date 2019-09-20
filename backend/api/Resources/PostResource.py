from flask import  request
from flask_restful import Resource, reqparse
from sqlalchemy import or_, and_
from datetime import date, datetime
from api.Model import db, Post, PostSchema, User
from api.Validations.Auth import hasPermissionByToken, getJWTEncode, getJWTDecoded
from api.Validations.MustHaveId import mustHaveId
from api.Validations.PostValidations import PostValidation

class PostResource(Resource):
    def get(self):

        parser = reqparse.RequestParser()
        parser.add_argument('page', type=int)
        parser.add_argument('category', type=int)
        parser.add_argument('type')
        parser.add_argument('date')
        parser.add_argument('s')
        args = parser.parse_args()

        filter = ()
        page = 1
        filterPage = args['page']
        filterCategory = args['category']
        filterType = args['type']
        filterDate = args['date']
        filterSearch = args['s']
        if (filterPage):
            page = filterPage
        if filterCategory:
            filter = filter + (Post.category_id == filterCategory,)
        if filterType:
            filter = filter + (Post.genre == filterType,)
        if filterDate:
            if filterDate == 'current':
                try:
                    today = date.today().strftime('%d/%m/%Y')
                    day,month,year = today.split('/')
                    t_date = datetime.date(int(year), int(month), int(day))
                    filter = filter + (and_(Post.entry_date >= t_date, Post.departure_date >= t_date),)
                except:
                    return {'message': 'Desculpe, ocorrou um problema ao buscar pela data corrente'}, 500
            else:
                try:
                    givenDate = filterDate
                    year,month,day = givenDate.split('-')
                    f_date = datetime.date(int(year), int(month), int(day))
                    filter = filter + (and_(Post.entry_date >= f_date, Post.departure_date >= f_date),)
                except:
                    return {'message': 'O formato da data é inválido'}, 501
        if filterSearch:
            filter = filter + (or_(Post.content.like('%'+filterSearch+'%'), Post.title.like('%'+filterSearch+'%'), Post.description.like('%'+filterSearch+'%')),)

        post_schema = PostSchema(many=True)
        paginate = Post.query.filter(*filter).paginate(page=page, per_page=10, error_out=False)
        posts = paginate.items
        posts = post_schema.dump(posts)

        pages = []
        for p in paginate.iter_pages(left_edge=2, left_current=2, right_current=3, right_edge=2):
            pages.append(p)
        
        if posts:
            return {
                'data': posts,
                'pagination': {
                    'next_num': paginate.next_num,
                    'prev_num': paginate.prev_num,
                    'total': paginate.total,
                    'pages': pages
                }
            }, 200
        else:
            return {'message': 'Nenhum post encontrado'}, 404



    @hasPermissionByToken(['admin'], None, 'Post')
    def post(self):
        json_data = request.get_json()
        if json_data:
            userData = getJWTDecoded()
            user = User.query.filter_by(registry=userData['registry']).first()
            if user:
                postValidator = PostValidation(json_data)
                if postValidator.isValid(None) == True:
                    try:
                        post = Post(
                            json_data['title'],
                            json_data['description'],
                            json_data['content'],
                            json_data['genre'],
                            json_data['status'],
                            json_data['entry_date'],
                            json_data['departure_date'],
                            None,
                            user.id,
                            None)

                        if json_data['image_id'] != '':
                            post.image_id = json_data['image_id']

                        if json_data['category_id'] != '':
                            post.category_id = json_data['category_id']

                        db.session.add(post)
                        db.session.commit()
                        last_id = post.id
                        return {
                            'message': 'Post salvo com sucesso',
                            'id': last_id
                        }, 200
                    except:
                        db.session.rollback()
                        return {'message': 'Error ao conectar com o banco de dados'}, 501
                else:
                    return postValidator.response
            else:
                return {'message': 'O usuário para esta requisição não existe'}, 400
        else:
            return {'message': 'Dados não enviados'}, 400
        


    @hasPermissionByToken(['admin'], True, 'Post')
    @mustHaveId
    def put(self, id=None):
        json_data = request.get_json()
        if json_data:
            userData = getJWTDecoded()
            user = User.query.filter_by(registry=userData['registry']).first()
            if user:
                post = Post.query.filter_by(id=id).first()
                if post:
                    postValidator = PostValidation(json_data)
                    if postValidator.isValid(post) == True:
                        try:
                            post.title = json_data['title']
                            post.description = json_data['description']
                            post.content = json_data['content']
                            post.content = json_data['content']
                            post.genre = json_data['genre']
                            post.entry_date = json_data['entry_date']
                            post.departure_date = json_data['departure_date']
                            post.image_id = None
                            post.category_id = None

                            if json_data['image_id'] != '':
                                post.image_id = json_data['image_id']

                            if json_data['category_id'] != '':
                                post.category_id = json_data['category_id']

                            db.session.commit()
                            return {
                                'message': 'Post editado com sucesso',
                                'id': id
                            }, 200
                        except:
                            db.session.rollback()
                            return {'message': 'Erro ao conectar com o banco de dados'}, 501
                    else:
                        return postValidator.response
                else:
                    return {'message': 'Post não encontrado'}, 404
            else:
                return {'message': 'O usuário para esta requisição não existe'}, 400
        else:
            return {'message': 'Dados não enviados'}, 400



    @hasPermissionByToken(['admin'], True, 'Post')
    @mustHaveId
    def delete(self, id=None):
        post = Post.query.filter_by(id=id).first()
        if post:
            try:
                db.session.delete(post)
                db.session.commit()
                return {
                    'message': 'Post deletado com sucesso',
                    'id': id
                }, 200
            except:
                db.session.rollback()
                return {'message': 'Erro ao conectar com o banco de dados'}, 501
        else:
            return {'message': 'Post não encontrado'}, 404



class PostByIdResource(Resource):
    @mustHaveId
    def get(self, id=None):
        post_schema = PostSchema()
        post = Post.query.get(id)
        if post:
            post = post_schema.dump(post)
            return post, 200
        return {'message': 'Post não encontrado'}, 404