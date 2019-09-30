import { linkTo } from '@storybook/addon-links'

import Welcome from './Welcome'
import Test from '~/components/Test'
import Todos from '~/components/Todos'

export default {
  title: 'Welcome'
}

export const toStorybook = () => ({
  components: { Welcome },
  template: '<welcome :showApp="action" />',
  methods: { action: linkTo('Button') }
})
toStorybook.story = {
  name: 'to Storybook'
}
export const testComponent = () => ({
  components: { Test },
  template: '<Test />'
})

export const todoSample = () => ({
  components: { Todos },
  template: '<Todos />'
})
