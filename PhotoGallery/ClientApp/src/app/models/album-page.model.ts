import { Album } from './album.model';
import { Photo } from './photo.model';
import { User } from './user.model';

export class AlbumPage {
    album: Album;
    user: User;
    photos: Photo[];
}
