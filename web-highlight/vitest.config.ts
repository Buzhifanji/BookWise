import { defineProject } from 'vitest/config'

export default defineProject({
  test: {
    environment: 'happy-dom',
    // "reporters" is not supported in a project config,
    // so it will show an error
  }
})