# <p align="center"> MyWallet </p>

<p align="center">
	<img src="https://img.shields.io/badge/author-Thales Alves-4dae71?style=flat-square" />
	<img src="https://img.shields.io/github/languages/count/thalesAlves758/my-wallet-api?color=4dae71&style=flat-square" />
</p>

## :clipboard: Descrição

MyWallet é uma aplicação para controle de sua carteira. Nele é possível cadastrar registros de entrada e saída de dinheiro, com seus respectivos valores e descrições. Tais registros são salvos em um histórico que é visível na tela inicial e o valor da carteira é atualizado conforme entradas e saídas são cadastradas. É possível também editar um determinado registro ao clicá-lo.

---

## :computer: Tecnologias e Conceitos

- Rest API
- Node.js
- Express.js
- JWT Token
- MongoDB
- Repository Pattern

---

## 🏁 Rodando a aplicação

Certifique-se que você tem a última versão estável do [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) rodando localmente.

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/thalesAlves758/my-wallet-api.git
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias:

```
npm install
```

Copie e cole o arquivo .env.example, renomeie a cópia para '.env' e preencha as chaves PORT, MONGO_URI, DATABASE_NAME e JWT_SECRET.

Finalizado o processo, é só inicializar o servidor:

```
npm start
```

Rode também em modo de desenvolvimento:

```
npm run dev
```

E prontinho, o projeto estará rodando localmente na sua máquina.

## :motorway: Rotas

- Authentication

  - Sign up:
  ```http
  POST /auth/sign-up
  ```

  Body:

  | Body               | Type     | Description                          |
  | :----------------- | :------- | :----------------------------------- |
  | `name`             | `string` | **Required** - name of the user      |
  | `email`            | `string` | **Required** - email of the user     |
  | `password`         | `string` | **Required** - password of the user  |
  | `confirmPassword`  | `string` | **Required** - password confirmation |

  Response:
  ```
  status 201
  body {}
  ```

  <br />

  - Sign in:
  ```http
  POST /auth/sign-in
  ```

  Request:

  | Body       | Tipo     | Descrição                           |
  | :--------- | :------- | :---------------------------------- |
  | `email`    | `string` | **Required** - email of the user    |
  | `password` | `string` | **Required** - password of the user |

  Response:
  ```
  status 200
  body {
    "_id": "id",
    "name": "Usuário",
    "email": "usuario@email.com",
    "balance": 0,
    "token": "token jwt"
  }
  ```

  <br />

- Records
  - Listar registros:
  ```http
  GET /records
  ```

  Request:

  | Headers         | Tipo     | Descrição                   |
  | :-------------- | :------- | :-------------------------- |
  | `Authorization` | `string` | **Obrigatório** - Token JWT |

  Response:
  ```
  status 200
  body {
    [
      {
        "_id": "id do registro",
        "type": "input",
        "description": "descrição",
        "value": 100000,
        "date": 1669402059749,
        "userId": "id do usuário"
      }
    ]
  }
  ```

  <br />

  - Criar registro:
  ```http
  POST /records
  ```

  Request:

  | Headers         | Tipo     | Descrição                   |
  | :-------------- | :------- | :-------------------------- |
  | `Authorization` | `string` | **Obrigatório** - Token JWT |

  | Body          | Tipo     | Descrição                               |
  | :------------ | :------- | :-------------------------------------- |
  | `value`       | `number` | **Obrigatório** - valor do registro     |
  | `type`        | `string` | **Obrigatório** - tipo do registro      |
  | `description` | `string` | **Obrigatório** - descrição do registro |

  `types válidos: [input, output]`

  Response:
  ```
  status 201
  body {
    "balance": 0
  }
  ```

  <br />

  - Excluir registro:
  ```http
  DELETE /records/:recordId
  ```

  Request:

  | Params     | Tipo     | Descrição                        |
  | :--------- | :------- | :------------------------------- |
  | `recordId` | `string` | **Obrigatório** - Id do registro |

  | Headers         | Tipo     | Descrição                   |
  | :-------------- | :------- | :-------------------------- |
  | `Authorization` | `string` | **Obrigatório** - Token JWT |

  Response:
  ```
  status 200
  body {
    "balance": 0
  }
  ```

  <br />

  - Atualizar registro:
  ```http
  PUT /records/:recordId
  ```

  Request:

  | Params     | Tipo     | Descrição                        |
  | :--------- | :------- | :------------------------------- |
  | `recordId` | `string` | **Obrigatório** - Id do registro |

  | Headers         | Tipo     | Descrição                   |
  | :-------------- | :------- | :-------------------------- |
  | `Authorization` | `string` | **Obrigatório** - Token JWT |

  | Body          | Tipo     | Descrição                               |
  | :------------ | :------- | :-------------------------------------- |
  | `value`       | `number` | **Obrigatório** - valor do registro     |
  | `description` | `string` | **Obrigatório** - descrição do registro |

  Response:
  ```
  status 200
  body {
    "balance": 0
  }
  ```