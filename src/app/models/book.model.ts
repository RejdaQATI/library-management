export class Book {
    id!: number;
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
    quoteIds!: number[]; 
    commentIds!: number[]; 
    }
