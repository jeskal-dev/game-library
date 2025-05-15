import { useRepository } from "@/core/db";
import { User, UserRepository } from "@/lib/domain/models/user";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, type FormEvent } from "react";
import { useSignal } from "@preact-signals/safe-react";
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const repo = useRepository(UserRepository);
  const users = useSignal<User[]>([]);
  const form = useSignal<Partial<User>>({});
  const editing = useSignal<number | null>(null);

  const refreshUsers = useCallback(async () => {
    const data = await repo.getAll();
    console.log({ data });
    users.value = data;
  }, [repo, users]);

  useEffect(() => void refreshUsers(), [refreshUsers]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (editing.value) {
        await repo.update(editing.value, form.value);
      } else {
        await repo.create(form.value as Omit<User, "id">);
      }

      form.value = {};
      editing.value = null;
      await refreshUsers();
    } catch (error) {
      console.error("Operation failed:", error);
    }
  };

  const startEdit = (data: User) => {
    form.value = data;
    editing.value = data.id;
  };

  const deleteUser = async (id: number) => {
    if (window.confirm("¿Eliminar usuario?")) {
      await repo.delete(id);
      await refreshUsers();
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>{editing ? "Editar Usuario" : "Nuevo Usuario"}</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Nombre"
            value={form.value.name}
            onChange={(e) =>
              (form.value = { ...form.value, name: e.target.value })
            }
            required
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <input
            type="email"
            placeholder="Email"
            value={form.value.email}
            onChange={(e) =>
              (form.value = { ...form.value, email: e.target.value })
            }
            required
          />
        </div>

        <button type="submit" style={{ marginRight: "1rem" }}>
          {editing.value ? "Actualizar" : "Crear"}
        </button>

        {editing.value && (
          <button
            type="button"
            onClick={() => {
              form.value = {};
              editing.value = null;
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <h3>Lista de Usuarios</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.value.map((user) => (
          <li
            key={user.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.5rem",
              padding: "0.5rem",
              border: "1px solid #ddd",
            }}
          >
            <div>
              <strong>{user.name}</strong> ({user.email})
            </div>

            <div>
              <button
                onClick={() => startEdit(user)}
                style={{ marginRight: "0.5rem" }}
              >
                Editar
              </button>

              <button
                onClick={() => deleteUser(user.id)}
                style={{ background: "#ff4444", color: "white" }}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
