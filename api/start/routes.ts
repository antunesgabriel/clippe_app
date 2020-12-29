import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})

Route.post('/signin', 'AuthController.login')
Route.post('/signup', 'UsersController.store')

Route.group(() => {
  Route.get('/authenticated', async () => {
    return {
      ok: true,
    }
  })

  Route.resource('/clippers', 'ClippersController').only(['index', 'store', 'update', 'destroy'])
}).middleware('auth')
