import type { Constructor } from "./types";

export class DIContainer {
  private static _instance: DIContainer;
  public static get instance() {
    if (!DIContainer._instance) DIContainer._instance = new DIContainer();
    return DIContainer._instance;
  }

  private readonly dependencies = new Map<Constructor, unknown>();

  register<T>(token: Constructor<T>) {
    const instance = new token();
    this.dependencies.set(token, instance);
  }

  resolve<T>(token: Constructor<T>): T {
    return this.dependencies.get(token) as T;
  }
}
