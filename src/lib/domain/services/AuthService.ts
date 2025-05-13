import { inject, Injectable } from "@/core";
import { ConfigService } from "./ConfigService";
import {
  type AuthError,
  createClient,
  type Session,
  type User,
} from "@supabase/supabase-js";

interface AuthData {
  email: string;
  password: string;
}

interface PasswordResetData {
  email: string;
}

interface UpdatePasswordData {
  newPassword: string;
}

@Injectable()
export class AuthService {
  private readonly config = inject(ConfigService);
  supabase;

  constructor() {
    const url = this.config.get("SUPABASE_URL");
    const key = this.config.get("SUPABASE_KEY");
    if (!url || !key) throw new Error("Supabase URL or Key not configured");
    this.supabase = createClient(url, key);
  }

  private handleAuthError(error: AuthError | null, context: string): void {
    if (error)
      throw new Error(`${context}: ${error.message} (${error.status})`);
  }

  async login(value: AuthData) {
    const { data, error } = await this.supabase.auth.signInWithPassword(value);

    this.handleAuthError(error, "Login failed");
    return data.user!;
  }

  async register({ email, password }: AuthData): Promise<User> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    this.handleAuthError(error, "Registration failed");
    return data.user!;
  }

  async logout(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    this.handleAuthError(error, "Logout failed");
  }

  async resetPassword({ email }: PasswordResetData): Promise<void> {
    const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    this.handleAuthError(error, "Password reset failed");
  }

  async updatePassword({ newPassword }: UpdatePasswordData): Promise<User> {
    const { data, error } = await this.supabase.auth.updateUser({
      password: newPassword,
    });

    this.handleAuthError(error, "Password update failed");
    return data.user!;
  }

  async getCurrentSession(): Promise<Session | null> {
    const { data, error } = await this.supabase.auth.getSession();
    this.handleAuthError(error, "Session check failed");
    return data.session;
  }

  async getCurrentUser(): Promise<User | null> {
    const { data, error } = await this.supabase.auth.getUser();
    this.handleAuthError(error, "User check failed");
    return data.user;
  }

  async getJWT(): Promise<string | null> {
    const session = await this.getCurrentSession();
    return session?.access_token || null;
  }
}
