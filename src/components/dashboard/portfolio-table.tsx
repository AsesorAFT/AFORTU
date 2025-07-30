
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, TrendingDown, TrendingUp } from "lucide-react";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface PortfolioItem {
  id: string;
  name: string;
  symbol: string;
  shares: number;
  purchasePrice: number;
  purchaseDate: string;
  currentPrice?: number;
}

interface PortfolioTableProps {
  portfolio: PortfolioItem[];
  setPortfolio: React.Dispatch<React.SetStateAction<PortfolioItem[]>>;
}

export function PortfolioTable({ portfolio, setPortfolio }: PortfolioTableProps) {
  const [loadingPrices, setLoadingPrices] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      setLoadingPrices(true);
      try {
        const pricePromises = portfolio.map(item =>
          axios.get(`/api/stock-price?symbol=${item.symbol}`)
        );
        const priceResults = await Promise.all(pricePromises);

        setPortfolio(prevPortfolio => {
            return prevPortfolio.map((item, index) => {
                const priceData = priceResults[index].data;
                return {
                    ...item,
                    currentPrice: priceData?.price || item.purchasePrice,
                };
            });
        });

      } catch (error) {
        console.error("Error fetching stock prices:", error);
      } finally {
        setLoadingPrices(false);
      }
    };

    if (portfolio.length > 0) {
      fetchPrices();
    } else {
        setLoadingPrices(false);
    }
  }, []); // Run only on initial mount. Portfolio state is managed in the parent.

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Activo</TableHead>
          <TableHead>Fecha de Compra</TableHead>
          <TableHead className="text-right">Valor Actual</TableHead>
          <TableHead className="text-right">Ganancia/Pérdida</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {portfolio.map((item) => {
          const totalValue = (item.currentPrice || 0) * item.shares;
          const totalCost = item.purchasePrice * item.shares;
          const gainLoss = totalValue - totalCost;
          const gainLossPercent = totalCost > 0 ? (gainLoss / totalCost) * 100 : 0;
          
          return (
            <TableRow key={item.id}>
              <TableCell>
                <div className="font-medium">{item.name} ({item.symbol})</div>
                <div className="text-sm text-muted-foreground">
                    {item.shares} títulos a ${item.purchasePrice.toFixed(2)} c/u
                </div>
              </TableCell>
              <TableCell>
                  {format(new Date(item.purchaseDate), 'dd MMM, yyyy', { locale: es })}
              </TableCell>
              <TableCell className="text-right">
                {loadingPrices ? <Loader2 className="h-4 w-4 animate-spin ml-auto" /> : `$${totalValue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
              </TableCell>
              <TableCell className="text-right">
                 {loadingPrices ? <Loader2 className="h-4 w-4 animate-spin ml-auto" /> : (
                     <div className={cn("flex items-center justify-end gap-2", gainLoss >= 0 ? 'text-green-600' : 'text-red-600')}>
                        {gainLoss >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        <div className="flex flex-col items-end">
                            <span className="font-semibold">{gainLossPercent.toFixed(2)}%</span>
                            <span className="text-xs">{gainLoss.toLocaleString('en-US', { signDisplay: 'always', minimumFractionDigits: 2 })}</span>
                        </div>
                    </div>
                 )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
