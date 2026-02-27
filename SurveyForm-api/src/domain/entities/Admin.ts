export interface CreateAdminProps {
  id?: string;
  username: string;
  passwordHash: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Admin {
  private readonly _id: string;
  private readonly _username: string;
  private readonly _passwordHash: string;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: CreateAdminProps) {
    this._id = props.id || '';
    this._username = props.username;
    this._passwordHash = props.passwordHash;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();

    this.validate();
  }

  private validate(): void {
    if (!this._username || !this._passwordHash) {
      throw new Error('Username and password hash are required');
    }
  }

  public get id(): string { return this._id; }
  public get username(): string { return this._username; }
  public get passwordHash(): string { return this._passwordHash; }
  public get createdAt(): Date { return this._createdAt; }
  public get updatedAt(): Date { return this._updatedAt; }
}
