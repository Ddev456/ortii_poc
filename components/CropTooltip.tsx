import React from 'react';
import { Plant } from '@/app/wiki/plants';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"  
import { Sprout, Shovel, ShoppingBasket } from 'lucide-react';

interface CropTooltipProps {
  cropPeriod: Plant['cropPeriod'] | null;
  plantName: string;
}

export const CropTooltip: React.FC<CropTooltipProps> = ({ cropPeriod, plantName }) => {
  if(!cropPeriod) return null;
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];

  const getColorAndIcon = (month: number, cropPeriod: Plant['cropPeriod']) => {
    for (const period of cropPeriod) {
      if (month >= period.start && month <= period.end) {
        switch (period.cropType) {
          case 'Seeding':
            return { color: 'bg-lime-500', icon: <Sprout className="h-4 w-4 md:h-8 md:w-8 stroke-white" /> };
          case 'Plantation':
            return { color: 'bg-indigo-500', icon: <Shovel className="h-4 w-4 md:h-8 md:w-8 stroke-white" /> };
          case 'Harvest':
            return { color: 'bg-orange-500', icon: <ShoppingBasket className="h-4 w-4 md:h-8 md:w-8 stroke-white" /> };
        }
      }
    }
    return { color: 'bg-slate-300', icon: null };
  };

  const getTooltipContent = (month: number) => {
    for (const period of cropPeriod) {
      if (month >= period.start && month <= period.end) {
        const startMonth = months[period.start - 1];
        const endMonth = months[period.end - 1];
        let action;
        switch (period.cropType) {
          case 'Seeding':
            action = 'Semis';
            break;
          case 'Plantation':
            action = 'Plantation';
            break;
          case 'Harvest':
            action = 'Récolte';
            break;
          default:
            action = period.cropType;
        }
        return `${action} de ${plantName} : de ${startMonth} à ${endMonth}`;
      }
    }
    return 'Pas d\'activité ce mois-ci';
  };

  return (
    <div className="flex gap-1 items-center">
      {months.map((month, index) => {
        const { color, icon } = getColorAndIcon(index + 1, cropPeriod);
        return (
          <TooltipProvider delayDuration={100} key={month + index}>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex flex-col items-center">
                  <div className={`dot ${color} w-6 h-6 md:w-10 md:h-10 rounded-[.4rem] flex items-center justify-center`}>
                    {icon}
                  </div>
                  <span className="h-4 text-xs">{index % 3 === 0 ? month : ''}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs text-slate-500 font-bold text-center">{getTooltipContent(index + 1)}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
};