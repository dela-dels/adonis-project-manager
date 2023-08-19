import Project from 'App/Models/Project'
import Logger from '@ioc:Adonis/Core/Logger'
import { DateTime } from 'luxon'
import { DatabaseProviderRow } from '@ioc:Adonis/Addons/Auth'

export default class CreateProjectAction {
  public execute(
    createProjectRequest: {
      name: string
      startedAt: DateTime
      endsAt: DateTime
    },
    user: DatabaseProviderRow | undefined
  ): Promise<Project> {
    Logger.info('creating project %o', createProjectRequest)

    return Project.create({
      name: createProjectRequest.name,
      startDate: createProjectRequest.startedAt,
      endDate: createProjectRequest.endsAt,
      createdBy: user?.id,
      code: createProjectRequest.name.slice(0, 4).toLocaleUpperCase(),
    })
  }
}
