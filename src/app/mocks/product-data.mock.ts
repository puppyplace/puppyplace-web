import { Product } from "../models/product.interface";

export const PRODUCT_DATA: Product = {
    title: 'Ração Golden Fórmula Cães Mini Bits Adultos Pequeno Porte Salmão e Arroz',
    description: 'A Ração Golden Fórmula Mini Bits Cães Adultos Pequeno Porte Frango e Arroz agora é oferecida em uma nova composição e em uma nova embalagem com sistema de fechamento facilitado e que mantem a qualidade da ração. Sendo um alimento Premium Especial promove a manutenção da saúde repondo os vitaminas conforme a necessidade do animal, e por ser tão completa, alimenta sem precisar de suplementação extra! Rica em fibras naturais, a Golden Fórmula Mini Bits oferece alta digestibilidade e protege a saúde gastrointestinal do seu felino. Aprovada até pelos pets mais exigentes o alimento possui sabor e aroma com alta palatabilidade, que tornam as refeições deliciosas. Também beneficia a saúde oral, evitando a formação de tártaros, e também reduz o odor das fezes, graças à seleção de ingredientes completos e nutritivos. Sendo a ração completa para o seu cãozinho.',
    avatar_url: 'assets/images/products/racao.png',
    categories: [
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
            amount: 10,
            percent_promotional: 10,
            price_promotional: 90,
            isbn_code: '123456789'
        },
        {
            unit: '15 kg',
            price: 150,
            amount: 15,
            percent_promotional: 15,
            price_promotional: 127.5,
            isbn_code: '123456789'
        },
        {
            unit: '20 kg',
            price: 200,
            amount: 20,
            percent_promotional: 20,
            price_promotional: 160,
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
