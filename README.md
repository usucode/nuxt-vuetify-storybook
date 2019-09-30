# Nuxt Vuetify TypeScript StoryBook

> My pioneering Nuxt.js project

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

# Nuxt Vuetify TypeScript StoryBook

<details><summary>create-nuxt-app</summary>

```bash
mkdir nuxt-ts-sb
cd nuxt-ts-sb
create-nuxt-app .

create-nuxt-app v2.10.1
✨  Generating Nuxt.js project in .
? Project name nuxt-storybook
? Project description My well-made Nuxt.js project
? Author name yusuke akiyama
? Choose the package manager Yarn
? Choose UI framework Vuetify.js
? Choose custom server framework None (Recommended)
? Choose Nuxt.js modules Axios
? Choose linting tools ESLint, Prettier
? Choose test framework None
? Choose rendering mode Universal (SSR)
```

</details>

## SCSS に対応させる

```bash
yarn add -D node-sass sass-loader
```

ファイル名を変更しておく

`nuxt-config.js` -> `nuxt-config.ts`

## Google Material Icons を CDN で入れる

<details><summary>nuxt-config.ts</summary>

```ts
link: [
  { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  {
    rel: 'stylesheet',
    href:
      'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
  }
]
```

ダークモードを消す

```ts
    theme: {
      // dark: true,
```

</details>

## TypeScript に対応させる

```bash
yarn add -D @nuxt/typescript-runtime @nuxt/typescript-build
```

<details><summary>nuxt-config.ts</summary>

```ts
build: {
  /*
   ** You can extend webpack config here
   */
  // extend(config, ctx) {}
}
```

</details>

<details><summary>tsconfig.json</summary>

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "lib": ["esnext", "esnext.asynciterable", "dom"],
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "sourceMap": true,
    "strict": true,
    "allowSyntheticDefaultImports": true,
    "noEmit": true,
    "baseUrl": ".",
    "resolveJsonModule": true,
    "paths": {
      "~/*": ["./*"]
    },
    "types": ["@nuxt/types", "@nuxtjs/vuetify"] // 追記
  }
}
```

</details>

### 実行コマンドの変更

`nuxt` -> `nuxt-ts`

<details><summary>package.json</summary>

```json
  "scripts": {
    "dev": "nuxt-ts",
    "build": "nuxt-ts build",
    "start": "nuxt-ts start",
    "generate": "nuxt-ts generate",
    "lint": "eslint --ext .js,.vue --ignore-path .gitignore ."
  },
```

</details>

## StoryBook に対応させる

### Vue の StoryBook のインストール

```bash
npx -p @storybook/cli sb init --type vue
```

実行

```bash
yarn storybook
```

## Nuxt と StoryBook を連携させる

<details><summary>webpack.config.js</summary>

```js
const path = require('path')
const rootPath = path.resolve(__dirname, '../')

module.exports = {
  module: {
    rules: [
      {
        test: /\.css?$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': rootPath,
      '~': rootPath,
      vue$: 'vue/dist/vue.esm.js'
    }
  }
}
```

</details>

## Vuetify と StoryBook を連携させる

- 次のファイルを追加

<details><summary>preview-head.html</summary>

```html
<link
  href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons"
  rel="stylesheet"
/>
<link
  href="https://cdn.jsdelivr.net/npm/@mdi/font@3.x/css/materialdesignicons.min.css"
  rel="stylesheet"
/>
```

</details>

- 設定ファイルを変更

<details><summary>.story/config.js</summary>

```js
import { configure, addDecorator } from '@storybook/vue'

// 追加
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css' // →これ重要

// 依存注入
Vue.use(Vuetify)

addDecorator(() => ({
  vuetify: new Vuetify(),
  template: `
<v-app>
    <story/>
</v-app>
`
}))

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module)
```

</details>
