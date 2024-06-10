import { AsyncLocalStorage } from 'async_hooks';
import { User } from '../schemas/user.schema';

export const UserStorage = {
  storage: new AsyncLocalStorage(),
  get() {
    return this.storage.getStore();
  },
  set(user: User) {
    return this.storage.enterWith(user);
  },
};
