
'use client';

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  const lastFetchedSymbolsRef = useRef<string | null>(null);

  useEffect(() => {
    if (portfolio.length === 0) {
      setLoadingPrices(false);
      lastFetchedSymbolsRef.current = null;
      return;
    }

    const symbolsKey = portfolio
      .map((item) => `${item.id}|${item.symbol}|${item.purchasePrice}|${item.shares}|${item.purchaseDate}`)
      .join(';');
    const needsFetch =
      portfolio.some((item) => item.currentPrice === undefined) ||
      symbolsKey !== lastFetchedSymbolsRef.current;

    if (!needsFetch) {
      setLoadingPrices(false);
      return;
    }

    let isCancelled = false;

    const fetchPrices = async () => {
      setLoadingPrices(true);
      try {
        const pricePromises = portfolio.map((item) =>
          axios.get(`/api/stock-price?symbol=${item.symbol}`)
        );
        const priceResults = await Promise.allSettled(pricePromises);

        if (isCancelled || priceResults.length !== portfolio.length) {
          return;
        }

        const updatedPortfolio = portfolio.map((item, index) => {
          const result = priceResults[index];

          if (
            result.status === 'fulfilled' &&
            typeof result.value.data?.price === 'number' &&
            Number.isFinite(result.value.data.price)
          ) {
            return { ...item, currentPrice: result.value.data.price };
          }

          return { ...item, currentPrice: item.purchasePrice };
        });

        const hasChanged = updatedPortfolio.some((item, idx) => {
          const prev = portfolio[idx];

          return (
            item.currentPrice !== prev.currentPrice &&
            !(Number.isNaN(item.currentPrice) && Number.isNaN(prev.currentPrice))
          );
        });

        if (!isCancelled && hasChanged) {
          setPortfolio(updatedPortfolio);
        }

        lastFetchedSymbolsRef.current = symbolsKey;
      } catch (error) {
        console.error('Error fetching stock prices:', error);

        if (!isCancelled) {
          const portfolioWithFallbackPrices = portfolio.map((item) => ({
            ...item,
            currentPrice: item.purchasePrice,
          }));

          const hasFallbackChanges = portfolioWithFallbackPrices.some((item, idx) => {
            const prev = portfolio[idx];

            return (
              item.currentPrice !== prev.currentPrice &&
              !(Number.isNaN(item.currentPrice) && Number.isNaN(prev.currentPrice))
            );
          });

          if (hasFallbackChanges) {
            setPortfolio(portfolioWithFallbackPrices);
          }

          lastFetchedSymbolsRef.current = symbolsKey;
        }
      } finally {
        if (!isCancelled) {
          setLoadingPrices(false);
        }
      }
    };

    fetchPrices();

    return () => {
      isCancelled = true;
    };
  }, [portfolio, setPortfolio]);

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
          const hasCurrentPrice = item.currentPrice !== undefined;
          const totalValue = (item.currentPrice || 0) * item.shares;
          const totalCost = item.purchasePrice * item.shares;
          const gainLoss = hasCurrentPrice ? totalValue - totalCost : 0;
          const gainLossPercent = totalCost > 0 && hasCurrentPrice ? (gainLoss / totalCost) * 100 : 0;
          
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
                {loadingPrices ? (
                  <Loader2 className="h-4 w-4 animate-spin ml-auto" />
                ) : (
                  `$${totalValue.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`
                )}
              </TableCell>
              <TableCell className="text-right">
                 {loadingPrices ? (
                  <Loader2 className="h-4 w-4 animate-spin ml-auto" />
                ) : (
                  <div
                    className={cn(
                      'flex items-center justify-end gap-2',
                      gainLoss >= 0 ? 'text-green-600' : 'text-red-600'
                    )}
                  >
                    {gainLoss >= 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <div className="flex flex-col items-end">
                      <span className="font-semibold">{gainLossPercent.toFixed(2)}%</span>
                      <span className="text-xs">
                        {gainLoss.toLocaleString('en-US', {
                          signDisplay: 'always',
                          minimumFractionDigits: 2,
                        })}
                      </span>
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
