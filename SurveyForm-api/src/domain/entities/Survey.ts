export interface CreateSurveyProps {

    id?: string;
    name: string;
    gender: string;
    nationality: string;
    email: string;
    phone: string;
    address: string;
    message: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Survey {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _gender: string;
    private readonly _nationality: string;
    private readonly _email: string;
    private readonly _phone: string;
    private readonly _address: string;
    private readonly _message: string;
    private readonly _createdAt: Date;
    private _updatedAt: Date;

    constructor(props: CreateSurveyProps){
        this._id = props.id || '';
        this._name = props.name;
        this._gender = props.gender;
        this._nationality = props.nationality;
        this._email = props.email;
        this._phone = props.phone;
        this._address = props.address;
        this._message = props.message;
        this._createdAt = props.createdAt || new Date();
        this._updatedAt = props.updatedAt || new Date();
        this.validate();

    }

    private validate(): void {
        if(!this._name || !this._email){
        throw new Error('Name and email are required')
        }
    }

    public get id(): string {return this._id; }
    public get name(): string {return this._name; }
    public get gender(): string {return this._gender; }
    public get nationality(): string {return this._nationality; }
    public get email(): string {return this._email; }
    public get phone(): string {return this._phone; }
    public get address(): string {return this._address; }
    public get message(): string {return this._message; }
    public get createdAt(): Date {return this._createdAt; }
    public get updatedAt(): Date {return this._updatedAt; }

}