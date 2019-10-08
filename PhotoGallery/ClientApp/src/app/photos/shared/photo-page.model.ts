import { Photo } from './photo.model';
import { Album } from '../../albums/shared/album.model';
import { User } from '../../users/shared/user.model';

export class PhotoPage {
    photo: Photo;
    album: Album;
    user: User;
}
