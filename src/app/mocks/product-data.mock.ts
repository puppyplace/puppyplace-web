import { Product } from "../models/product.interface";

export const PRODUCT_DATA: Product = {
    title: 'Ração Golden Fórmula Cães Mini Bits Adultos Pequeno Porte Salmão e Arroz',
    description: 'A Ração Golden Fórmula Cães Mini Bits Adultos Pequeno Porte Salmão e Arroz é um alimento Premium Especial desenvolvido para cães adultos exigentes de pequeno porte.',
    image: 'assets/images/products/racao.png',
    quantity: 1,
    category: [
      'Cachorro',
      'Rações',
      'Ração Secas'
      ],
    especifications: [
        {
            title: 'Indicação',
            description: 'Cachorros'
        },
        {
            title: 'Raça',
            description: 'Raças Pequenas, Raças Médias, Raças Grandes'
        },
        {
            title: 'Idade',
            description: 'Filhotes'
        },
        {
            title: 'Sabor',
            description: 'Arroz, Frango'
        },
    ],
    variant: [
        {
            unit: '10 kg',
            price: 100,
            percent_promotional: 10,
            isbn_code: '123456789'
        },
        {
            unit: '15 kg',
            price: 150,
            percent_promotional: 15,
            isbn_code: '123456789'
        },
        {
            unit: '20 kg',
            price: 200,
            percent_promotional: 20,
            isbn_code: '123456789'
        }],
    details: [
        'Premium Especial',
        'Grão médio',
        'Sem corante',
        'Alta Palatabilidade',
        'Raças Pequenas, Médias e Grandes',
    ]
  }
