export type Plant = {
    id: number;
    name: string;
    description: string;
    image: string;
    tags: string[];
    level: number;
    cropPeriod: {
        cropType: string;
        start: number;
        end: number;
    }[];
}

enum category {
    vegetable = "Légume",
    fruit = "Fruit",
    flower = "Fleur",
    littleFruit = "Petit fruit",
}

export const plants = [
    {
        id: 1,
        name: "Carotte",
        category: category.vegetable,
        description: "Une carotte est une plante herbacée qui a une tige de fleur et une tige de racine. Elle est très commune dans les jardins et les champs, et est souvent utilisée comme plante de décoration.",
        image: "/carotte.jpg",
        tags: ["Légume-racine 1", "Potager"],
        level: 2,
        cropPeriod: [
            { 
              cropType: "Seeding",
              start: 2,
              end: 4
            },
            {
              cropType: "Harvest",
              start: 5,
              end: 7
            }
        ]
    },
    {
        id: 2,
        name: "Tomate",
        category: category.vegetable,
        description: "La tomate fait partie des solanacées, c'est un peu la reine du potager.",
        image: "/tomate.jpg",
        tags: ["Légume-fruit", "Potager"],
        level: 1,
        cropPeriod: [
            { 
              cropType: "Seeding",
              start: 3,
              end: 5
            },
            { 
              cropType: "Plantation",
              start: 6,
              end: 8
            },
            {
              cropType: "Harvest",
              start: 6,
              end: 9
            }
        ]
    },
    {
        id: 3,
        name: "Tournesol",
        category: category.flower,
        description: "La tournesol est une plante herbacée qui a une tige de fleur et une tige de racine. Elle est très commune dans les jardins et les champs, et est souvent utilisée comme plante de décoration.",
        image: "/tournesol.jpg",
        tags: ["Fleur"],
        level: 1,
        cropPeriod: [
            { 
              cropType: "Seeding",
              start: 3,
              end: 5
            },
            {
              cropType: "Harvest",
              start: 6,
              end: 9
            }
        ]
    },
    {
        id: 1,
        name: "Carotte",
        category: category.vegetable,
        description: "Une carotte est une plante herbacée qui a une tige de fleur et une tige de racine. Elle est très commune dans les jardins et les champs, et est souvent utilisée comme plante de décoration.",
        image: "/carotte.jpg",
        tags: ["Légume-racine 1", "Potager"],
        level: 2,
        cropPeriod: [
            { 
              cropType: "Seeding",
              start: 2,
              end: 4
            },
            {
              cropType: "Harvest",
              start: 5,
              end: 7
            }
        ]
    },
    {
        id: 2,
        name: "Tomate",
        category: category.vegetable,
        description: "La tomate fait partie des solanacées, c'est un peu la reine du potager.",
        image: "/tomate.jpg",
        tags: ["Légume-fruit", "Potager"],
        level: 1,
        cropPeriod: [
            { 
              cropType: "Seeding",
              start: 3,
              end: 5
            },
            { 
              cropType: "Plantation",
              start: 6,
              end: 8
            },
            {
              cropType: "Harvest",
              start: 6,
              end: 9
            }
        ]
    },
    {
        id: 3,
        name: "Tournesol",
        category: category.flower,
        description: "La tournesol est une plante herbacée qui a une tige de fleur et une tige de racine. Elle est très commune dans les jardins et les champs, et est souvent utilisée comme plante de décoration.",
        image: "/tournesol.jpg",
        tags: ["Fleur"],
        level: 1,
        cropPeriod: [
            { 
              cropType: "Seeding",
              start: 3,
              end: 5
            },
            {
              cropType: "Harvest",
              start: 6,
              end: 9
            }
        ]
    },
    {
        id: 1,
        name: "Carotte",
        category: category.vegetable,
        description: "Une carotte est une plante herbacée qui a une tige de fleur et une tige de racine. Elle est très commune dans les jardins et les champs, et est souvent utilisée comme plante de décoration.",
        image: "/carotte.jpg",
        tags: ["Légume-racine 1", "Potager"],
        level: 2,
        cropPeriod: [
            { 
              cropType: "Seeding",
              start: 2,
              end: 4
            },
            {
              cropType: "Harvest",
              start: 5,
              end: 7
            }
        ]
    },
    {
        id: 2,
        name: "Tomate",
        category: category.vegetable,
        description: "La tomate fait partie des solanacées, c'est un peu la reine du potager.",
        image: "/tomate.jpg",
        tags: ["Légume-fruit", "Potager"],
        level: 1,
        cropPeriod: [
            { 
              cropType: "Seeding",
              start: 3,
              end: 5
            },
            { 
              cropType: "Plantation",
              start: 6,
              end: 8
            },
            {
              cropType: "Harvest",
              start: 6,
              end: 9
            }
        ]
    },
    {
        id: 3,
        name: "Tournesol",
        category: category.flower,
        description: "La tournesol est une plante herbacée qui a une tige de fleur et une tige de racine. Elle est très commune dans les jardins et les champs, et est souvent utilisée comme plante de décoration.",
        image: "/tournesol.jpg",
        tags: ["Fleur"],
        level: 1,
        cropPeriod: [
            { 
              cropType: "Seeding",
              start: 3,
              end: 5
            },
            {
              cropType: "Harvest",
              start: 6,
              end: 9
            }
        ]
    },
    {
        id: 1,
        name: "Carotte",
        category: category.vegetable,
        description: "Une carotte est une plante herbacée qui a une tige de fleur et une tige de racine. Elle est très commune dans les jardins et les champs, et est souvent utilisée comme plante de décoration.",
        image: "/carotte.jpg",
        tags: ["Légume-racine 1", "Potager"],
        level: 2,
        cropPeriod: [
            { 
              cropType: "Seeding",
              start: 2,
              end: 4
            },
            {
              cropType: "Harvest",
              start: 5,
              end: 7
            }
        ]
    },
    {
        id: 2,
        name: "Tomate",
        category: category.vegetable,
        description: "La tomate fait partie des solanacées, c'est un peu la reine du potager.",
        image: "/tomate.jpg",
        tags: ["Légume-fruit", "Potager"],
        level: 1,
        cropPeriod: [
            { 
              cropType: "Seeding",
              start: 3,
              end: 5
            },
            { 
              cropType: "Plantation",
              start: 6,
              end: 8
            },
            {
              cropType: "Harvest",
              start: 6,
              end: 9
            }
        ]
    },
    {
        id: 3,
        name: "Tournesol",
        category: category.flower,
        description: "La tournesol est une plante herbacée qui a une tige de fleur et une tige de racine. Elle est très commune dans les jardins et les champs, et est souvent utilisée comme plante de décoration.",
        image: "/tournesol.jpg",
        tags: ["Fleur"],
        level: 1,
        cropPeriod: [
            { 
              cropType: "Seeding",
              start: 3,
              end: 5
            },
            {
              cropType: "Harvest",
              start: 6,
              end: 9
            }
        ]
    }
]