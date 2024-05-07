import { LoginPath } from './auth.path';
import { StudentPath, StudentPathId } from './students.path';

export default {
  '/login': LoginPath,
  '/students': StudentPath,
  '/students/{id}': StudentPathId,
};
