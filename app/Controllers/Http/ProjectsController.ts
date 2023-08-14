import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import CreateProjectAction from 'App/Actions/CreateProjectAction'
import { schema } from '@ioc:Adonis/Core/Validator'
import Project from 'App/Models/Project'

const createPostSchema = schema.create({
  name: schema.string(),
  startedAt: schema.date(),
  endsAt: schema.date(),
  createdBy: schema.number(),
})

export default class ProjectsController {
  public async index({ request, response }: HttpContextContract) {
    Logger.info('Getting a list of all projects %o', { request: request.all() })
    response.json({
      status: 'Successful',
      data: await Project.query().paginate(1, 10),
    })
  }

  public async store({ request, response }: HttpContextContract) {
    Logger.info('creating a new project with the following details', request.body())

    const payload = await request.validate({ schema: createPostSchema })

    try {
      const project = await new CreateProjectAction().execute(payload)

      response.json({
        status: 'Successful',
        data: {
          id: project.uuid,
          name: project.name,
          startsOn: project.startDate,
          endsOn: project.endDate,
          ended: false, //TODO: change this to reflect if the end date is in the past or future
          projectCode: 'CHAPP',
        },
      })
    } catch (error) {
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
