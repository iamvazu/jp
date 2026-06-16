export interface ProductFamily {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  standardMil: string;
  standardJss: string;
  image: string;
  tagline: string;
  features: string[];
  applications: string[];
  colors: string[];
}

export interface WireSpec {
  awg: string;
  strands: string;
  condDia: number; // in mm
  area: number; // in mm²
  eeDiaMax: number; // in mm
  resistance: number; // Ω/1000m
  current: number; // Amps
  voltageType: 'ET' | 'E' | 'EE';
}

export interface SleevingSpec {
  nominalBore: number; // in mm
  boreTolerance: string; // e.g. "±0.10"
  nominalWall: number; // in mm
  wallTolerance: string; // e.g. "±0.05"
  breakdownVoltage: number; // in kV
}

export interface CableSpec {
  rgDesignation: string;
  impedance: string; // e.g. "50 Ω", "75 Ω"
  dielectric: string; // e.g. "PTFE"
  shield: string; // e.g. "Single SPC Braid"
  jacket: string; // e.g. "FEP"
}

export interface TapeSpec {
  name: string;
  type: string;
  width: string;
  thickness: string;
  length: string;
  application: string;
}

export interface RfqBasketItem {
  id: string;
  productName: string;
  specs: {
    awgOrBore?: string;
    voltageClass?: string;
    color?: string;
    quantity?: string;
    length?: string;
  };
}

export interface RfqFormValues {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  location: string;
  message?: string;
}
