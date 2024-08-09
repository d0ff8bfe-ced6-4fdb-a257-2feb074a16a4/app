import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  joinPathFragments,
  names,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { PrismaGeneratorGeneratorSchema } from './schema';

interface GeneratorOptions {
  name: string;
  provider: string;
  connectionString: string;
  port: number;
}

export async function prismaGeneratorGenerator(
  tree: Tree,
  schema: GeneratorOptions
) {
  const { name, className, constantName } = names(schema.name);
  const projectRoot = `libs/prisma-clients/${name}`;
  const infrastructurePath = `infrastructure/database/${name}`;

  // Генерация файлов в директории libs/prisma-clients/NAME
  generateFiles(
    tree,
    joinPathFragments(__dirname, './template'),
    projectRoot,
    {
      dbType: schema.provider,
      tmpl: '',
      name,
      className,
      constantName,
      outputLocation: `../../../../node_modules/.prisma/${name}-client`,
    }
  );

  // Создание файлов в директории infrastructure/database/NAME
  generateFiles(
    tree,
    joinPathFragments(__dirname, './template-infrastructure'),
    infrastructurePath,
    {
      dbType: schema.provider,
      tmpl: '',
      name,
      className,
      constantName,
    }
  );

  // Создание YAML файла для базы данных
  const yamlFilePath = `${infrastructurePath}/database-${name}.yaml`;
  const yamlContent = `
apiVersion: v1
kind: ConfigMap
metadata:
  name: ${name}-postgres-config
data:
  POSTGRES_DB: ${name}DB
  POSTGRES_USER: postgres
  POSTGRES_PASSWORD: postgres

---
apiVersion: v1
kind: Service
metadata:
  name: ${name}-postgres-service
spec:
  ports:
    - port: ${schema.port}
      targetPort: 5432
  selector:
    app: ${name}-postgres
  type: ClusterIP

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${name}-postgres-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: ${name}-postgres
  template:
    metadata:
      labels:
        app: ${name}-postgres
    spec:
      containers:
        - name: postgres
          image: postgres:13
          ports:
            - containerPort: 5432
          envFrom:
            - configMapRef:
                name: ${name}-postgres-config
          volumeMounts:
            - name: postgres-storage
              mountPath: /var/lib/postgresql/data
      volumes:
        - name: postgres-storage
          persistentVolumeClaim:
            claimName: ${name}-postgres-pvc

---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: ${name}-postgres-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
  `;

  tree.write(yamlFilePath, yamlContent.trim());

  // Обновление файла .env
  if (!tree.exists('.env')) {
    tree.write('.env', '');
  }

  let contents = tree.read('.env').toString();
  contents += `\n${constantName}_SOURCE_URL=${schema.connectionString}\n`;
  tree.write('.env', contents);

  // Обновление экспорта клиентов Prisma
  if (!tree.exists('libs/prisma-clients/index.ts')) {
    tree.write('libs/prisma-clients/index.ts', '');
  }

  let exportsContents = tree.read('libs/prisma-clients/index.ts').toString();
  exportsContents += `export { ${className}Client } from './${name}';\n`;
  tree.write('libs/prisma-clients/index.ts', exportsContents);

  await formatFiles(tree);
}

export default prismaGeneratorGenerator;