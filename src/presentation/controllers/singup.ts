import { MissingParamsError } from '../errors/missing-params-error'
import { badRequest } from '../helpers/http-helper'
import { type HttpRequest, type HttpResponse } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamsError('name'))
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParamsError('email'))
    }

    return {
      statusCode: 200,
      body: {
        message: 'Success'
      }
    }
  }
}
