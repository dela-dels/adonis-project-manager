import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import CreateProjectAction from 'App/Actions/CreateProjectAction'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Project from 'App/Models/Project'

const createPostSchema = schema.create({
  name: schema.string({}, [rules.required(), rules.unique({ table: 'projects', column: 'name' })]),
  startedAt: schema.date({}, [rules.required()]),
  endsAt: schema.date({}, [rules.required()]),
})

export default class ProjectsController {
  public async index({ response }: HttpContextContract) {
    response.json({
      status: 'Successful',
      data: (await Project.query().preload('user').paginate(1, 10)).serialize(),
    })
  }

  public async store({ request, auth, response }: HttpContextContract) {
    Logger.info(request.body(), 'creating a new project with the following details')
    let payload = await request.validate({ schema: createPostSchema })

    try {
      const project = await new CreateProjectAction().execute(payload, auth.user)

      response.json({
        status: 'Successful',
        data: project.serialize(),
      })
    } catch (error) {
      Logger.error(error, 'error occurred trying to create new project')
      response.status(500)
      response.json({
        status: 'Failed',
        data: {},
        message: 'Unable to create project. Please try again',
      })
    }
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
