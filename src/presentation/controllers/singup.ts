import { MissingParamsError } from '../errors/missing-params-error'
import { badRequest } from '../helpers/http-helper'
import { type HttpRequest, type HttpResponse } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamsError(field))
      }
    }

    return {
      statusCode: 200,
      body: {
        message: 'Success'
      }
    }
  }
}
