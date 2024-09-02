export interface User {
    id: number;
    name: string;
    email: string;
    token: string;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
  }