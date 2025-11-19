import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { CheckCircle2 } from 'lucide-react';

interface ResultsDisplayProps {
  results: {
    weight: string;
    rate: string;
    monthly: string;
    rawDifference: string;
    halfDifference: string;
    cgst: string;
    sgst: string;
    value: string;
    total: string;
  };
  targetAmount: string;
}

export function ResultsDisplay({ results, targetAmount }: ResultsDisplayProps) {
  return (
    <Card className="mt-6 shadow-xl border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-green-800 dark:text-green-300">Calculation Results</CardTitle>
          <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Weight and Rate */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <p className="text-sm text-muted-foreground mb-1">Weight</p>
            <p className="text-amber-600 dark:text-amber-400">{results.weight} carats</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <p className="text-sm text-muted-foreground mb-1">Rate</p>
            <p className="text-amber-600 dark:text-amber-400">₹{results.rate}</p>
          </div>
        </div>

        <Separator />

        {/* Calculation Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Monthly Amount</span>
            <span className="text-gray-600 dark:text-gray-300">{results.weight} × ₹{results.rate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span></span>
            <span className="">₹{results.monthly}</span>
          </div>

          <Separator className="my-2" />

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Difference</span>
            <span className="">₹{targetAmount} - ₹{parseFloat(results.monthly).toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span></span>
            <span className="">₹{results.rawDifference}</span>
          </div>

          <Separator className="my-2" />

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Half Difference</span>
            <span className="">₹{results.rawDifference} ÷ 2</span>
          </div>
          <div className="flex justify-between items-center">
            <span></span>
            <span className="">₹{results.halfDifference}</span>
          </div>
        </div>

        <Separator />

        {/* GST Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-200">
                CGST
              </Badge>
            </div>
            <span className="">₹{results.cgst}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-200">
                SGST
              </Badge>
            </div>
            <span className="">₹{results.sgst}</span>
          </div>
        </div>

        <Separator />

        {/* Final Value */}
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-lg p-4 shadow-md">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Value</span>
              <span className="">₹{results.value}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">+ CGST</span>
              <span className="">₹{results.cgst}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">+ SGST</span>
              <span className="">₹{results.sgst}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between items-center pt-2">
              <span className="">Total Amount</span>
              <span className="text-green-700 dark:text-green-400">₹{results.total}</span>
            </div>
          </div>
        </div>

        {/* Verification */}
        {parseFloat(results.total) === parseFloat(targetAmount) && (
          <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950 p-3 rounded-lg">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm">Total matches target amount perfectly!</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
