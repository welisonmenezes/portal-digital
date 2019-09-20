from api.Validations.Validators import Validators

from api.Model import Post, Category, Image

class PostValidation(Validators):
    def __init__(self, req):

        # objeto da requisiçõa
        self.req = req

        # objeto de resposta
        self.response = None

        # o modelo a ser validado
        self.model = Post

        # campos necessários
        self.fields = [
            'title',
            'description',
            'content',
            'genre',
            'status',
            'entry_date',
            'departure_date',
            'image_id',
            'category_id'
        ]

        # campos obrigatórios e suas respectivas mensagens de erro
        self.requiredFields = [
            ('title', 'O campo Título é obrigatório'),
            ('description', 'O campo Descrição é obrigatório'),
            ('content', 'O campo Conteúdo é obrigatório'),
            ('genre', 'O campo Tipo é obrigatório'),
            ('status', 'O campo Status é obrigatório'),
            ('entry_date', 'O campo Data de Entrada é obrigatório'),
            ('departure_date', 'O campo Data de Saída é obrigatório')
        ]

        # campos únicos e suas respectivas mensagens de erro
        self.uniqueFields = []

        # campos numéricos e suas respectivas mensagens de erro
        self.numberFields = [
            ('image_id', 'O id da imagem deve ser um número'),
            ('category_id', 'O id da categoria deve ser um número')
        ]

        # campos de email e suas respectivas mensagens de erro
        self.emailFields = []

        # campos de chave estrangeira e suas respectivas mensagens de erro
        self.foreignFields = [
            ( Image, ('image_id', 'A imagem informada não existe') ),
            ( Category, ('category_id', 'A categoria informada não existe') )
        ]

        # campos com valor de data
        self.dateFields = [
            'entry_date',
            'departure_date',
        ]

        # apenas dois index por vez, o primeiro é a data que deve ser menor que a segunda data e maior ou igual a data corrente
        self.dateCompareFields = [
            'entry_date',
            'departure_date',
        ]

    