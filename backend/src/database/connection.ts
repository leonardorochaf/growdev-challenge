import {
  DataSource, ObjectLiteral, ObjectType, Repository,
} from 'typeorm';

export class DbConnection {
  private static instance: DbConnection;

  private datasource!: DataSource;

  private constructor() { }

  static getInstance(): DbConnection {
    if (!DbConnection.instance) {
      DbConnection.instance = new DbConnection();
    }

    return DbConnection.instance;
  }

  async connect(datasource: DataSource) {
    this.datasource = datasource;
    await this.datasource.initialize();
  }

  async disconnect() {
    await this.datasource.destroy();
  }

  getClient<Entity extends ObjectLiteral>(entity: ObjectType<Entity>): Repository<Entity> {
    return this.datasource.getRepository(entity);
  }
}
