export interface User {
    id:       number;
    email:    string;
    password: string;
    name:     string;
    role:     string;
    avatar:   string;
}

export interface Users {
    users: User[];
}

export interface TableDataUsers {
    data : User[],
    setDataToEdit: (user: User) => void;
  deleteData: (userId: number) => void;
}
