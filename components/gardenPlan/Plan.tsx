'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

// Define a type for plants
type Plant = {
  name: string;
  image: string;
};

const plants: Record<string, Plant> = {
  TO: { name: 'Tomate', image: '/tomate.jpg' },
  CA: { name: 'Carotte', image: '/carotte.jpg' },
  SA: { name: 'Laitue', image: '/laitue.jpg' },
  PO: { name: 'Poivron', image: '/poivron.jpg' },
  AU: { name: 'Aubergine', image: '/aubergine.jpg' },
  // Ajoutez d'autres plantes selon vos besoins
};

export const GardenPlan = () => {
  const [grid, setGrid] = useState(Array(5).fill().map(() => Array(5).fill('')));
  const [selectedPlant, setSelectedPlant] = useState('');

  console.log(grid);
  

  const handleCellClick = (row, col) => {
    if (selectedPlant) {
      const newGrid = [...grid];
      newGrid[row][col] = selectedPlant;
      setGrid(newGrid);
    }
  };

  return (
    <div className="p-4">
      <h3 className="mb-4">Planificateur de Potager</h3>
      <div className="mb-4">
        {Object.entries(plants).map(([code, name]) => (
          <Button
            key={code}
            onClick={() => setSelectedPlant(code)}
            variant={selectedPlant === code ? 'ghost' : 'outline'}
            className="mr-2 mb-2"
          >
            {name.name}
            <Image src={name.image} alt={name.name} width={20} height={15} />
          </Button>
        ))}
      </div>
      <div className='grid grid-cols-5 gap-4'>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex}>
            <div className="flex">
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  className="w-12 h-12 border border-gray-300 flex items-center justify-center cursor-pointer"
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {cell}
                  {cell && (
                    <Image 
                      src={plants[cell].image} // Récupère l'image de la plante
                      alt={plants[cell].name} // Utilise le nom de la plante pour l'attribut alt
                      width={20} 
                      height={15} 
                    /> 
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};