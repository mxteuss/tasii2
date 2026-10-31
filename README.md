# Sistema de Gerenciamento de Chamados (TASII 2)

Este projeto consiste em uma API REST desenvolvida em Node.js com Express para o gerenciamento e distribuição automatizada de chamados de suporte técnico. A aplicação utiliza persistência em memória e implementa regras de negócio para triagem de atendimento entre os níveis N1 e N2.

---

## Instruções de Instalação e Execução

### Pré-requisitos
* **Node.js** instalado (versão v24.21.0 ou superior recomendada)
* **npm** ou **npx** (já inclusos no Node.js)

### Instalação
1. Clone o repositório ou navegue até a pasta do projeto:
   ```bash
   cd C:\Users\Usuario\Desktop\tasii\tasii2
   ```
2. Instale todas as dependências necessárias listadas no `package.json`:
   ```bash
   npm install
   ```

### Execução da Aplicação
* **Modo Padrão (Node):**
  ```bash
  node index.js
  ```
* **Modo Desenvolvedor (via npx, caso possua o nodemon instalado localmente):**
  ```bash
  npx nodemon index.js
  ```
Ao iniciar com sucesso, a mensagem `Servidor rodando na porta 3000` será exibida no console.

---

## Arquitetura e Padrão Implementado

A aplicação foi desenvolvida seguindo o padrão de arquitetura em camadas (**Layered Architecture**), promovendo a separação de responsabilidades (Separation of Concerns):

1. **`index.js` (Ponto de Entrada):** Inicializa o servidor Express, configura os middlewares globais (como `express.json()`) e define os prefixos das rotas globais (`/chamados`).
2. **`routes/` (Camada de Roteamento):** Mapeia os caminhos das URLs (endpoints) e os verbos HTTP correspondentes, direcionando o fluxo para as funções específicas dos Controllers.
3. **`controllers/` (Camada de Controle):** Responsável por interceptar a requisição HTTP, extrair os dados do `req.body` ou `req.params`, **aplicar as validações rígidas de entrada (HTTP 400)** e formular a resposta final (`res.status().json()`).
4. **`services/` (Camada de Serviço/Negócio):** Concentra as regras de negócio lógicas do ecossistema de chamados (como o fluxo de escalonamento para N2) e gerencia a persistência fictícia na coleção em memória.

### Fluxo de Log de Negócio Demonstrado no Terminal:
```text
1 - CONTROLLER recebeu { titulo: 'Máquina não liga', prioridade: 'media' }
2 - SERVICE recebeu { titulo: 'Máquina não liga', prioridade: 'media' }
N1 recebeu o chamado -> N1 não conseguiu resolver -> Encaminhado para N2
3 - SERVICE criou { id: 1, titulo: 'Máquina não liga', ..., responsavel: 'Suporte N2' }
```

---

## Regras de Validação Implementadas

A API possui um mecanismo defensivo contra dados inválidos ou maliciosos. Qualquer quebra estrutural resulta em **`HTTP 400 Bad Request`** com um JSON explicativo.

* **Cliente / Título:** Texto obrigatório. Não pode ser nulo ou em branco (mesmo após a remoção de espaços nas extremidades usando `.trim()`).
* **Valor:** Deve ser obrigatoriamente numérico e maior que zero (`valor > 0`).
* **Tipo e Prioridade:** Devem possuir valores estritamente reconhecidos e documentados (Valores válidos: `baixa`, `media`, `alta`).
* **Identificadores Inexistentes:** Consultas ou atualizações de IDs não localizados na memória produzem **`HTTP 404 Not Found`**.
* **Tratamento de Erros Inesperados:** Falhas internas ou exceções de runtime não previstas são interceptadas em blocos `catch` e devolvidas como um **`HTTP 500 Internal Server Error`** limpo, sem expor detalhes sensíveis de infraestrutura ao usuário.

---

## Rotas da API e Exemplos de Requisição

A URL base da aplicação local é: `http://localhost:3000/chamados`

### 1. Criar Chamado
* **Rota:** `POST /pedidos`
* **Descrição:** Valida a entrada, inicia o fluxo de triagem e salva o chamado na memória.
* **Payload de Exemplo (JSON):**
  ```json
  {
    "titulo": "Máquina não liga",
    "prioridade": "media",
    "tipo": "Hardware",
    "valor": 150.00
  }
  ```
* **Resposta Esperada (201 Created):**
  ```json
  {
    "id": 1,
    "titulo": "Máquina não liga",
    "prioridade": "media",
    "status": "aberto",
    "responsavel": "Suporte N2"
  }
  ```

### 2. Listar Todos os Chamados
* **Rota:** `GET /pedidos`
* **Descrição:** Retorna a coleção completa de chamados ativos armazenados.
* **Resposta Esperada (200 OK):**
  ```json
  [
    {
      "id": 1,
      "titulo": "Máquina não liga",
      "prioridade": "media",
      "status": "aberto",
      "responsavel": "Suporte N2"
    }
  ]
  ```

### 3. Buscar Chamado por ID
* **Rota:** `GET /pedidos/:id`
* **Descrição:** Recupera um chamado específico passando o parâmetro pela URL (ex: `/pedidos/1`).
* **Resposta Esperada (200 OK):**
  ```json
  {
    "id": 1,
    "titulo": "Máquina não liga",
    "prioridade": "media",
    "status": "aberto",
    "responsavel": "Suporte N2"
  }
  ```

### 4. Atualizar Chamado Parcialmente (PATCH)
* **Rota:** `PATCH /pedidos/:id`
* **Descrição:** Atualiza de forma segura apenas os campos enviados no corpo da requisição (ex: atualizar o status), impedindo mutação forçada de IDs.
* **Payload de Exemplo (JSON):**
  ```json
  {
    "status": "em andamento"
  }
  ```
* **Resposta Esperada (200 OK):**
  ```json
  {
    "id": 1,
    "titulo": "Máquina não liga",
    "prioridade": "media",
    "status": "em andamento",
    "responsavel": "Suporte N2"
  }
  ```

---
