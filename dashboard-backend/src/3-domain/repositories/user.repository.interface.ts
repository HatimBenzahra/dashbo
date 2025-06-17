import { User } from '../entities/user.entity';

// Type pour les données de création d'utilisateur
// On exclut les champs qui seront gérés par la BDD ou hachés séparément
export type CreateUserPayload = Omit<User, 'id' | 'passwordHash' | 'comparePassword' | 'dateInscription'> & {
  password: string;
};

// Le symbole pour l'injection de dépendances
export const IUserRepository = Symbol('IUserRepository');

export interface IUserRepository {
  /**
   * Trouve un utilisateur par son adresse e-mail.
   * @param email L'adresse e-mail de l'utilisateur.
   * @returns L'entité User ou null si non trouvé.
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Crée un nouvel utilisateur dans la base de données.
   * @param payload Les données nécessaires pour créer un utilisateur.
   * @returns L'entité User nouvellement créée.
   */
  create(payload: CreateUserPayload): Promise<User>;
}