import { DisciplineEntity } from 'src/discipline/entity/discipline.entity';
import { SubmoduleEntity } from 'src/submodule/entity/submodule.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('BD2_MODULES')
export class ModuleEntity {
  @PrimaryGeneratedColumn('increment', { name: 'MODULE_ID', type: 'number' })
  moduleId: number;

  @Column({ name: 'TITLE', type: 'varchar2', length: 100 })
  title: string;

  // Usei 'clob' aqui também, vai que a descrição é longa.
  @Column({ name: 'DESCRIPTION', type: 'clob' })
  description: string;

  // Relação: Vários Módulos (@ManyToOne) pertencem a UMA Disciplina.
  @ManyToOne(() => DisciplineEntity, (discipline) => discipline.modules)
  @JoinColumn({ name: 'DISCIPLINE_ID' })
  discipline: DisciplineEntity;

  // Relação: Um Módulo (@OneToMany) pode ter Vários Submódulos.
  @OneToMany(() => SubmoduleEntity, (submodule) => submodule.module)
  submodules: SubmoduleEntity[];

  constructor(data: Partial<ModuleEntity> = {}) {
    Object.assign(this, data);
  }
}