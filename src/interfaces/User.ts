export class User {
    public name: string;
    public apellido: string;
    public email: string;
    public password: string;
    public confirm: string;
    public phone: string;
    public address: string;
    public birthDate: string;
    public gender: string;
    public occupation: string;
    public profilePhotoUrl: string;
    public terms: boolean;
    public newsletter: boolean;

    constructor(
        name = '',
        apellido = '',
        email = '',
        password = '',
        confirm = '',
        phone = '',
        address = '',
        birthDate = '',
        gender = '',
        occupation = '',
        profilePhotoUrl = '',
        terms = false,
        newsletter = false
    ) {
        this.name = name;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.confirm = confirm;
        this.phone = phone;
        this.address = address;
        this.birthDate = birthDate;
        this.gender = gender;
        this.occupation = occupation;
        this.profilePhotoUrl = profilePhotoUrl;
        this.terms = terms;
        this.newsletter = newsletter;
    }

    isValidBasic(): boolean {
        return (
            this.name.trim() !== '' &&
            this.apellido.trim() !== '' &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email) &&
            this.password.length >= 6 &&
            this.password === this.confirm &&
            this.terms === true
        );
    }

    isValidAdvanced(): boolean {
        return [
            this.phone,
            this.address,
            this.birthDate,
            this.gender,
            this.occupation,
            this.profilePhotoUrl
        ].every(s => typeof s === 'string' && s.trim() !== '');
    }
}
