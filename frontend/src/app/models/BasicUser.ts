import Profile from './Profile';

export default interface BasicUser {
  id: number;
  profile: Profile;
  admin: boolean;
  active: boolean;
  status: string;
}
