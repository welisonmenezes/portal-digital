from api.Validations.Validators import Validators
from api.Model import Category

class CategoryValidation(Validators):
    def __init__(self, req):

        # objeto da requisiçõa
        self.req = req

        # objeto de resposta
        self.response = None

        # o modelo a ser validado
        self.model = Category

        # campos necessários
        self.fields = [
            'name',
            'description'
        ]

        # campos obrigatórios e suas respectivas mensagens de erro
        self.requiredFields = [
            ('name', 'O campo Nome é obrigatório')
        ]

        # campos únicos e suas respectivas mensagens de erro
        self.uniqueFields = [
            ('name', 'Uma categoria com este nome já existe')
        ]

        # campos numéricos e suas respectivas mensagens de erro
        self.numberFields = []

        # campos de email e suas respectivas mensagens de erro
        self.emailFields = []

        # campos de chave estrangeira e suas respectivas mensagens de erro
        self.foreignFields = []

        # campos com valor de data
        self.dateFields = []

        # apenas dois index por vez, o primeiro é a data que deve ser menor que a segunda data e maior ou igual a data corrente
        self.dateCompareFields = []

        self.imageFields = []
    