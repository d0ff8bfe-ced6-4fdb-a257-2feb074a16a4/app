export interface PrismaGeneratorGeneratorSchema {
  "name": {
    "type": "string",
    "description": "Prisma Project Name",
    "x-prompt": "What do you want to call the project?"
  },
  "provider": {
    "type": "string",
    "description": "Database Type",
    "x-prompt": {
      "message": "Which type of database are you connecting to?",
      "type": "list",
      "items": [
        { "value": "sqlserver", "label": "MSSQL" },
        { "value": "postgresql", "label": "Postgres" },
        { "value": "mysql", "label": "MySQL" },
        { "value": "sqlite", "label": "SQLite" },
        { "value": "mongodb", "label": "MongoDB" }
      ]
    },
    "connectionString": {
      "type": "string",
      "description": "Connection String",
      "x-prompt": "What is the connection string you want to use?"
    }
  },
  "required": ["name", "provider", "connectionString"],
}