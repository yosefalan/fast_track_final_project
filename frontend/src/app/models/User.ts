import Company from "./Company";
import Profile from "./Profile";
import Team from "./Team";

export default interface User {
    id: number;
    profile: Profile;
    admin: boolean;
    active: boolean;
    status: string;
    companies: Company[];
    teams: Team[];
}