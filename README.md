# CMAS-01

#Preject setup (under main path)

## Basic Setup

1. npm create vite@latest . -- --template react-ts
2. npm install
3. npm install -D eslint prettier eslint-plugin-react eslint-config-prettier eslint-plugin-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser
4. npx eslint --init
   // Add BaaS
5. npm install @supabase/supabase-js

## Package Setup

// Primereact for web component

1. npm install primereact primeicons
   // Tailwind for CSS
2. npm install -D tailwindcss postcss autoprefixer
3. npm install -D @tailwindcss/cli
4. npx tailwindcss init -p
5. npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/google-calendar

## Setting.json

{
// 格式化儲存時觸發
"editor.formatOnSave": true,

// 儲存時自動修復 ESLint 問題
"editor.codeActionsOnSave": {
"source.fixAll": true,
"source.fixAll.eslint": true
},

// 指定使用 Prettier 作為預設格式化工具

"[typescript]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},

"[typescriptreact]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
}
}
