/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Application from '@ioc:Adonis/Core/Application'
import Logger from '@ioc:Adonis/Core/Logger'
import Config from '@ioc:Adonis/Core/Config'

Route.get('/', async () => {
  console.log(Application.environment)
  Logger.info('This is an information log')
  Config.get('app.appKey')
  return { hello: 'world' }
})

Route.resource('projects', 'ProjectsController').apiOnly()

Route.get('test', ({ request, response }) => {
  console.log(request.url())
  console.log(request.all())

  response.send({
    name: request.qs().name,
    age: parseInt(request.qs().age),
    school: request.qs()?.school,
  })
})
