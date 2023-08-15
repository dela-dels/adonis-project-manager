import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

const createUserSchema = schema.create({
  name: schema.string({}, [rules.required()]),
  email: schema.string({}, [
    rules.required(),
    rules.email(),
    rules.unique({ table: 'users', column: 'email' }),
  ]),
  password: schema.string({}, [rules.minLength(8), rules.confirmed()]),
  mobileNumber: schema.string({}, [rules.required()]),
})
export default class UsersController {
  public async handle({ request, response }: HttpContextContract) {
    Logger.info('About to create user with the following details %o', { request: request.body() })

    const payload = await request.validate({ schema: createUserSchema })

    try {
      const u = await User.create(payload)

      response.json({
        status: 'Successful',
        data: u,
      })
    } catch (error) {
      response.status(500)
      response.json({
        status: 'Failed',
        data: null,
        message: 'Unable to create user',
      })
    }
  }
}
