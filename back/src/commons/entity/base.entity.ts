import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

//     Classe abstrata. Todas as minhas entidades
// que precisam de data de criação/update vão herdar dela.
// Isso é P.O.O. aplicado ao banco.
export abstract class BaseEntity {
  
  // O TypeORM vai preencher isso automaticamente quando um
  // novo registro for criado.
  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt!: Date;

  // Se eu quisesse, poderia adicionar @UpdateDateColumn também.

  constructor(data: Partial<BaseEntity> = {}) {
    Object.assign(this, data);
  }
}