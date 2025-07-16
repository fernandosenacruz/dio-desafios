# API de Jogadores

Esta API permite gerenciar um cadastro simples de jogadores de futebol.  
Todas as respostas são em JSON e a API está montada na rota base `/api`.

---

## Base URL

```
    http://localhost:3333/api
```

## Endpoints

### 1. Listar todos os jogadores

- **URL**: `/players`
- **Método**: `GET`
- **Descrição**: Retorna a lista completa de jogadores, ordenada por nome.
- **Parâmetros**: Nenhum
- **Resposta de Sucesso** (`200 OK`):

  ```json
  [
    {
      "id": 1,
      "name": "Lionel Messi",
      "team": "Paris Saint‑Germain",
      "position": "Forward",
      "age": 36
    },
    {
      "id": 2,
      "name": "Cristiano Ronaldo",
      "team": "Al Nassr",
      "position": "Forward",
      "age": 38
    }
    // ...
  ]
  ```

### 2. Obter jogador pelo ID

- **URL**: `/players/:id`
- **Método**: `GET`
- **Descrição** Retorna um único jogador, identificado pelo seu ID.
- **Parâmetros**: id (integer, obrigatório) — ID do jogador.
- **Resposta de Sucesso** (`200 OK`):

    ```json
    {
        "id": 1,
        "name": "Lionel Messi",
        "team": "Paris Saint‑Germain",
        "position": "Forward",
        "age": 36
    }

    ```

- **Resposta de erro** (`400 BAD REQUEST`):

    ```json
    {
        "error": "Invalid player id parameter." 
    }

    ```

- **Resposta de erro** (`404 NOT FOUND`):

    ```json
    {
        "error": "Player not found" 
    }

    ```

### 3. Cria um jogador

- **URL**: `/players`
- **Método**: `POST`
- **Descrição** Adiciona um novo jogador. O ID é gerado automaticamente.
- **Body**
    ```json
    {
        "name": "Kylian Mbappé",
        "team": "Paris Saint‑Germain",
        "position": "Forward",
        "age": 24
    }

- **Resposta de Sucesso** (`201 CREATED`):

    ```json
    {
        "message": "Player added successfully"
    }

    ```

- **Resposta de erro** (`400 BAD REQUEST`):

    ```json
    {
        "error": "Name is required and must be a non-empty string." 
    }

    ```

- **Resposta de erro** (`500 INTERNAL SERVER ERROR`):

    ```json
    {
        "error": "Error adding player" 
    }

    ```

### 4. Atualiza dados de um jogador

- **URL**: `/players/:id`
- **Método**: `PUT`
- **Descrição** Atualiza os dados de um jogador.
- **Parâmetros**: id (integer, obrigatório) — ID do jogador.
- **Body**
    ```json
    {
        "team": "Real Madrid",
        "age": 37
    }

- **Resposta de Sucesso** (`200 OK`):

    ```json
    {
        "id": 2,
        "name": "Cristiano Ronaldo",
        "team": "Real Madrid",
        "position": "Forward",
        "age": 37
    }

    ```

- **Resposta de erro** (`400 BAD REQUEST`): // ID inválido ou corpo inválido.

    ```json
    {
        "error": "Name is required and must be a non-empty string." 
    }

    ```

- **Resposta de erro** (`404 NOT FOUND`):

    ```json
    {
        "error": "Player not found" 
    }


- **Resposta de erro** (`500 INTERNAL SERVER ERROR`):

    ```json
    {
        "error": "Error adding player" 
    }

    ```

### 5. Deleta os dados de um jogador

- **URL**: `/players/:id`
- **Método**: `DELETE`
- **Descrição** Deleta um jogador.
- **Parâmetros**: id (integer, obrigatório) — ID do jogador.

- **Resposta de Sucesso** (`204 NO CONTENT`):

- **Resposta de erro** (`400 BAD REQUEST`):

    ```json
    {
        "error": "Invalid player id parameter." 
    }

    ```

- **Resposta de erro** (`404 NOT FOUND`):

    ```json
    {
        "error": "Player not found" 
    }


- **Resposta de erro** (`500 INTERNAL SERVER ERROR`):

    ```json
    {
        "error": "Error adding player" 
    }

    ```