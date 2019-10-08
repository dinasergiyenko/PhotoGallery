import { Album } from './album.model';
import { Photo } from '../../photos/shared/photo.model';
import { User } from '../../users/shared/user.model';

export class AlbumPage {
    album: Album;
    user: User;
    photos: Photo[];
}
