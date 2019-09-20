def mustHaveId(fn):
    def wrapper(*args,**kwargs):
        if not kwargs.get('id'):
            return {'message': 'Identificador não enviado'}, 400 
        return fn(*args,**kwargs)
    return wrapper