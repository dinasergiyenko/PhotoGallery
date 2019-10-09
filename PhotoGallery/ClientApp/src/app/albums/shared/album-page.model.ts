import { Album } from '@app/albums/shared/album.model';
import { Photo } from '@app/photos/shared/photo.model';
import { User } from '@app/users/shared/user.model';

export class AlbumPage {
    album: Album;
    user: User;
    photos: Photo[];
}
