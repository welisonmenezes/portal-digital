from flask import request
import jwt
from app import app

from api.Model import User, Post

def hasPermissionByToken(roles, canSeeOwn=False, modelName=None):                            
    def decorator(fn):                                            
        def decorated(*args,**kwargs): 
            if getJWTDecoded():
                try:
                    decoded = getJWTDecoded()
                    user = User.query.filter_by(registry=decoded['registry']).first()
                    if user:
                        if user.role in roles:
                            return fn(*args,**kwargs)
                        else:
                            if modelName == 'User' and canSeeOwn:
                                if 'id' in kwargs:
                                    if kwargs['id'] == user.id:
                                        return fn(*args,**kwargs)
                            if modelName == 'Post' and canSeeOwn:
                                if 'id' in kwargs:
                                    post = Post.query.filter_by(id=kwargs['id']).first()
                                    if post and canSeeOwn:
                                        if user.id == post.user_id:
                                            return fn(*args,**kwargs)
                            return {'message': 'Permissão negada'}, 403
                    else:
                        return {'message': 'O usário não existe'}, 403
                except:
                    return {'message': 'Token inválido'}, 403
            else:
                return {'message': 'Token não enviado'}, 403
        return decorated                                          
    return decorator

def getJWTEncode(user):
    return jwt.encode({'registry': user.registry, 'role': user.role}, app.config['JWT_SECRET_KEY'], algorithm='HS256')

def getJWTDecoded():
    token = request.headers.get('Authorization')
    if not token:
        return None
    decoded = jwt.decode(token, app.config['JWT_SECRET_KEY'], algorithms=['HS256'])
    return decoded
