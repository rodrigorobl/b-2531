
import React from 'react';
import { SortAsc, SortDesc, Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export default function OpportunityFilterSortMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter size={16} className="mr-2" />
          Trier
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Trier par</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <SortDesc className="mr-2 h-4 w-4" />
            <span>Date (récent en premier)</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <SortAsc className="mr-2 h-4 w-4" />
            <span>Date (ancien en premier)</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <SortDesc className="mr-2 h-4 w-4" />
            <span>Budget (élevé en premier)</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <SortAsc className="mr-2 h-4 w-4" />
            <span>Budget (faible en premier)</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <SortAsc className="mr-2 h-4 w-4" />
            <span>Nom (A-Z)</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <SortDesc className="mr-2 h-4 w-4" />
            <span>Nom (Z-A)</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
