import { Album } from '@app/albums/shared/album.model';
import { User } from '@app/users/shared/user.model';

export class UserPage {
  user: User;
  albums: Album[];
}
