export type Banner = {
  banner_name: string;
  banner_image: string;
  description: string;
}

export type Service = {
  service_code: string;
  service_name: string; 
  service_icon: string;
  service_tariff: number;
}

export type Profile = {
  email: string;
  first_name: string;
  last_name: string;
  profile_image : string;
}

export type History = {
  invoice_number: string,
  transaction_type: string,
  description: string,
  total_amount: number,
  created_on: string
}