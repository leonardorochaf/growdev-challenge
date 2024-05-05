import { ObjectLiteral, ObjectType, Repository } from 'typeorm';

import { DbConnection } from '../database/connection';

export abstract class AbstractRepository {
  getClient<Entity extends ObjectLiteral>(entity: ObjectType<Entity>): Repository<Entity> {
    return DbConnection.getInstance().getClient(entity);
  }
}
