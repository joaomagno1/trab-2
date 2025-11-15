import { ModuleEntity } from 'src/modules/entity/module.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('BD2_SUBMODULES')
export class SubmoduleEntity {
  @PrimaryGeneratedColumn('increment', { name: 'SUBMODULE_ID', type: 'number' })
  submoduleId: number;

  @Column({ name: 'TITLE', type: 'varchar2', length: 100 })
  title: string;

  //    Tive que usar 'clob' (Character Large Object) aqui
  // porque o 'varchar2' do Oracle tem limite de 4000 bytes.
  // O 'clob' é pra texto longo, tipo o conteúdo da aula.
  @Column({ name: 'EXPLANATION', type: 'clob' })
  explanation: string;

  //    Define a relação Muitos-para-Um.
  // Vários submódulos (@ManyToOne) pertencem a um Módulo.
  @ManyToOne(() => ModuleEntity, (module) => module.submodules)
  @JoinColumn({ name: 'MODULE_ID' }) // Define qual é a coluna da chave estrangeira
  module: ModuleEntity;

  constructor(data: Partial<SubmoduleEntity> = {}) {
    Object.assign(this, data);
  }
}