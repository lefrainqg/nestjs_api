import 'dotenv/config'

import * as joi from 'joi'

interface EnvVars {

   //Database
   DB_HOST: string
   DB_PORT: number
   DB_USERNAME: string
   DB_PASSWORD: string
   DB_NAME: string

   //External apis
   API_CENTRALIZADA2: string

   //Server
   PORT: number

}

const envsSchema = joi.object({
   //Database
   DB_HOST: joi.string().required(),
   DB_PORT: joi.number().required(),
   DB_USERNAME: joi.string().required(),
   DB_PASSWORD: joi.string().required(),
   DB_NAME: joi.string().required(),

   //External apis
   API_CENTRALIZADA2: joi.string().required(),

   //Server
   PORT: joi.number().required(),

}).unknown(true)

const { error, value } = envsSchema.validate({
   ...process.env
})

if (error) {
   throw new Error(`Config validation error: ${error.message}`)
}

const envVars: EnvVars = value

export const envs = {

   // Database
   dbHost: envVars.DB_HOST,
   dbPort: envVars.DB_PORT,
   dbUsername: envVars.DB_USERNAME,
   dbPassword: envVars.DB_PASSWORD,
   dbName: envVars.DB_NAME,

   // External apis
   apiCentralizada2: envVars.API_CENTRALIZADA2,

   // Server
   port: envVars.PORT,

}
