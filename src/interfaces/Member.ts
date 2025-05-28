export enum MemberRole{
    Familiar = 'familiar',
    Invitado = 'invitado',
}
export interface Member {
    id: number;
    nombre: string;
    edad: number;
    rol: MemberRole;
    parentesco?: string;
    descripcion: string;
    foto: string;
}