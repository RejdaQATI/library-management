export class Book {
    id!: string;
    title!: string;
    author!: string;
    genre!: string;
    publicationDate!: string;
    status!: string; 
    summary!: string;
    platforms!: {
      amazon: string;
      library: string;
    };
    chapters!: number;
    quoteIds!: string[];
    commentIds!: string[];
  }
  