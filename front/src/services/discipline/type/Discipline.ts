
export interface IDiscipline {
  id?: string;
  name?: string;
  description?: string;
}

export interface IDisciplineErrors {
  id?: boolean;
  name?: boolean;
  description?: boolean;

  idMessage?: string[];
  nameMessage?: string[];
  descriptionMessage?: string[];
}