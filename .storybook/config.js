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
