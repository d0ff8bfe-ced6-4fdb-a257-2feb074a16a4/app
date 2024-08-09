# NekoDocs

## Install:

```bash
npm install -g nx
```

view System Graph:

```bash
nx graph
```


## Dev:

### FRONT:

create a new component for **shared**:

```bash
nx g @nx/react:component --project shared
```

create a new component for **widgets**:

```bash
nx g @nx/react:component --project widgets
```

create a new component for **features**:

```bash
nx g @nx/react:component --project features
```

create a new component for **entities**:

```bash
nx g @nx/react:component --project entities
```

create a new component for **pages**:

```bash
nx g @nx/react:component --project pages
```

### Prisma ORM:

Generate a new schema:

```bash
nx generate prisma-generator
```


**Migrations:**

```bash
prisma db push --schema="./libs/prisma-clients/NAME/prisma/schema.prisma"
```

```bash
prisma generate --schema="./libs/prisma-clients/NAME/prisma/schema.prisma"
```


## TODO:

- [x] base monorepo nx init
- [x] krakend n8n nx added
- [x] n8n nx added
- [ ] ml-flow added
- [x] air-flow added
- [ ] prometheus added
- [ ] grahana added
- [ ] writed base all-in-one deploy script
- [ ] prisma generator added
- [ ] backend docs added
- [ ] AGW configured
