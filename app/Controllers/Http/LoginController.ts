import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

const loginSchema = schema.create({
  email: schema.string({}, [rules.email(), rules.exists({ table: 'users', column: 'email' })]),
  password: schema.string(),
})

export default class LoginController {
  public async handle({ auth, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate({ schema: loginSchema })
      const token = await auth.use('api').attempt(payload.email, payload.password, {
        expiresIn: '15 mins',
      })

      const user = await User.findBy('email', payload.email)

      response.json({
        status: 'Successful',
        data: user,
        token: token,
      })
    } catch (error) {
      return response.unauthorized('Invalid credentials')
    }
  }
}
