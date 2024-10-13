export class Favorite {
    FavId?:string='';
    UserEmail?:string='';
    id?:number=0;
    title?: string='';
    author?: string='';
    description?: string='';
    imageUrl?: string='';
    genre?: string='';
    isFavorite?: boolean;
    bookType?: 'Fiction' | 'Non-Fiction'='Fiction';
}