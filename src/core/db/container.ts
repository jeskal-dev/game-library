import type { Constructor } from "../di";
import type { EntityOptions } from "./types";

export class EntityContainer {
  private static _instance: EntityContainer;
  private _schemas: Record<string, string> = {};
  private _currentVersion: number;
  private _isDbInitialized = false;

  // Colecciones de metadatos
  public readonly entities = new Set<Constructor>();
  public readonly entityMetadata = new Map<Constructor, EntityOptions>();
  public readonly primaryKeys = new Map<Constructor, string>();
  public readonly columns = new Map<Constructor, Set<string>>();

  private constructor() {
    this._currentVersion = this.loadPersistedVersion();
  }

  static get instance() {
    return this._instance || (this._instance = new EntityContainer());
  }

  get currentVersion() {
    return this._currentVersion;
  }

  get isDbInitialized() {
    return this._isDbInitialized;
  }

  /** Registra el esquema de una entidad con validación completa */
  registerEntitySchema(entity: Constructor, options: EntityOptions) {
    this.validatePrimaryKey(entity);

    const tableName = options.tableName || entity.name;
    const pk = this.primaryKeys.get(entity)!;
    const columns = Array.from(this.columns.get(entity)?.values() ?? []);
    console.log({columns})
    this._schemas[tableName] = [pk, ...columns].join(", ");
    // this.updateVersion();
  }

  /** Obtiene esquemas actuales para configuración de DB */
  get schemas() {
    return { ...this._schemas };
  }

  /** Sistema de versionado mejorado */
  private loadPersistedVersion(): number {
    const stored = localStorage.getItem("dbVersion");
    return stored ? parseInt(stored, 10) : 1;
  }

  private updateVersion() {
    const schemaHash = Object.keys(this._schemas).sort().join("|");
    this._currentVersion = this.generateStableHash(schemaHash);
    localStorage.setItem("dbVersion", this._currentVersion.toString());
  }

  private generateStableHash(str: string): number {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) + hash + str.charCodeAt(i);
    }
    return hash >>> 0; // Entero positivo
  }

  /** Validaciones centralizadas */
  private validatePrimaryKey(entity: Constructor) {
    if (!this.primaryKeys.has(entity)) {
      throw new Error(`Entidad ${entity.name} debe tener @PrimaryKey definido`);
    }
  }

  markDbAsInitialized() {
    this._isDbInitialized = true;
  }
}
