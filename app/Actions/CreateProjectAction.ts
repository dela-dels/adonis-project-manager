import Project from 'App/Models/Project'
import Logger from '@ioc:Adonis/Core/Logger'

export default class CreateProjectAction {
  public execute(createProjectRequest): Promise<Project> {
    Logger.info('creating project %o', createProjectRequest)

    return Project.create({
      name: createProjectRequest.name,
      startDate: createProjectRequest.startedAt,
      endDate: createProjectRequest.endsAt,
      createdBy: createProjectRequest.createdBy,
    })
  }
}
