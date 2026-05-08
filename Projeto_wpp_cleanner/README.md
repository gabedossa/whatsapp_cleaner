# 🧹 WhatsApp Cleaner

App mobile-first para gerenciar e limpar conversas e mídias antigas do WhatsApp com mais de 30 dias. Construído com **Next.js 14 + TypeScript**.

## 📱 Preview

Interface dark, animações fluidas, design system coeso e UX intuitiva.

## ✨ Funcionalidades

- **Dashboard** — anel animado de armazenamento com estatísticas rápidas
- **Análise** — escaneia conversas com mais de 30 dias de inatividade
- **Filtros** — por mais mídia ou +60 dias
- **Seleção** — individual ou todas de uma vez
- **Exclusão animada** — cada conversa sai com animação ao ser excluída
- **Configurações** — período mínimo, notificações, backup e mais
- **Tela de conclusão** — contador animado do espaço liberado

## 🚀 Como rodar localmente

```bash
# 1. Instale as dependências
npm install

# 2. Rode o servidor de desenvolvimento
npm run dev

# 3. Acesse no navegador
# http://localhost:3000
```

## 🏗️ Build para produção

```bash
npm run build
npm start
```

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| Next.js 14 | Framework React com App Router |
| TypeScript | Tipagem estática |
| next/font | Fontes Syne + DM Sans sem layout shift |
| CSS-in-JS | Inline styles sem dependências extras |

## 📁 Estrutura do projeto

```
src/
├── app/
│   ├── layout.tsx        # Root layout, fontes e CSS global
│   └── page.tsx          # Shell principal + gerenciamento de estado
├── components/
│   ├── HomeScreen.tsx     # Tela: Dashboard
│   ├── ScanScreen.tsx     # Tela: Análise e seleção
│   ├── DoneScreen.tsx     # Tela: Conclusão
│   ├── SettingsScreen.tsx # Tela: Configurações
│   ├── BottomNav.tsx      # Navegação inferior
│   ├── CircularProgress.tsx # Anel SVG animado
│   ├── Counter.tsx        # Contador numérico animado
│   └── Toast.tsx          # Notificação flutuante
├── data/
│   └── conversations.ts  # Dados mock das conversas
├── hooks/
│   └── useCounter.ts     # Hook para animação de números
├── types/
│   └── index.ts          # Interfaces e tipos TypeScript
└── utils/
    └── format.ts         # Funções utilitárias
```

## ⚠️ Aviso

Este app é um **protótipo de interface** (UI/UX demo). Por limitações do Android (sandboxing de apps), não é possível acessar dados internos do WhatsApp sem root.

## 📄 Licença

MIT
