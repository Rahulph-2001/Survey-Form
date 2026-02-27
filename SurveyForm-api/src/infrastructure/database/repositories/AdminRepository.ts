import { injectable } from "inversify";
import { IAdminRepository } from "../../../domain/repositories/IAdminRepository";
import { Admin } from "../../../domain/entities/Admin";
import { AdminModel, IAdminDocument } from "../models/AdminModel";

@injectable()
export class AdminRepository implements IAdminRepository {
    async findByUsername(username: string): Promise<Admin | null> {
        const adminDoc = await AdminModel.findOne({ username});
        if(!adminDoc) return null;
        return this.toDomain(adminDoc)
    }
    async create(admin: Admin): Promise<Admin> {
        const created = await AdminModel.create({
            username: admin.username,
            passwordHash: admin.passwordHash
        });
        return this.toDomain(created)
    }
    private toDomain(doc: IAdminDocument): Admin {
        return new Admin({
            id: doc._id.toString(),
            username: doc.username,
            passwordHash: doc.passwordHash,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt
        });
    }
}