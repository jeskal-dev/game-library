import { useCallback, useEffect, type PropsWithChildren } from "react";
import { useService } from "../di";
import { DatabaseService } from "./database";
import { EntityContainer } from "./container";

export const DatabaseProvider = ({ children }: PropsWithChildren) => {
  const database = useService(DatabaseService);
  const container = EntityContainer.instance;

  const initializeDatabase = useCallback(async () => {
    if (container.isDbInitialized) return;

    try {
      await import("@/lib/domain/models");
      await database.initialize();
      container.markDbAsInitialized();
    } catch (error) {
      console.error("Error crítico en inicialización:", error);
      // Manejo de error global
    }
  }, [container, database]);

  useEffect(() => void initializeDatabase(), [initializeDatabase]);
  return children;
};
