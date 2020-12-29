import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const validationSchema = schema.create({
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email' }),
        rules.required(),
      ]),
      password: schema.string({ trim: true }, [rules.required()]),
    })

    const userDetails = await request.validate({
      schema: validationSchema,
      messages: {
        'email.unique': 'Já existe um usuário com este email',
      },
    })

    await User.create(userDetails)

    return response.status(202).json({
      ok: true,
      message: 'Usuario criado com sucesso',
    })
  }
}
