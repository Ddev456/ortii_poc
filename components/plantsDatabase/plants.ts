export type Plant = {
    id: number;
    name: string;
    description: string;
    image: string;
    tags: string[];
    level: number;
    hardiness: hardiness;
    exposition: exposition;
    space: number;
    rank: number;
    growingTime: number;
    growingTemperature: number;
    timeToHarvest: number;
    efficiency: number;
    nutritionalValue: number;
    density: number;
    seedingDeep: number;
    seedStorage: number;
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

enum subType {
  root = "Légume-Racine",
  fruit = "Légume-Fruit",
  leaf = "Légume-Feuille",
  grain = "Légume-Grain",
}

enum exposition {
  sun = "Ensoleillé",
  shady = "Mi-ombre",
}

enum hardiness {
  hard = "rustique",
  medium = "bisannuelle",
  soft = "annuelle"
}

export const plants = [
    {
        id: 1,
        name: "Carotte",
        category: category.vegetable,
        subType: subType.root,
        description: "Une carotte est une plante herbacée qui a une tige de fleur et une tige de racine. Elle est très commune dans les jardins et les champs, et est souvent utilisée comme plante de décoration.",
        image: "/carotte.jpg",
        tags: ["Légume-racine 1", "Potager"],
        level: 2,
        hardiness: hardiness.hard,
        exposition: exposition.sun,
        space: 5,
        rank: 10,
        growingTime: 7,
        growingTemperature: 18,
        timeToHarvest: 180,
        efficiency: 8000,
        nutritionalValue: 5,
        density: 1,
        seedingDeep: 0.5,
        seedStorage: 5,
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
        subType: subType.fruit,
        description: "La tomate fait partie des solanacées, c'est un peu la reine du potager.",
        image: "/tomate.jpg",
        tags: ["Légume-fruit", "Potager"],
        level: 1,
        hardiness: hardiness.soft,
        exposition: exposition.sun,
        space: 70,
        rank: 60,
        growingTime: 7,
        growingTemperature: 18,
        timeToHarvest: 140,
        efficiency: 12000,
        nutritionalValue: 5,
        density: 1,
        seedingDeep: 0.5,
        seedStorage: 5,
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
        subType: null,
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
        hardiness: hardiness.soft,
        exposition: exposition.sun,
        space: 70,
        rank: 60,
        growingTime: 7,
        growingTemperature: 18,
        timeToHarvest: 170,
        efficiency: 8000,
        nutritionalValue: 5,
        density: 1,
        seedingDeep: 0.5,
        seedStorage: 5,
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