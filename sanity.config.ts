import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'
import { structure } from './sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'Bhoot Barhi E-Commerce',
  projectId: 'u9ap71p1',
  dataset: 'production',
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
})
