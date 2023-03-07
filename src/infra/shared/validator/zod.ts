import { ZodError, ZodSchema } from "zod";
import { ValidationSchemaError } from "../../../errors/validation-schema.error";

export type ErrorSchema = {
  filed: (string | number)[];
  message: string;
};

export const validatorSchema = (schema: ZodSchema, payload: any) => {
  try {
    schema.parse(payload);

    return;
  } catch (err) {
    const typedError = err as ZodError;
    const errors: ErrorSchema[] = [];

    typedError.errors.forEach((error) => {
      errors.push({
        filed: error.path,
        message: error.message,
      });
    });

    throw new ValidationSchemaError("ERROR_SCHEMA", errors);
  }
};
