export interface Member {
    /** En GET vendrá desde el back */
    id?: string;

    /** Campos que el POST espera */
    nombre: string;
    edad: number;
    parentesco?: string;    // opcional si es invitado
    descripcion: string;
    fotoPerfil: string;
    userNickname?: string;  // opcional, lo es asignado estático
}