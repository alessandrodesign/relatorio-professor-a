### Exemplo de Uso com Axios

1. **Importe e instancie a estratégia**

```ts
import { AxiosApiStrategy } from './AxiosApiStrategy';

const api = new AxiosApiStrategy();
```

2. **Realize o login**

O método `login` envia as credenciais para o endpoint de autenticação, armazena o token e o refresh token automaticamente.

```ts
async function realizarLogin() {
  try {
    const credentials = { username: 'usuario', password: 'senha' };
    const response = await api.login('/api/login', credentials);
    console.log('Login realizado com sucesso:', response);
  } catch (error) {
    console.error('Erro no login:', error);
  }
}
```

3. **Fazer uma requisição GET**

Depois de logado, você pode chamar métodos que exigem autenticação. O token será incluído automaticamente.

```ts
async function obterDados() {
  try {
    const data = await api.get('/api/dados');
    console.log('Dados recebidos:', data);
  } catch (error) {
    console.error('Erro na requisição GET:', error);
  }
}
```

4. **Realizar um POST com upload de imagem**

Quando precisar enviar arquivos (como uma imagem), crie um objeto FormData e marque a opção `isMultipart: true`.

```ts
async function uploadImagem(imageFile: File) {
  try {
    const formData = new FormData();
    formData.append('imagem', imageFile);
    
    const response = await api.post('/api/upload', formData, { isMultipart: true });
    console.log('Upload realizado com sucesso:', response);
  } catch (error) {
    console.error('Erro no upload:', error);
  }
}
```

5. **Chamar outros métodos (PUT, PATCH, DELETE)**

Você utiliza a mesma lógica, passando os dados e as opções necessárias:

```ts
async function atualizarRegistro(id: string, novoDado: any) {
  try {
    const response = await api.put(`/api/registro/${id}`, novoDado);
    console.log('Registro atualizado:', response);
  } catch (error) {
    console.error('Erro na atualização:', error);
  }
}
```

---

### Alternativas: jQuery ou Fetch

Caso prefira usar a implementação baseada em jQuery ou Fetch, basta importar e instanciar a classe correspondente:

- **Com jQuery:**

  ```ts
  import { JqueryApiStrategy } from './JqueryApiStrategy';

  const api = new JqueryApiStrategy();
  ```

- **Com Fetch:**

  ```ts
  import { FetchApiStrategy } from './FetchApiStrategy';

  const api = new FetchApiStrategy();
  ```

O uso dos métodos é idêntico, já que todos implementam a mesma interface.

---

### Fluxo de Autenticação e Refresh Token

- **Login:**  
  Ao chamar `api.login()`, a estratégia armazena o token (e registra em cookie, se necessário).

- **Requisições Autenticadas:**  
  Os métodos `get`, `post`, etc., usam o token para montar o header `Authorization: Bearer <token>`.  
  Se a API retornar um 401 (não autorizado), o interceptor (ou lógica interna) chama `refreshTokenRequest()` para tentar atualizar o token automaticamente. Se a atualização falhar, é exibida uma mensagem (por exemplo, via SweetAlert) solicitando um novo login.

- **Opção de Requisição sem Autenticação:**  
  Basta passar a opção `auth: false` nas opções da requisição se aquela chamada não necessitar de autenticação.

---

### Exemplo Completo

Segue um exemplo combinando as chamadas em uma função assíncrona:

```ts
import { AxiosApiStrategy } from './AxiosApiStrategy';

async function exemploDeUso() {
  const api = new AxiosApiStrategy();

  // Realiza login
  try {
    const loginResponse = await api.login('/api/login', { username: 'usuario', password: 'senha' });
    console.log('Login realizado:', loginResponse);
  } catch (error) {
    console.error('Erro no login:', error);
    return;
  }

  // Requisição GET autenticada
  try {
    const dados = await api.get('/api/dados');
    console.log('Dados recebidos:', dados);
  } catch (error) {
    console.error('Erro na requisição GET:', error);
  }

  // Upload de imagem (POST multipart)
  try {
    const imageFile = (document.getElementById('inputImagem') as HTMLInputElement).files?.[0];
    if (imageFile) {
      const formData = new FormData();
      formData.append('imagem', imageFile);
      const uploadResponse = await api.post('/api/upload', formData, { isMultipart: true });
      console.log('Upload realizado:', uploadResponse);
    }
  } catch (error) {
    console.error('Erro no upload:', error);
  }
}

exemploDeUso();
```

### Como Usar

Você pode escolher a estratégia desejada informando o valor do enum. Por exemplo:

```ts
import { ApiRequest } from './ApiRequest';
import { ApiStrategyType } from './ApiStrategyType';

const api = ApiRequest(ApiStrategyType.Axios);

// Agora, você pode usar os métodos da estratégia escolhida:
api.login('/api/login', { username: 'usuario', password: 'senha' })
  .then(response => {
    console.log('Login realizado:', response);
  })
  .catch(error => {
    console.error('Erro no login:', error);
  });
```

Dessa forma, com o enum e a função fábrica, você pode facilmente alternar entre as diferentes implementações (Axios, JQuery ou Fetch) sem precisar alterar o restante do código da aplicação.
