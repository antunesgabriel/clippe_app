import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Clipper from 'App/Models/Clipper'
import User from 'App/Models/User'

export default class ClippersController {
  public async index({ auth, response }: HttpContextContract) {
    const user = auth.user

    if (!user) {
      return response.status(400).json({
        ok: false,
        message: 'Usuario não indentificado',
      })
    }

    const clippers = await Clipper.query()
      .orderBy('createdAt', 'desc')
      .where('user_id', user.id)
      .exec()

    return response.status(200).json({
      ok: true,
      clippers: clippers,
    })
  }

  public async store({ request, auth, response }: HttpContextContract) {
    const user = auth.user

    if (!user) {
      return response.status(400).json({
        ok: false,
        message: 'Usuario não indentificado',
      })
    }

    const validationSchema = schema.create({
      title: schema.string({ trim: true }, [rules.required()]),
      content: schema.string({ trim: true }, [rules.required()]),
    })

    const clipperDetails = await request.validate({
      schema: validationSchema,
    })

    const clip = await Clipper.create({ ...clipperDetails })

    const recovery = await User.find(user.id)

    recovery && (await clip.related('user').associate(recovery))

    const clippers = await Clipper.query()
      .orderBy('createdAt', 'desc')
      .where('user_id', user.id)
      .exec()

    return response.status(200).json({
      ok: true,
      clippers,
    })
  }

  public async update({ params, request, response, auth }: HttpContextContract) {
    const user = auth.user
    const { id } = params

    if (!user) {
      return response.status(400).json({
        ok: false,
        message: 'Usuario não indentificado',
      })
    }

    const validationSchema = schema.create({
      title: schema.string({ trim: true }, [rules.minLength(3)]),
      content: schema.string({ trim: true }, [rules.minLength(3)]),
    })

    const clipperDetails = await request.validate({
      schema: validationSchema,
    })

    const clipper = await Clipper.findOrFail(Number(id))

    await clipper.preload('user')

    if (clipper.user.id !== user.id) {
      return response.status(401).json({
        ok: false,
        message: 'Você não pode alterar este clipper.',
      })
    }

    clipper.title = clipperDetails.title || clipper.title
    clipper.content = clipperDetails.content || clipper.content

    await clipper.save()

    const clippers = await Clipper.query()
      .orderBy('createdAt', 'desc')
      .where('user_id', user.id)
      .exec()

    return response.status(200).json({
      ok: true,
      message: 'Clipper alterado com succeso',
      clippers,
    })
  }

  public async destroy({ params, response, auth }: HttpContextContract) {
    const user = auth.user
    const { id } = params

    if (!user) {
      return response.status(400).json({
        ok: false,
        message: 'Usuario não indentificado',
      })
    }

    const clipper = await Clipper.findOrFail(Number(id))

    await clipper.preload('user')

    if (clipper.user.id !== user.id) {
      return response.status(401).json({
        ok: false,
        message: 'Você não pode apagar este clipper.',
      })
    }

    await clipper.delete()

    const clippers = await Clipper.query()
      .orderBy('createdAt', 'desc')
      .where('user_id', user.id)
      .exec()

    return response.status(200).json({
      ok: true,
      message: 'Clipper apagado com succeso',
      clippers,
    })
  }
}
