export enum MemberRole{
    Familiar = 'Familiar',
    Invitado = 'Invitado',
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