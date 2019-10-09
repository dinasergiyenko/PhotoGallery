import { Photo } from '@app/photos/shared/photo.model';
import { Album } from '@app/albums/shared/album.model';
import { User } from '@app/users/shared/user.model';

export class PhotoPage {
    photo: Photo;
    album: Album;
    user: User;
}
