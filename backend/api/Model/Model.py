from flask_sqlalchemy import SQLAlchemy
from marshmallow import Schema, fields, validate
import datetime
from app import db, ma

now = datetime.datetime.now()

class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.Text(length=16000000, collation='utf8_bin'), nullable=False)
    created_at = db.Column(db.Date, default=now, nullable=False)
    updated_at = db.Column(db.Date, default=now, onupdate=now, nullable=False)

    def __init__(self, image):
        self.image = image

    def __repr__(self):
        return '<Image %r>' % self.id

class ImageSchema(ma.Schema):
    id = fields.Integer()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()


ConfigurationImage = db.Table('ConfigurationImage',
    db.Column('image_id', db.Integer, db.ForeignKey('image.id')),
    db.Column('configuration_id', db.Integer, db.ForeignKey('configuration.id'))
)


class Configuration(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45), nullable=False)
    phone = db.Column(db.String(45), nullable=False)
    email = db.Column(db.String(45), nullable=False)
    created_at = db.Column(db.Date, default=now, nullable=False)
    updated_at = db.Column(db.Date, default=now, onupdate=now, nullable=False)
    images = db.relationship('Image', secondary=ConfigurationImage)

    def __init__(self, name, phone, email):
        self.name = name
        self.phone = phone
        self.email = email

    def __repr__(self):
        return '<Configuration %r>' % self.id

class ConfigurationSchema(ma.Schema):
    id = fields.Integer()
    name = fields.String()
    phone = fields.String()
    email = fields.String()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    images = fields.Nested(ImageSchema, many=True)


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text(), nullable=False)
    genre = db.Column(db.String(15), nullable=False)
    status = db.Column(db.String(15), nullable=False)
    entry_date = db.Column(db.Date, nullable=False)
    departure_date = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.Date, default=now, nullable=False)
    updated_at = db.Column(db.Date, default=now, onupdate=now, nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey('image.id'), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=True)

    def __init__(self, title, description, content, genre, status, entry_date, departure_date, image_id, user_id, category_id=None):
        self.title = title
        self.description = description
        self.content = content
        self.genre = genre
        self.status = status
        self.entry_date = entry_date
        self.departure_date = departure_date
        self.image_id = image_id
        self.user_id = user_id
        self.category_id = category_id

    def __repr__(self):
        return '<Post %r>' % self.id

class PostSchema(ma.Schema):
    id = fields.Integer()
    title = fields.String()
    description = fields.String()
    content = fields.String()
    genre = fields.String()
    status = fields.String()
    entry_date = fields.DateTime()
    departure_date = fields.DateTime()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    image_id = fields.Integer()
    user_id = fields.Integer()
    category_id = fields.Integer()


class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45), nullable=False, unique=True)
    description = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.Date, default=now, nullable=False)
    updated_at = db.Column(db.Date, default=now, onupdate=now, nullable=False)

    def __init__(self, name, description):
        self.name = name
        self.description = description

    def __repr__(self):
        return '<Category %r>' % self.id

class CategorySchema(ma.Schema):
    id = fields.Integer()
    name = fields.String()
    description = fields.String()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    registry = db.Column(db.String(10), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(45), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    phone = db.Column(db.String(15), nullable=True)
    created_at = db.Column(db.Date, default=now, nullable=False)
    updated_at = db.Column(db.Date, default=now, onupdate=now, nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey('image.id'), nullable=True)

    def __init__(self, first_name, last_name, registry, password, role, email, phone, image_id):
        self.first_name = first_name
        self.last_name = last_name
        self.registry = registry
        self.password = password
        self.role = role
        self.email = email
        self.phone = phone
        self.image_id = image_id

    def __repr__(self):
        return '<User %r>' % self.id

class UserSchema(ma.Schema):
    id = fields.Integer()
    first_name = fields.String()
    last_name = fields.String()
    registry = fields.String()
    password = fields.String()
    role = fields.String()
    email = fields.String()
    phone = fields.String()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    image_id = fields.Integer()