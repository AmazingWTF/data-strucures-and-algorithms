import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const pagesContext = require.context(
  '@/pages',
  false,
  /\.vue$/
)

let routes = []

pagesContext.keys().forEach(fileName => {
  fileName = fileName.replace(/\.\/([\w\W\d_]+)\.vue$/, (s, $1) => $1)

  routes.push({
    path: `/${fileName}`,
    name: fileName,
    component: () => import(`@/pages/${fileName}`)
  })
})

export default new Router({
  routes
})
