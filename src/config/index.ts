import path from 'path';
import envSchema from 'env-schema';
import S from 'fluent-json-schema';

export default function loadConfig(): void {
  const result = require('dotenv').config({
    path: path.join(__dirname, '..', '..', '.env'),
  });

  if (result.error) {
    throw new Error(result.error);
  }

  envSchema({
    data: result.parsed,
    schema: S.object()
      .prop(
        'NODE_ENV',
        S.string().enum(['development', 'testing', 'production']).required(),
      )
      .prop('API_HOST', S.string().required())
      .prop('API_PORT', S.number().required())
      .prop('DATABASE_URL', S.string().required())
      .prop('APP_JWT_SECRET', S.string().required()),
  });
}
