export interface EffetDTO {
    idEffet: number;
    reference: string;
    dateEmission: Date;
    dateEcheance: Date;
    montant: number;
    etat?: string;
    ibanTireur: string;
    ibanTire: string;
    tire: string;
    tireur: string;

}