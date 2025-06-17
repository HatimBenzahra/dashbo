import { UserRole } from '../enums/role.enum';
import * as bcrypt from 'bcrypt';

export class User {
  id: number;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  dateInscription: Date;

  // Logique métier pure : définir un nouveau mot de passe haché
  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  // Logique métier pure : comparer un mot de passe fourni avec le hash stocké
  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash);
  }
}