import { inject, type Constructor } from "@/core";
import { EntityService } from "../domain/services/EntityService";

export function Entity() {
  return (target: Constructor) => {
    const service = inject(EntityService);
    service.register(target);
  };
}
