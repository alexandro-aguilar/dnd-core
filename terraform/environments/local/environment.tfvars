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
  # Classes
  getClasses = {
    source_file   = "../.dist/getClassesHandler.js"
    handler       = "getClassesHandler.handler"
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
      POWERTOOLS_SERVICE_NAME = "dnd-core-getClasses"
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
  # Races
  getRaces = {
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
      POWERTOOLS_SERVICE_NAME = "dnd-core-getRaces"
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
  # Subraces
  getSubraces = {
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
      POWERTOOLS_SERVICE_NAME = "dnd-core-getSubraces"
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
  # Subclasses
  getSubclasses = {
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
      POWERTOOLS_SERVICE_NAME = "dnd-core-getSubclasses"
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
  # Abilities
  getAbilities = {
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
      POWERTOOLS_SERVICE_NAME = "dnd-core-getAbilities"
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
  # Skills
  getSkills = {
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
      POWERTOOLS_SERVICE_NAME = "dnd-core-getSkills"
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
  # Items
  getItems = {
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
      POWERTOOLS_SERVICE_NAME = "dnd-core-getItems"
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
  # Spells
  getSpells = {
    source_file   = "../.dist/getSpellsHandler.js"
    handler       = "getSpellsHandler.handler"
    runtime       = "nodejs22.x"
    description   = "Retrieves spell data"
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
      POWERTOOLS_SERVICE_NAME = "dnd-core-getSpells"
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
        path   = "/spells"
      }
    ]
  }
  # Characters
  getCharacters = {
    source_file   = "../.dist/getCharactersHandler.js"
    handler       = "getCharactersHandler.handler"
    runtime       = "nodejs22.x"
    description   = "Retrieves character data"
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
      POWERTOOLS_SERVICE_NAME = "dnd-core-getCharacters"
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
        path   = "/characters"
      }
    ]
  }
  postCharacter = {
    source_file   = "../.dist/postCharacterHandler.js"
    handler       = "postCharacterHandler.handler"
    runtime       = "nodejs22.x"
    description   = "Creates a new character"
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
      POWERTOOLS_SERVICE_NAME = "dnd-core-postCharacter"
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
        method = "POST"
        path   = "/characters"
      }
    ]
  }
  getCharacterById = {
    source_file   = "../.dist/getCharacterByIdHandler.js"
    handler       = "getCharacterByIdHandler.handler"
    runtime       = "nodejs22.x"
    description   = "Retrieves character data"
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
      POWERTOOLS_SERVICE_NAME = "dnd-core-getCharacterById"
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
        path   = "/characters/{characterId}"
      }
    ]
  }
  # Users
  syncUserOnSignup = {
    source_file   = "../.dist/syncUserOnSignupHandler.js"
    handler       = "syncUserOnSignupHandler.handler"
    runtime       = "nodejs22.x"
    description   = "Sync Cognito sign-ups into the users table"
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
      POWERTOOLS_SERVICE_NAME = "dnd-core-syncUserOnSignup"
      POWERTOOLS_LOG_LEVEL    = "INFO"
      PROJECT_NAME            = "DnD"
      DB_HOST                 = "postgres_dnd-core_db"
      DB_PORT                 = "5432"
      DB_USER                 = "postgres"
      DB_PASSWORD             = "postgres"
      DB_NAME                 = "dnd-core"
    }
    routes = []
  }
  # Sessions
  postSession = {
    source_file   = "../.dist/postSessionHandler.js"
    handler       = "postSessionHandler.handler"
    runtime       = "nodejs22.x"
    description   = "Creates a new session"
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
      POWERTOOLS_SERVICE_NAME = "dnd-core-postSession"
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
        method = "POST"
        path   = "/sessions"
      }
    ]
  }

  postQuest = {
    source_file   = "../.dist/postQuestHandler.js"
    handler       = "postQuestHandler.handler"
    runtime       = "nodejs22.x"
    description   = "Creates a new quest"
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
      POWERTOOLS_SERVICE_NAME = "dnd-core-postQuest"
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
        method = "POST"
        path   = "/quests"
      }
    ]
  }
}
