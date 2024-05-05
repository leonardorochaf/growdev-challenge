// eslint-disable-next-line import/no-extraneous-dependencies
import { DataType, IMemoryDb, newDb } from 'pg-mem';

import { DbConnection } from '../../database/connection';

export const initFakePgDb = async (entities?: any[]): Promise<IMemoryDb> => {
  const db = newDb({
    autoCreateForeignKeyIndices: true,
  });
  // workaround for incompatibility between pg-mem and typeorm@>0.2.29
  db.public.registerFunction({
    implementation: () => 'test',
    name: 'current_database',
  }).registerFunction({
    implementation: () => 'test',
    name: 'version',
  }).registerFunction({
    name: 'obj_description',
    args: [DataType.text, DataType.text],
    returns: DataType.text,
    implementation: () => 'test',
  });

  const datasource = await db.adapters.createTypeormDataSource({
    type: 'postgres',
    entities: entities ?? ['src/database/models/*.ts'],
  });

  await DbConnection.getInstance().connect(datasource);
  await datasource.synchronize();
  return db;
};
