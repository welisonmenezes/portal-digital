from api.Validations.Validators import Validators
from api.Model import Configuration

class ConfigurationValidation(Validators):
    def __init__(self, req):

        # objeto da requisiçõa
        self.req = req

        # objeto de resposta
        self.response = None

        # o modelo a ser validado
        self.model = Configuration

        # campos necessários
        self.fields = [
            'name',
            'phone',
            'email',
            'new_images',
            'old_images'
        ]

        # campos obrigatórios e suas respectivas mensagens de erro
        self.requiredFields = [
            ('name', 'O campo Nome é obrigatório'),
            ('phone', 'O campo Telefone é obrigatório'),
            ('email', 'O campo Email é obrigatório')
        ]

        # campos únicos e suas respectivas mensagens de erro
        self.uniqueFields = []

        # campos numéricos e suas respectivas mensagens de erro
        self.numberFields = []

        # campos de email e suas respectivas mensagens de erro
        self.emailFields = [
            ('email', 'O email informado é inválido')
        ]

        # campos de chave estrangeira e suas respectivas mensagens de erro
        self.foreignFields = []

        # campos com valor de data
        self.dateFields = []

        # apenas dois index por vez, o primeiro é a data que deve ser menor que a segunda data e maior ou igual a data corrente
        self.dateCompareFields = []

        self.imageFields = []
    