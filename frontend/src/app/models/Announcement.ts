import BasicUser from './BasicUser';

export default interface Announcement {
  id: number;
  date: Date;
  title: string;
  message: string;
  author: BasicUser;
}
