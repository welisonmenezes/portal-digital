# Segue abaixo os endpoints da api com seus respectivos parâmetros

## User

#### Listar usuários:
método:
`GET`

endpoint:
`/user`

### Ver detalhe do usuário

método:
`GET`

endpoint:
`/user/<int:id>`

### Adicionar usuário

método:
`POST`

endpoint
`/user`

body:
```
{
    "first_name" = "string",
    "last_name" = "strnig",
    "registry" = "strnig",
    "password" = "string",
    "role" = "string",
    "email" = "string",
    "phone" = "string",
    "image_id" = "number"
}
```

### Editar usuário

método:
`PUT`

endpoint
`/user`

body:
```
{
    "first_name" = "string",
    "last_name" = "strnig",
    "registry" = "strnig",
    "password" = "string",
    "role" = "string",
    "email" = "string",
    "phone" = "string",
    "image_id" = "number"
}
```

### Deletar usuário

método:
`DELETE`

endpoint:
`/user/<int:id>`



## Post

#### Listar posts:
método:
`GET`

endpoint:
`/post`

### Ver detalhe do post

método:
`GET`

endpoint:
`/post/<int:id>`

### Adicionar post

método:
`POST`

endpoint
`/post`

body:
```
{
    "title" = "string",
    "description" = "string",
    "content" = "string",
    "genre" = "string",
    "status" = "string",
    "entry_date" = "date",
    "departure_date" = "date",
    "image_id" = "number",
    "user_id" = "number",
    "category_id" = "number"
}
```

### Editar post

método:
`PUT`

endpoint
`/post`

body:
```
{
    "title" = "string",
    "description" = "string",
    "content" = "string",
    "genre" = "string",
    "status" = "string",
    "entry_date" = "date",
    "departure_date" = "date",
    "image_id" = "number",
    "user_id" = "number",
    "category_id" = "number"
}
```

### Deletar post

método:
`DELETE`

endpoint:
`/post/<int:id>`



## Imagem

#### Listar imagens:
método:
`GET`

endpoint:
`/image`

### Ver detalhe da imagem

método:
`GET`

endpoint:
`/image/<int:id>`

### Adicionar imagem

método:
`POST`

endpoint
`/image`

body:
```
{
    "image" = "string"
}
```

### Editar imagem

método:
`PUT`

endpoint
`/image`

body:
```
{
    "image" = "string"
}
```

### Deletar imagem

método:
`DELETE`

endpoint:
`/image/<int:id>`



## Mídia (Visualizar a imagem)

#### Listar categorias:
método:
`GET`

endpoint:
`/media`



## Categoria

#### Listar categorias:
método:
`GET`

endpoint:
`/category`

### Ver detalhe da categoria

método:
`GET`

endpoint:
`/category/<int:id>`

### Adicionar categoria

método:
`POST`

endpoint
`/category`

body:
```
{
    "name" = "string",
    "description" = "string"
}
```

### Editar categoria

método:
`PUT`

endpoint
`/category`

body:
```
{
    "name" = "string",
    "description" = "string"
}
```

### Deletar categoria

método:
`DELETE`

endpoint:
`/category/<int:id>`


## Configurações

#### Ver configurações:
método:
`GET`

endpoint:
`/configuration`

### Adicionar configurações

método:
`POST`

endpoint
`/configuration`

body:
```
{
    "name" = "string",
    "phone" = "string",
    "email" = "string"
}
```

### Editar configurações

método:
`PUT`

endpoint
`/configuration`

body:
```
{
    "name" = "string",
    "phone" = "string",
    "email" = "string"
}
```