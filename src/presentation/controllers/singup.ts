import { MissingParamsError, InvalidParamsError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import { type HttpRequest, type HttpResponse, type EmailValidator, type Controller } from '../protocols'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamsError(field))
        }
      }

      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
        return badRequest(new InvalidParamsError('passwordConfirmation'))
      }

      const { email } = httpRequest.body

      if (!this.emailValidator.isValid(email as string)) {
        return badRequest(new InvalidParamsError('email'))
      }

      return {
        statusCode: 200,
        body: {
          message: 'Success'
        }
      }
    } catch (error) {
      return serverError()
    }
  }
}
