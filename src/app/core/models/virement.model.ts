export interface Virement {
  id: number;                    
  guichet?: string;
  dateVirement?: string;         
  nomDonneur?: string;
  compteSource?: string;
  montant?: number;
  beneficiaireNom?: string;
  beneficiaireAdresse?: string;
  compteDestination?: string;
    instructions?: string;      
  modeVirement?: string;      
  status?: string;   
}
