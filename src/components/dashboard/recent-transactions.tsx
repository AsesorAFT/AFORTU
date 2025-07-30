
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Transaction = {
  description: string;
  type: string;
  amount: string;
  status: string;
  category: 'inversion' | 'servicio';
};

interface RecentTransactionsProps {
    transactions: Transaction[];
    title: string;
    description: string;
}


export function RecentTransactions({ transactions, title, description }: RecentTransactionsProps) {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Realizado':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descripción</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Monto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="font-medium">{transaction.description}</div>
                  <div className="text-sm text-muted-foreground">{transaction.type}</div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant='outline'
                    className={cn("font-semibold", getStatusBadgeVariant(transaction.status))}
                  >
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell className={`text-right font-medium ${transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{transaction.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
