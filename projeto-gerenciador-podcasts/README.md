# 🎙️ Podcasts API

API simples em Node.js que retorna episódios de podcasts com base em filtros via query string.

---

## 🚀 Rota

### `GET /podcasts`

Retorna uma lista de episódios de podcasts.

---

## 🔍 Parâmetros de consulta (Query Params)

| Parâmetro      | Tipo     | Obrigatório | Descrição                                                                 |
|----------------|----------|-------------|---------------------------------------------------------------------------|
| `podcastName`  | `string` | Não         | Filtra os episódios pelo nome exato do podcast (case-insensitive).       |
| `category`     | `string` | Não         | Filtra os episódios que tenham a categoria especificada (case-insensitive). |

---

## 🧪 Exemplos de uso

### ✅ Sem filtros
**Requisição:**
GET /podcasts
**Resultado esperado:**
- Todos os episódios presentes no arquivo `podcasts.json`.

---

### ✅ Filtrar por nome do podcast
**Requisição:**
GET /podcasts?podcastName=flow

**Resultado esperado:**
```json
[
 {
        "podcastName": "flow",
        "episode": "CBUM - Flow #319",
        "videoId": "pQSuQmUfS30",
        "categories": [
            "saúde",
            "esporte",
            "bodybuilder"
        ]
    },
    {
        "podcastName": "flow",
        "episode": "RUBENS BARRICHELLO - Flow #339",
        "videoId": "4KDGTdiOV4I",
        "categories": [
            "esporte",
            "corrida"
        ]
    },
    {
        "podcastName": "flow",
        "episode": "Felipão - Flow #339",
        "videoId": "00000",
        "categories": [
            "esporte",
            "programação"
        ]
    }
]
```

### ✅ Filtrar por categoria do podcast
**Requisição:**
GET /podcasts?category=humor

**Resultado esperado:**
```json
[
    {
        "podcastName": "venus",
        "episode": "Xuxa",
        "videoId": "00000",
        "categories": [
            "humor"
        ]
    }
]
```

### ✅ Filtrar por nome e categoria do podcast
**Requisição:**
GET /podcasts?podcastName=flow&category=humor

**Resultado esperado:**
```json
[]
```