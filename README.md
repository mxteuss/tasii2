# Sistema de Gerenciamento de Chamados (TASII 2)

Este projeto consiste em uma API REST desenvolvida em Node.js com Express para o gerenciamento e distribuição automatizada de chamados de suporte técnico. A aplicação utiliza persistência em memória e implementa regras de negócio para triagem de atendimento entre os níveis N1 e N2.

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


## Regras de Validação Implementadas

A API possui um mecanismo defensivo contra dados inválidos ou maliciosos. Qualquer quebra estrutural resulta em **`HTTP 400 Bad Request`** com um JSON explicativo.

* **Cliente / Título:** Texto obrigatório. Não pode ser nulo ou em branco (mesmo após a remoção de espaços nas extremidades usando `.trim()`).
* **Valor:** Deve ser obrigatoriamente numérico e maior que zero (`valor > 0`).
* **Tipo e Prioridade:** Devem possuir valores estritamente reconhecidos e documentados (Valores válidos: `baixa`, `media`, `alta`).
* **Identificadores Inexistentes:** Consultas ou atualizações de IDs não localizados na memória produzem **`HTTP 404 Not Found`**.
* **Tratamento de Erros Inesperados:** Falhas internas ou exceções de runtime não previstas são interceptadas em blocos `catch` e devolvidas como um **`HTTP 500 Internal Server Error`** limpo, sem expor detalhes sensíveis de infraestrutura ao usuário.


## Rotas da API e Exemplos de Requisição

A URL base da aplicação local é: `http://localhost:3000/chamados`

### 1. Criar Chamado
* **Rota:** `POST /pedidos`
* **Descrição:** Valida a entrada, inicia o fluxo de triagem e salva o chamado na memória.
* **Payload de Exemplo (JSON):**
  ```json
  {

   "cliente": "Carlos Silva",
   "tipo": "entrega",
   "valor": 350,
   "prioridade": "normal"

  }
  ```
* **Resposta Esperada (201 Created):**
  ```json
  {

   "cliente":"Carlos Silva"
   "tipo":"entrega"
   "valor":350
   "prioridade":"normal"
   "status":"recebido"
   "responsavel":"Suporte N1"
  }
  ```

### 2. Listar Todos os Chamados
* **Rota:** `GET /pedidos`
* **Descrição:** Retorna a coleção completa de chamados ativos armazenados.
* **Resposta Esperada (200 OK):**
  ```json
  {
    "id": 1,
    "cliente": "Carlos Silva",
    "tipo": "entrega",
    "valor": 350,
    "prioridade": "normal",
    "status": "recebido",
    "responsavel": "Suporte N1"
  }
  ```

### 3. Buscar Chamado por ID
* **Rota:** `GET /pedidos/:id`
* **Descrição:** Recupera um chamado específico passando o parâmetro pela URL (ex: `/pedidos/1`).
* **Resposta Esperada (200 OK):**
  ```json
  {
    "id": 1,
    "cliente": "Carlos Silva",
    "tipo": "entrega",
    "valor": 350,
    "prioridade": "normal",
    "status": "recebido",
    "responsavel": "Suporte N1"
  }
  ```

### 4. Atualizar Chamado Parcialmente (PATCH)
* **Rota:** `PATCH /pedidos/:id`
* **Descrição:** Atualiza de forma segura apenas os campos enviados no corpo da requisição (ex: atualizar o status), impedindo mutação forçada de IDs.
* **Payload de Exemplo (JSON):**
  ```json
  {
    "valor": "400"
  }
  ```
* **Resposta Esperada (200 OK):**
  ```json
  {
  "id": 1,
  "cliente": "Carlos Silva",
  "tipo": "entrega",
  "valor": 400,
  "prioridade": "normal",
  "status": "recebido",
  "responsavel": "Suporte N1"
  }
  ```

---

##  Uso de IA

### Tarefas em que a IA foi utilizada:
* **Configuração Inicial e Resolução de Erros de Ambiente:** Diagnóstico de dependências ausentes (`MODULE_NOT_FOUND`)
* **Depuração de Código (Debugging):** Identificação de quebras de sintaxe no Express (como erros na biblioteca `path-to-regexp`).

### Análise de Sugestões da IA:


#### 1. Sugestão ACEITA: Substituição de Reatribuição por `.push()`
* **O que a IA sugeriu:** Durante a persistência em memória no Service, foi identificada uma tentativa inválida de reatribuição em uma array constante. A IA sugeriu manter a array como `const` e utilizar o método `.push()` para alterar o estado interno da coleção sem quebrar a referência da variável.
* **Justificativa:** A sugestão foi aceita pois resolveu o erro de runtime `Assignment to constant variable`, respeitando as boas práticas de imutabilidade.

#### 2. Sugestão REJEITADA: Uso de Middlewares Globais de Validação
* **O que a IA sugeriu:** Centralizar as validações de dados (como verificar se o ID na URL é um número) em um arquivo de middleware separado no Express antes de chegar aos controllers.
* **Justificativa:** A sugestão foi rejeitada no momento para manter a arquitetura do projeto mais simples, legível e compacta para esta entrega, optando por centralizar o tratamento de erros estruturais (HTTP 400) diretamente dentro do escopo de cada método no próprio Controller.

