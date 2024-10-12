export interface Favorite {
    UserEmail:string;
    id:number;
    title: string;
    author: string;
    description: string;
    imageUrl: string;
    genre: string;
    isFavorite?: boolean;
    bookType: 'Fiction' | 'Non-Fiction';
}