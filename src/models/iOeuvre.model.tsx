export interface IArtiste {
  nom: string;
  prenom: string;
  surnom?: string;
}

export interface IOeuvre {
  _id: string;

  titre: string;
  artiste: IArtiste;
  prix: number;
  dateCreation: string;
  tags?: string[];
  enVedette: boolean;
  imageUrl: string;
}
