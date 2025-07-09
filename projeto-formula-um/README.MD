# 🎙️ Fómula 1 API

API simples em Node.js que retorna equipes de pilotos da Fómula 1.

---

## 🚀 Rota

### `GET /teams`

Retorna uma lista de equipes da Fómula 1.

---

## 🚀 Rota

### `GET /drivers`

Retorna uma lista de pilotos da Fómula 1.

---

## 🔍 Parâmetros de consulta (Query Params)

| Parâmetro | Tipo     | Obrigatório | Descrição                 |
| --------- | -------- | ----------- | ------------------------- |
| `id`      | `string` | Não         | Filtra os pilotos pelo id. |

---

## 🧪 Exemplos de uso

### ✅ Sem filtros

**Requisição:**
GET /drivers
**Resultado esperado:**

- Todos os episódios presentes no arquivo `drivers.ts`.

---

### ✅ Filtrar por nome do podcast

**Requisição:**
GET /drivers?id=10

**Resultado esperado:**

```json
[
  {
    "session_key": 7763,
    "driver_number": 10,
    "full_name": "Pierre GASLY",
    "team_name": "Alpine",
    "headshot_url": "https://www.formula1.com/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png.transform/1col/image.png"
  }
]
```