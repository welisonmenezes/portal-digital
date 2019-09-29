import re
from datetime import date
import datetime
from api.Utils import getBase64Size

class Validators():

    # percorre todas as validações necessários
    def isValid(self, currentResult=None):

        # percorre campos necessários
        for field in self.fields:
            if not self.validateReqFields(field):
                return False
                break
        
        # se não é update
        if not currentResult:
            # percorre campos obrigatórios
            for field in self.requiredFields:
                if not self.validateRequired(field[0], field[1]):
                    return False
                    break
            
            # percorre campos únicos
            for field in self.uniqueFields:
                if not self.validateUnique(field[0], field[1]):
                    return False
                    break

            # verifica datas
            if self.dateCompareFields:
                if not self.compareDates(self.dateCompareFields):
                    return False

        # se é update
        else:
            # percorre campos obrigatórios
            for field in self.requiredFields:
                if not self.validateRequiredToUpdate(field[0], field[1]):
                    return False
                    break
            
            # percorre campos únicos
            for field in self.uniqueFields:
                if not self.validateUniqueToUpdate(field[0], field[1], currentResult):
                    return False
                    break

            # verifica datas
            if self.dateCompareFields:
                if not self.compareDatesToUpdate(self.dateCompareFields, currentResult):
                    return False
        
        # percorre campos numéricos
        for field in self.numberFields:
            if not self.validateNumber(field[0], field[1]):
                return False
                break
        
        # percorre campos de email
        for field in self.emailFields:
            if not self.validateEmail(field[0], field[1]):
                return False
                break
            
        # percorre campos de chave estrangeira
        for field in self.foreignFields:
            if not self.validateForeignField(field):
                return False
                break
        
        # percorre campos de data
        for field in self.dateFields:
            if not self.validateDate(field):
                return False
                break
        
        # percorre campos de imagem
        for field in self.imageFields:
            if not self.validateImageType(field) or not self.validateImageSize(field):
                return False
                break

        return True


    # verifica se um campo necessári existe na requisição
    def validateReqFields(self, field):
        if not self.req.get(field) and self.req.get(field) != '' and self.req.get(field) != []:
            self.response = { 'message': 'O campo ' + field + ' não foi enviado' }, 501
            return False
        else:
            return True


    # verifica se um campo obrigatório está preenchido
    def validateRequired(self, field, message):
        if not self.req[field] and self.req[field] == '':
            self.response = { 'message': message }, 501 
            return False
        return True

    
    # verifica se um campo obrigatório está preenchido menos o password se for edição
    def validateRequiredToUpdate(self, field, message):
        if (field == 'password'):
            return True
        else:
            return self.validateRequired(field, message)

    # verifica se um campo é unico no banco de dados
    def validateUnique(self, field, message):
        filters = { field: self.req[field] }
        result = self.model.query.filter_by(**filters).first()
        if result:
            self.response = { 'message': message }, 501
            return False
        return True


    # verifica se um campo é unico no banco de dados quando este é atualizado
    def validateUniqueToUpdate(self, field, message, currentResult):
        if (getattr(currentResult, field) != self.req[field]):
            return self.validateUnique(field, message)
        else:
            return True

    
    # verifica se uma chave estrangeira existe no banco de dados
    def validateForeignField(self, field):
        if self.req[field[1][0]] != '':
            result = field[0].query.filter_by(id=self.req[field[1][0]]).first()
            if result:
                return True
            else:
                self.response = { 'message': field[1][1] }, 501
                return False 
        else:
            return True


    # verifica se o campo é um número válido
    def validateNumber(self, field, message):
        if self.req.get(field):
            try:
                num = int(self.req.get(field))
                if (num):
                    return True
                else:
                    self.response = { 'message': message }, 501
                    return False
            except:
                self.response = { 'message': message }, 501
                return False
        else:
            return True


    # verifica se o campo é um email válido
    def validateEmail(self, field, message):
        if bool(re.search(r"^[\w\.\+\-]+\@[\w]+\.[a-z]{2,3}$", self.req[field])):
            return True
        else:
            self.response = { 'message': message }, 501
            return False


    # verifica se o campo é uma data válida
    def validateDate(self, field):
        try:
            year,month,day = self.req[field].split('-')
            month_validity = self.monthCheck(int(month)) 
            day_validity = self.dayCheck(int(month),int(day)) 
            year_validity = self.yearCheck(year)
            if month_validity and day_validity and year_validity:
                return True
            else:
                self.response = { 'message': 'O campo ' + field + ' possui uma data inválida' }, 501
                return False
        except:
            self.response = { 'message': 'O campo ' + field + ' possui uma data inválida' }, 501
            return False


    # vefifica se a data do index 0 é menor que a data do index 1 e é maior ou igual a data corrente
    def compareDates(self, dates):
        try:
            today = date.today().strftime('%d/%m/%Y')
            t_day,t_month,t_year = today.split('/')
            t_date = datetime.datetime(int(t_year), int(t_month), int(t_day))
            entry = self.req[dates[0]]
            e_year,e_month,e_day = entry.split('-')
            e_date = datetime.datetime(int(e_year), int(e_month), int(e_day)) 
            departure = self.req[dates[1]]
            d_year,d_month,d_day = departure.split('-')
            d_date = datetime.datetime(int(d_year), int(d_month), int(d_day))
            if e_date >= t_date:
                if e_date < d_date:
                    return True
                else:
                    self.response = { 'message': 'O entry_date deve ser menor que o departure_date' }, 501
                    return False
            else:
                self.response = { 'message': 'O entry_date deve ser maior ou igual a data de hoje' }, 501
                return False
        except:
            self.response = { 'message': 'O formato de uma das datas é inválido' }, 501
            return False

    
    # vefifica se a data do index 0 é menor que a data do index 1 e é maior ou igual a data corrente
    def compareDatesToUpdate(self, dates, currentResult):
        try:
            today = date.today().strftime('%d/%m/%Y')
            t_day,t_month,t_year = today.split('/')
            t_date = datetime.datetime(int(t_year), int(t_month), int(t_day))
            entry = self.req[dates[0]]
            e_year,e_month,e_day = entry.split('-')
            e_date = datetime.datetime(int(e_year), int(e_month), int(e_day)) 
            departure = self.req[dates[1]]
            d_year,d_month,d_day = departure.split('-')
            d_date = datetime.datetime(int(d_year), int(d_month), int(d_day))
            if (str(currentResult.entry_date) != str(entry)):
                if e_date >= t_date:
                    if e_date < d_date:
                        return True
                    else:
                        self.response = { 'message': 'O entry_date deve ser menor que o departure_date' }, 501
                        return False
                else:
                    self.response = { 'message': 'O entry_date deve ser maior ou igual a data de hoje' }, 501
                    return False
            else:
                if e_date < d_date:
                    return True
                else:
                    self.response = { 'message': 'O entry_date deve ser menor que o departure_date' }, 501
                    return False
        except:
            self.response = { 'message': 'O formato de uma das datas é inválido' }, 501
            return False


    # verifica se o dados mês é um mês válido
    def monthCheck(self, month):
        if month > 0 and month <= 12:
            return True
        else:
            return False


    # verifica se o dado dia é um dia válido
    def dayCheck(self, month, day):
        days_in_month = {1:31, 2:28, 3:31, 4:30, 5:31, 6:30, 7:31, 8:31, 9:30, 10:31, 11:30, 12:31}
        if 0 < day <= days_in_month[month]:
            return True
        else:
            return False


    # verifica se o dado ano é um ano válido
    def yearCheck(self, year):
        if len(year) >= 1 and len(year) <= 4:
            return True
        else:
            return False


    # verifica se o tipo do arquivo é uma imagem válida
    def validateImageType(self, field):
        baseType = re.search('data:image/(.+?);base64,', self.req[field])
        if (baseType and ( baseType.group(1) == 'png' or
                            baseType.group(1) == 'jpg' or
                            baseType.group(1) == 'jpeg' or
                            baseType.group(1) == 'gif') ):
            return True
        else:
            self.response = { 'message': 'Tipo de arquivo inválido' }, 501
            return False


    # verfifica se o tamanho do arquivo é válido
    def validateImageSize(self, field):
        if (int(getBase64Size(self.req[field])) <= int(5017969)):
            return True
        else:
            self.response = { 'message': 'O tamanho da imagem não deve exceder 5mb' }, 501
            return False
