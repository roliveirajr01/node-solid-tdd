import { type AddAccount } from '../../domain/usecases/add-account'
import { MissingParamsError, InvalidParamsError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import { type HttpRequest, type HttpResponse, type EmailValidator, type Controller } from '../protocols'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator, private readonly addAccount: AddAccount) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamsError(field))
        }
      }

      const { email, password, passwordConfirmation, name } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamsError('passwordConfirmation'))
      }

      if (!this.emailValidator.isValid(email as string)) {
        return badRequest(new InvalidParamsError('email'))
      }

      this.addAccount.add({
        name,
        email,
        password
      })

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
