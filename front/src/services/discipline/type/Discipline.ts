export interface Discipline {
  id?: string;
  name?: string;
  description?: string;
}

export interface DisciplineErrors {
  id?: boolean;
  name?: boolean;
  description?: boolean;

  idMessage?: string[];
  nameMessage?: string[];
  descriptionMessage?: string[];
}
