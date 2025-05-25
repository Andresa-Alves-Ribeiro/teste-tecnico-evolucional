# Sistema de Gerenciamento Escolar

<p align="center">
  <img src="public/logo.png" alt="Logo" width="200"/>
  <br/>
  <a href="#sobre">Sobre</a> •
  <a href="#tecnologias">Tecnologias</a> •
  <a href="#funcionalidades">Funcionalidades</a> •
  <a href="#pre-requisitos">Pré-requisitos</a> •
  <a href="#instalacao">Instalação</a> •
  <a href="#estrutura">Estrutura</a> •
  <a href="#testes">Testes</a> •
  <a href="#contribuindo">Contribuindo</a> •
  <a href="#licenca">Licença</a>
</p>

## 📝 Sobre o Projeto

Este é um sistema abrangente de gerenciamento escolar desenvolvido com React, TypeScript e Material-UI. O sistema oferece uma maneira moderna e eficiente de gerenciar estudantes, professores e dados educacionais através de uma interface intuitiva.

### 🎯 Objetivos

- Simplificar o gerenciamento de dados escolares
- Fornecer uma interface moderna e responsiva
- Facilitar o acesso e manipulação de informações
- Garantir uma experiência de usuário consistente

## 🛠️ Tecnologias

### Frontend
- **React 18** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Material-UI** - Biblioteca de componentes React
- **React Router** - Roteamento declarativo
- **React Query** - Gerenciamento de estado e cache
- **Jest & React Testing Library** - Testes unitários e de integração

### Ferramentas de Desenvolvimento
- **ESLint** - Linting de código
- **Prettier** - Formatação de código
- **TypeScript** - Verificação de tipos
- **Git** - Controle de versão

## ✨ Funcionalidades

### 👥 Gestão de Usuários
- Cadastro e edição de estudantes
- Cadastro e edição de professores
- Perfis de usuário personalizados
- Controle de acesso baseado em funções

### 📊 Visualização de Dados
- Tabelas interativas com ordenação e filtragem
- Gráficos estatísticos
- Filtros avançados
- Busca em tempo real

### 🎨 Interface
- Design responsivo
- Tema claro/escuro
- Interface moderna e intuitiva
- Animações suaves

### 🔍 Gestão de Dados
- Atualizações em tempo real
- Filtragem avançada
- Busca inteligente
- Exportação de dados

## 📋 Pré-requisitos

- Node.js (versão LTS mais recente)
- npm ou yarn
- Git

## 🚀 Instalação

1. Clone o repositório:
   ```bash
   git clone [URL_DO_REPOSITÓRIO]
   cd [NOME_DO_PROJETO]
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```
   REACT_APP_API_BASE_URL=http://localhost:3000
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   # ou
   yarn start
   ```

5. Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
src/
├── assets/          # Recursos estáticos (imagens, ícones, etc.)
├── components/      # Componentes React reutilizáveis
│   ├── common/      # Componentes comuns (botões, inputs, etc.)
│   ├── layout/      # Componentes de layout (header, footer, etc.)
│   ├── student/     # Componentes específicos de estudantes
│   └── teacher/     # Componentes específicos de professores
├── context/         # Contextos React para gerenciamento de estado
├── hooks/           # Hooks personalizados
├── services/        # Serviços e lógica de negócio
├── styles/          # Arquivos de estilo
├── types/           # Definições de tipos TypeScript
└── utils/           # Funções utilitárias
```

## 🧪 Testes

O projeto utiliza Jest e React Testing Library para testes. Para executar os testes:

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage
```

### Estrutura dos Testes
```
src/
└── __tests__/
    ├── components/     # Testes de componentes
    ├── hooks/         # Testes de hooks
    ├── services/      # Testes de serviços
    └── utils/         # Testes de utilitários
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código
- Siga o guia de estilo do projeto
- Mantenha o código limpo e bem documentado
- Escreva testes para novas funcionalidades
- Atualize a documentação quando necessário

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👩‍💻 Autora

Olá! 👋 Sou Andresa A Ribeiro, uma desenvolvedora Front-end apaixonada por criar aplicações eficientes e amigáveis. Este projeto demonstra minhas habilidades em desenvolvimento web moderno, especialmente com React, TypeScript e boas práticas de desenvolvimento de software.

### Conecte-se comigo:

<p align="center">
  <a href="mailto:seu-email@exemplo.com"><img src="https://img.shields.io/static/v1?logoWidth=15&logoColor=ff69b4&logo=gmail&label=Email&message=seu-email@exemplo.com&color=ff69b4" target="_blank"></a>
  <a href="https://www.linkedin.com/in/seu-perfil/"><img alt="LinkedIn Profile" src="https://img.shields.io/static/v1?logoWidth=15&logoColor=0A66C2&logo=LinkedIn&label=LinkedIn&message=seu-perfil&color=0A66C2"></a>
</p>
