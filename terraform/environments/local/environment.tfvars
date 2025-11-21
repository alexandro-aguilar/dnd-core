# Local environment configuration
# This file contains only LOCAL-SPECIFIC overrides
# Note: Terraform requires all required fields to be present

project_name = "dnd"
environment  = "local"

# LocalStack specific settings
use_localstack = true

# Development-friendly settings
log_retention_in_days = 1

# Use Terraform's path functions for dynamic absolute path resolution
# base_absolute_path will be calculated dynamically using abspath() in locals

# Override Lambda functions for LOCAL environment
lambda_functions = {
  example = {
    source_file   = "../.dist/exampleHandler.js"
    handler       = "exampleHandler.handler"
    runtime       = "nodejs22.x"
    description   = "Example Lambda function for local testing"
    memory_size   = 1024
    timeout       = 10
    architectures = ["arm64"]
    layers        = []
    environment = {
      NODE_ENV            = "local"
      LOG_LEVEL           = "debug"
      LOCALSTACK_HOSTNAME = "localhost"
    }
    routes = [
      {
        method = "GET"
        path   = "/example"
      }
    ]
  }

  getClass = {
    source_file   = "../.dist/getClassHandler.js"
    handler       = "getClassHandler.handler"
    runtime       = "nodejs22.x"
    description   = "Retrieves class data"
    memory_size   = 1024
    timeout       = 10
    architectures = ["arm64"]
    layers        = []
    environment = {
      NODE_ENV                = "local"
      LOG_LEVEL               = "debug"
      LOCALSTACK_HOSTNAME     = "localhost"
      STAGE                   = "local"
      OPENAI_API_KEY          = ""
      POWERTOOLS_SERVICE_NAME = "dnd-core-classes"
      POWERTOOLS_LOG_LEVEL    = "INFO"
      PROJECT_NAME            = "DnD"
      DB_HOST                 = "postgres_dnd-core_db"
      DB_PORT                 = "5432"
      DB_USER                 = "postgres"
      DB_PASSWORD             = "postgres"
      DB_NAME                 = "dnd-core"
    }
    routes = [
      {
        method = "GET"
        path   = "/classes"
      }
    ]
  }

  getRace = {
    source_file   = "../.dist/getRacesHandler.js"
    handler       = "getRacesHandler.handler"
    runtime       = "nodejs22.x"
    description   = "Retrieves race data"
    memory_size   = 1024
    timeout       = 10
    architectures = ["arm64"]
    layers        = []
    environment = {
      NODE_ENV                = "local"
      LOG_LEVEL               = "debug"
      LOCALSTACK_HOSTNAME     = "localhost"
      STAGE                   = "local"
      OPENAI_API_KEY          = ""
      POWERTOOLS_SERVICE_NAME = "dnd-core-classes"
      POWERTOOLS_LOG_LEVEL    = "INFO"
      PROJECT_NAME            = "DnD"
      DB_HOST                 = "postgres_dnd-core_db"
      DB_PORT                 = "5432"
      DB_USER                 = "postgres"
      DB_PASSWORD             = "postgres"
      DB_NAME                 = "dnd-core"
    }
    routes = [
      {
        method = "GET"
        path   = "/races"
      }
    ]
  }

  getSubrace = {
    source_file   = "../.dist/getSubracesHandler.js"
    handler       = "getSubracesHandler.handler"
    runtime       = "nodejs22.x"
    description   = "Retrieves subrace data"
    memory_size   = 1024
    timeout       = 10
    architectures = ["arm64"]
    layers        = []
    environment = {
      NODE_ENV                = "local"
      LOG_LEVEL               = "debug"
      LOCALSTACK_HOSTNAME     = "localhost"
      STAGE                   = "local"
      OPENAI_API_KEY          = ""
      POWERTOOLS_SERVICE_NAME = "dnd-core-classes"
      POWERTOOLS_LOG_LEVEL    = "INFO"
      PROJECT_NAME            = "DnD"
      DB_HOST                 = "postgres_dnd-core_db"
      DB_PORT                 = "5432"
      DB_USER                 = "postgres"
      DB_PASSWORD             = "postgres"
      DB_NAME                 = "dnd-core"
    }
    routes = [
      {
        method = "GET"
        path   = "/subraces"
      }
    ]
  }

  getSubclass = {
    source_file   = "../.dist/getSubclassesHandler.js"
    handler       = "getSubclassesHandler.handler"
    runtime       = "nodejs22.x"
    description   = "Retrieves subclass data"
    memory_size   = 1024
    timeout       = 10
    architectures = ["arm64"]
    layers        = []
    environment = {
      NODE_ENV                = "local"
      LOG_LEVEL               = "debug"
      LOCALSTACK_HOSTNAME     = "localhost"
      STAGE                   = "local"
      OPENAI_API_KEY          = ""
      POWERTOOLS_SERVICE_NAME = "dnd-core-classes"
      POWERTOOLS_LOG_LEVEL    = "INFO"
      PROJECT_NAME            = "DnD"
      DB_HOST                 = "postgres_dnd-core_db"
      DB_PORT                 = "5432"
      DB_USER                 = "postgres"
      DB_PASSWORD             = "postgres"
      DB_NAME                 = "dnd-core"
    }
    routes = [
      {
        method = "GET"
        path   = "/subclasses"
      }
    ]
  }

  getAbility = {
    source_file   = "../.dist/getAbilitiesHandler.js"
    handler       = "getAbilitiesHandler.handler"
    runtime       = "nodejs22.x"
    description   = "Retrieves ability data"
    memory_size   = 1024
    timeout       = 10
    architectures = ["arm64"]
    layers        = []
    environment = {
      NODE_ENV                = "local"
      LOG_LEVEL               = "debug"
      LOCALSTACK_HOSTNAME     = "localhost"
      STAGE                   = "local"
      OPENAI_API_KEY          = ""
      POWERTOOLS_SERVICE_NAME = "dnd-core-classes"
      POWERTOOLS_LOG_LEVEL    = "INFO"
      PROJECT_NAME            = "DnD"
      DB_HOST                 = "postgres_dnd-core_db"
      DB_PORT                 = "5432"
      DB_USER                 = "postgres"
      DB_PASSWORD             = "postgres"
      DB_NAME                 = "dnd-core"
    }
    routes = [
      {
        method = "GET"
        path   = "/abilities"
      }
    ]
  }

  getSkill = {
    source_file   = "../.dist/getSkillsHandler.js"
    handler       = "getSkillsHandler.handler"
    runtime       = "nodejs22.x"
    description   = "Retrieves skill data"
    memory_size   = 1024
    timeout       = 10
    architectures = ["arm64"]
    layers        = []
    environment = {
      NODE_ENV                = "local"
      LOG_LEVEL               = "debug"
      LOCALSTACK_HOSTNAME     = "localhost"
      STAGE                   = "local"
      OPENAI_API_KEY          = ""
      POWERTOOLS_SERVICE_NAME = "dnd-core-classes"
      POWERTOOLS_LOG_LEVEL    = "INFO"
      PROJECT_NAME            = "DnD"
      DB_HOST                 = "postgres_dnd-core_db"
      DB_PORT                 = "5432"
      DB_USER                 = "postgres"
      DB_PASSWORD             = "postgres"
      DB_NAME                 = "dnd-core"
    }
    routes = [
      {
        method = "GET"
        path   = "/skills"
      }
    ]
  }

  getItem = {
    source_file   = "../.dist/getItemsHandler.js"
    handler       = "getItemsHandler.handler"
    runtime       = "nodejs22.x"
    description   = "Retrieves item data"
    memory_size   = 1024
    timeout       = 10
    architectures = ["arm64"]
    layers        = []
    environment = {
      NODE_ENV                = "local"
      LOG_LEVEL               = "debug"
      LOCALSTACK_HOSTNAME     = "localhost"
      STAGE                   = "local"
      OPENAI_API_KEY          = ""
      POWERTOOLS_SERVICE_NAME = "dnd-core-classes"
      POWERTOOLS_LOG_LEVEL    = "INFO"
      PROJECT_NAME            = "DnD"
      DB_HOST                 = "postgres_dnd-core_db"
      DB_PORT                 = "5432"
      DB_USER                 = "postgres"
      DB_PASSWORD             = "postgres"
      DB_NAME                 = "dnd-core"
    }
    routes = [
      {
        method = "GET"
        path   = "/items"
      }
    ]
  }
}
