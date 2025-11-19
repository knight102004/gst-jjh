import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Calculator as CalcIcon, TrendingUp, Loader2 } from 'lucide-react';

interface CalculatorProps {
  amount: string;
  setAmount: (value: string) => void;
  minRange: string;
  setMinRange: (value: string) => void;
  maxRange: string;
  setMaxRange: (value: string) => void;
  onCalculate: () => void;
  isCalculating: boolean;
}

export function Calculator({
  amount,
  setAmount,
  minRange,
  setMinRange,
  maxRange,
  setMaxRange,
  onCalculate,
  isCalculating
}: CalculatorProps) {
  const handleCalculate = () => {
    if (amount && minRange && maxRange) {
      onCalculate();
    }
  };

  return (
    <Card className="shadow-2xl border-2 border-amber-300 dark:border-amber-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm hover:shadow-amber-200/50 dark:hover:shadow-amber-900/50 transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-amber-100 via-yellow-100 to-orange-100 dark:from-amber-950 dark:via-yellow-950 dark:to-orange-950">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/20 rounded-lg">
            <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <CardTitle className="text-amber-900 dark:text-amber-100">Enter Details</CardTitle>
        </div>
        <CardDescription className="mt-2">Input the target amount and gold rate range</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 pt-6">
        {/* Target Amount */}
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-amber-900 dark:text-amber-100">
            Target Amount (₹)
          </Label>
          <Input
            id="amount"
            type="number"
            placeholder="e.g., 10000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-gray-800 dark:to-gray-900 border-amber-300 dark:border-amber-700 focus:border-amber-500 h-12"
          />
        </div>

        {/* Gold Rate Range */}
        <div className="space-y-3">
          <Label className="text-amber-900 dark:text-amber-100">
            Gold Rate Range (₹ per gram)
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="minRange" className="text-sm text-amber-700 dark:text-amber-300">
                Minimum Rate
              </Label>
              <Input
                id="minRange"
                type="number"
                placeholder="e.g., 9400"
                value={minRange}
                onChange={(e) => setMinRange(e.target.value)}
                className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-gray-800 dark:to-gray-900 border-amber-300 dark:border-amber-700 focus:border-amber-500 h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxRange" className="text-sm text-amber-700 dark:text-amber-300">
                Maximum Rate
              </Label>
              <Input
                id="maxRange"
                type="number"
                placeholder="e.g., 9600"
                value={maxRange}
                onChange={(e) => setMaxRange(e.target.value)}
                className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-gray-800 dark:to-gray-900 border-amber-300 dark:border-amber-700 focus:border-amber-500 h-12"
              />
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <Button 
          onClick={handleCalculate}
          className="w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 hover:from-amber-600 hover:via-yellow-600 hover:to-orange-600 text-white shadow-xl h-12 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          disabled={!amount || !minRange || !maxRange || isCalculating}
        >
          {isCalculating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Calculating...
            </>
          ) : (
            <>
              <CalcIcon className="w-5 h-5 mr-2" />
              Calculate GST Options
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
