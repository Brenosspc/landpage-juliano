# MISEGBAHIA Landing Page

Landing page institucional para a MISEGBAHIA, criada com HTML5, CSS3 e JavaScript puro. A página apresenta soluções para auto, imóvel e serviços adicionais, com prova social, FAQ e chamada para WhatsApp.

## Como executar localmente

Abra o arquivo index.html diretamente no navegador.

Também é possível servir a pasta com qualquer servidor estático simples, por exemplo usando a extensão Live Server do editor.

## Estrutura de arquivos

text
misegbahia-landing-page/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── logo/
│   ├── icons/
│   └── images/
└── README.md


## Onde alterar links

Os links temporários estão no index.html e usam textos como:

- [INSERIR URL ESPECÍFICA PARA CAMINHÃO]
- [INSERIR URL PARA CASA PRONTA]
- [INSERIR LINK DO INSTAGRAM]
- [INSERIR LINK DO LINKEDIN]

Substitua cada placeholder pela URL final do site principal ou rede social correspondente.

## Onde alterar cores

As cores ficam centralizadas em variáveis CSS no início de css/style.css, dentro de :root.

css
:root {
  --color-primary: #3E449B;
  --color-title: #171D45;
  --color-cta: #8CC12F;
  --color-cta-hover: #6FAE2E;
}


## Onde alterar dados institucionais

Atualize no index.html:

- Telefone e WhatsApp;
- E-mail institucional;
- CNPJ;
- Links de redes sociais;
- URLs dos botões de categorias e serviços.

## Seções implementadas

- Top bar com contato e redes sociais;
- Header sticky com menu desktop e menu hambúrguer mobile;
- Hero de apresentação;
- Seção Auto com Caminhão, Carro e Moto;
- Seção Imóvel com carrossel, setas, pontos e aba Feedback;
- Seção Serviços com carrossel;
- Seção Depoimentos com avatares e estrelas;
- Seção Sobre com FAQ accordion;
- Chamada para WhatsApp;
- Rodapé institucional e legal.

## JavaScript implementado

- Menu mobile abrindo e fechando;
- Fechamento do menu ao clicar nos links;
- Scroll suave para âncoras;
- Carrosséis com setas e pontos;
- Aba Feedback rolando até Depoimentos;
- FAQ com abrir e fechar;
- Atualização visual dos pontos ativos.

## Observações

Os elementos visuais foram criados como placeholders leves em texto/SVG/CSS para evitar imagens quebradas. A estrutura assets/ já está preparada para receber logotipo, ícones e imagens oficiais da MISEGBAHIA futuramente.
