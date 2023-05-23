import BasicUser from "./BasicUser";

export default interface Team {
    id: number;
    name: string;
    description: string;
    teammates: BasicUser[]; 
}