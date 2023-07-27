export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
  }
  
  export enum Permission {
    ADMIN_READ = 'admin:read',
    ADMIN_UPDATE = 'admin:update',
    ADMIN_CREATE = 'admin:create',
    ADMIN_DELETE = 'admin:delete',
    USER_READ = 'user:read'
  }
  
  export class User {
    id!: number;
    lastName!: string;
    firstName!: string;
    emailAddress!: string;
    birthDate!: Date;
    password!: string;
    niveau!: string;
    role!: Role;
    points!: number;
  }