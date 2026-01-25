# Site 360º - Sistema Multi-Projetos

## Visão Geral

Esta solução reestrutura o site 360º original para suportar múltiplos projetos de forma dinâmica e organizada. Agora é possível adicionar novos projetos facilmente sem misturar dados ou confundir a organização.

## Principais Melhorias

### 1. Estrutura de Dados Reorganizada
- O arquivo `data.json` agora suporta múltiplos projetos
- Cada projeto tem um ID único, nome, imagens e configurações próprias
- Hotspots e configurações de topview são específicos por projeto

### 2. Sistema Dinâmico de Projetos
- A página inicial (`index.html`) lista todos os projetos disponíveis
- Cada projeto é apresentado como um card clicável
- Navegação automática para a primeira sala do projeto selecionado

### 3. Carregamento Dinâmico de Dados
- O viewer (`viewer.html`) carrega dados específicos do projeto
- Hotspots são gerados dinamicamente baseados na configuração do projeto
- Imagem de topview e hotspots do topview são carregados por projeto

## Como Adicionar um Novo Projeto

### Passo 1: Preparar as Imagens
1. Crie uma nova pasta dentro de `img/` com o nome do seu projeto
2. Adicione todas as imagens 360º do projeto nesta pasta
3. Adicione uma imagem de topview (vista de cima) se necessário
4. Adicione uma imagem principal para o card do projeto

### Passo 2: Configurar o data.json
Adicione um novo objeto ao array `projects` no arquivo `data.json`:

```json
{
  "id": "meu-novo-projeto",
  "name": "Nome do Meu Projeto",
  "mainImage": "img/MeuProjeto/imagem_principal.jpg",
  "topViewImage": "img/MeuProjeto/topview.jpg",
  "rooms": [
    { "name": "Sala 1", "file": "MeuProjeto/sala1.jpg" },
    { "name": "Sala 2", "file": "MeuProjeto/sala2.jpg" }
  ],
  "hotspots": [
    {
      "from": "MeuProjeto/sala1.jpg",
      "to": "MeuProjeto/sala2.jpg",
      "text": "Ir para Sala 2",
      "pitch": 0,
      "yaw": 90
    }
  ],
  "topViewHotspots": [
    {
      "left": "30%",
      "top": "40%",
      "target": "MeuProjeto/sala1.jpg",
      "title": "Sala 1"
    }
  ]
}
```

### Passo 3: Configurar Hotspots
- **hotspots**: Definem as ligações entre salas no modo 360º
  - `pitch`: Ângulo vertical (-90 a 90)
  - `yaw`: Ângulo horizontal (0 a 360)
- **topViewHotspots**: Definem os pontos clicáveis na vista de cima

## Estrutura de Ficheiros

```
Site360/
├── index.html               # Página inicial com lista de projetos
├── viewer.html              # Visualizador 360º
├── data.json               # Configuração de todos os projetos
├── css/
│   └── style.css           # Estilos da aplicação
├── js/
│   ├── main.js             # Script da página inicial
│   └── viewer.js           # Script do visualizador
└── img/
    ├── 360icon.webp        # Ícone 360º
    └── [NomeProjeto]/      # Pasta de cada projeto
        ├── *.jpg           # Imagens 360º
        └── topview.jpg     # Vista de cima (opcional)
```

## Como Utilizar

1. Abra `index.html` no navegador
2. Clique no card do projeto desejado
3. Navegue pelas salas utilizando:
   - **Hotspots no modo 360º**: Pontos clicáveis na panorâmica
   - **Menu de salas**: Botão no canto inferior direito
   - **Vista de cima**: Botão "Top View" para visualizar o mapa

## Funcionalidades

- ✅ **Navegação 360º**: Visualização panorâmica completa
- ✅ **Hotspots Dinâmicos**: Pontos de navegação entre salas
- ✅ **Menu de Salas**: Lista de todas as salas do projeto
- ✅ **Vista de Cima**: Mapa interativo com hotspots
- ✅ **Partilha**: Copiar link da sala atual para a área de transferência
- ✅ **Responsivo**: Funciona em desktop e mobile

## Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Visualização 360º**: Pannellum.js
- **Estilos**: Bootstrap 5
- **Arquitetura**: Estrutura modular e escalável

## Vantagens da Nova Arquitetura

1. **Organização**: Cada projeto tem seus próprios dados e configurações
2. **Escalabilidade**: Fácil adição de novos projetos sem modificar código
3. **Manutenção**: Código mais limpo e modular
4. **Flexibilidade**: Cada projeto pode ter configurações únicas
5. **Reutilização**: Mesma base de código para todos os projetos

