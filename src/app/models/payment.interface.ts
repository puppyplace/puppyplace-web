export interface Payment {
  fatura: Paymentinvoice,
  pagador: PaymentPayer
}

export interface Paymentinvoice {
  forma_pagamento: number,
  parcelamento: number,
  sub_total: number,
  desconto: number,
  valor_total: number,
}

export interface PaymentPayer {
  nome: string,
  cpf_cnpj: string,
  endereco: PaymentAddress,
  email: string,
  telefone_principal: string,
  data_nascimento: string,
  sexo: PaymentUserSex
}

export interface PaymentAddress {
  logradouro: string,
  numero: string,
  complemento: string,
  bairro: string,
  cidade: string,
  uf: string,
  cep: string
}

export enum PaymentUserSex {
  MALE = 'M',
  FEMALE = 'F'
}
