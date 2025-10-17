# ProjectoHamburgueria

Pequeno site estático para uma hamburgueria, feito com HTML e Tailwind CSS.

Status atual (até o momento)
- Repositório Git local inicializado com commits.
- `.gitignore` adicionado.
- `tailwind.config.js` corrigido (typo em `content` fixado: `hmtl` → `html`).
- `package.json` atualizado com scripts para construir o CSS:
  - `build:css` e `watch:css` (utilizam `npx tailwindcss`).
- A utilidade customizada `bg-home` foi adicionada na configuração do Tailwind (aponta para `./assets/bg.png`) mas o `Styles/output.css` precisa ser regenerado para que a classe passe a existir no CSS final.

Arquivos importantes
- `index.html` — página principal (contém o `header` com `class="bg-home bg-cover"`).
- `tailwind.config.js` — configuração do Tailwind (backgroundImage 'home' → `url('./assets/bg.png')`).
- `Styles/styles.css` — arquivo de entrada do Tailwind (contém @tailwind directives).
- `Styles/output.css` — CSS gerado (atualmente precisa ser reconstruído para incluir as mudanças).
- `assets/` — imagens (ex.: `bg.png`, `hamb-1.png`).
- `.gitignore` — arquivos ignorados.

Por que a imagem de fundo (`bg-home`) pode não aparecer
- A classe `bg-home` é uma utilidade gerada pelo Tailwind a partir da chave `backgroundImage` do `tailwind.config.js`.
- Se `Styles/output.css` foi gerado antes da correção do `tailwind.config.js`, a utilidade `.bg-home` não estará presente no arquivo final.
- É necessário reconstruir o CSS (ver instruções abaixo) para que `.bg-home { background-image: url('./assets/bg.png') }` seja gerado.

Como reproduzir / build (passo a passo)

Pré-requisitos
- Node.js + npm instalados (verifique com `node -v` e `npm -v`).

Instalação e build (recomendado: usar cmd.exe se PowerShell bloquear scripts)

1. Abra um terminal na pasta do projeto (`c:\Users\CORE I7\Documents\Development\ProjectoHamburgueria`).
2. Instale dependências:

```powershell
npm install
```

3. Gere o CSS do Tailwind (gera `Styles/output.css` com a classe `bg-home`):

```powershell
npm run build:css
```

Se quiser um modo de desenvolvimento que atualize automaticamente:

```powershell
npm run watch:css
```

Observação sobre PowerShell
- Em algumas máquinas o PowerShell bloqueia execução de scripts do `npx`/`npm` por política de execução. Se você receber um erro tipo "cannot be loaded because running scripts is disabled", há 2 opções:
  - Abra o Prompt (cmd.exe) e rode os comandos acima lá — é a solução mais simples e segura.
  - Ou permita scripts para o usuário atual (faça por sua conta e entendido o risco):

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Alternativa rápida (sem rebuild)
- Se precisar que a imagem apareça imediatamente sem reconstruir o Tailwind, edite `index.html` e adicione um estilo inline no `header`:

```html
<header class="w-full h-[420px] bg-zinc-900 bg-cover" style="background-image: url('./assets/bg.png');">
```

Como enviar o projeto para o GitHub (resumo)
1. Crie um repositório no GitHub (ex.: `Faimo-M/ProjectoHamburgueria`).
2. No terminal do projeto rode:

```powershell
git remote add origin https://github.com/Faimo-M/ProjectoHamburgueria.git
git push -u origin master
```

Se preferir usar `main` como branch principal:

```powershell
git branch -M main
git push -u origin main
```

Nota: eu tentei adicionar e dar push para o remoto, mas a tentativa falhou com `remote: Repository not found` — crie o repositório no GitHub antes de executar o push.

Servir localmente (opcional)
- Para visualizar `index.html`, você pode simplesmente abrir o arquivo no navegador. Para um servidor simples (recomendado para evitar problemas com caminhos relativos), use um servidor estático:

```powershell
npm install -g serve    # opcional, se quiser instalar globalmente
serve . -p 5000
# ou com Python (se instalado):
python -m http.server 5000
```

Notas sobre alterações já feitas pelo repositório
- Corrigi `tailwind.config.js` (`content` glob) para que Tailwind processe arquivos HTML.  
- Adicionei scripts `build:css` e `watch:css` no `package.json`.

Próximos passos recomendados
- Criar o repositório remoto no GitHub e executar o push.  
- Regerar `Styles/output.css` com `npm run build:css` (ou `watch:css`).  
- (Opcional) Configurar um workflow GitHub Actions para build automático.

Se quiser, eu:
- Posso aplicar o estilo inline agora para ver a imagem imediatamente; ou
- Posso tentar rodar `npm install` e `npm run build:css` aqui se você abrir um terminal `cmd.exe` (ou alterar a política do PowerShell).  

Obrigado — diga como quer prosseguir que eu executo o próximo passo.
