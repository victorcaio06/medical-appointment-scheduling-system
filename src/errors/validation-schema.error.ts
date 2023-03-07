import { ErrorSchema } from "../infra/shared/validator/zod";

export class ValidationSchemaError extends Error {
  statusCode: number;
  erros: ErrorSchema[];

  constructor(message: string, errors: ErrorSchema[]) {
    super(message);
    this.name = "VALIDATION_SCHEMA_ERROR";
    this.statusCode = 422;
    this.erros = errors;
  }
}
