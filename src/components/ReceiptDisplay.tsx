import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { ArrowLeft, Check, Receipt, Home } from 'lucide-react';
import { CalculationOption } from '../App';

interface ReceiptDisplayProps {
  option: CalculationOption;
  targetAmount: number;
  onBack: () => void;
  onReset: () => void;
}

export function ReceiptDisplay({ option, targetAmount, onBack, onReset }: ReceiptDisplayProps) {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={onBack}
          className="border-amber-300 dark:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950 transition-all"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        <Button
          variant="outline"
          onClick={onReset}
          className="border-amber-300 dark:border-amber-700 ml-auto hover:bg-amber-50 dark:hover:bg-amber-950 transition-all"
        >
          <Home className="w-4 h-4 mr-1" />
          New Calculation
        </Button>
      </div>

      {/* Receipt Card */}
      <Card className="shadow-2xl border-2 border-emerald-400 dark:border-emerald-600 bg-gradient-to-br from-white via-emerald-50/50 to-green-50 dark:from-gray-900 dark:via-emerald-950/50 dark:to-green-950">
        <CardHeader className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-lg">
              <Receipt className="w-6 h-6" />
            </div>
            <CardTitle>Official Receipt</CardTitle>
          </div>
          <p className="text-center text-sm text-emerald-100">
            Jewelry GST Calculation Breakdown
          </p>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* Target Amount Display */}
          <div className="text-center bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-950 dark:to-yellow-950 rounded-lg p-4 border-2 border-amber-300 dark:border-amber-700">
            <p className="text-sm text-amber-700 dark:text-amber-300 mb-1">Target Amount</p>
            <p className="text-amber-900 dark:text-amber-100">₹{targetAmount.toFixed(2)}</p>
          </div>

          <Separator />

          {/* Weight and Rate */}
          <div>
            <h3 className="text-emerald-900 dark:text-emerald-100 mb-3 flex items-center gap-2">
              <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                Step 1
              </Badge>
              Weight & Rate
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                <p className="text-xs text-muted-foreground mb-1">Weight</p>
                <p className="text-amber-600 dark:text-amber-400">{option.weight} grams</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                <p className="text-xs text-muted-foreground mb-1">Rate per Gram</p>
                <p className="text-amber-600 dark:text-amber-400">₹{option.rate}/gm</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Calculation Steps */}
          <div>
            <h3 className="text-emerald-900 dark:text-emerald-100 mb-3 flex items-center gap-2">
              <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                Step 2
              </Badge>
              Raw Product Calculation
            </h3>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Weight × Rate</span>
                <span className="text-sm font-mono">{option.weight} × ₹{option.rate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="">Raw Product</span>
                <span className="font-mono">₹{(option.weight * option.rate).toFixed(4)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Raw Product + 3% GST</span>
                <span className="font-mono">₹{((option.weight * option.rate) * 1.03).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* GST Calculation - Your Method */}
          <div>
            <h3 className="text-emerald-900 dark:text-emerald-100 mb-3 flex items-center gap-2">
              <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                Step 3
              </Badge>
              GST Calculation (Your Method)
            </h3>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg p-4 space-y-3">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-semibold">Step 1: Calculate Total GST Needed</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Amount - Raw Product</span>
                  <span className="font-mono">₹{targetAmount.toFixed(2)} - ₹{option.rawProduct}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="">Total GST Needed</span>
                  <span className="font-mono">₹{option.difference.toFixed(4)}</span>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-semibold">Step 2: Divide GST & Truncate to 2 Decimals</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Half GST (before truncate)</span>
                  <span className="font-mono">₹{(option.difference / 2).toFixed(4)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    CGST (truncated)
                  </Badge>
                  <span className="font-mono">₹{option.cgst}</span>
                </div>
                <div className="flex justify-between items-center">
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    SGST (truncated)
                  </Badge>
                  <span className="font-mono">₹{option.sgst}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-300 dark:border-gray-700">
                  <span className="">Total GST</span>
                  <span className="font-mono">₹{option.totalGST}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Final Value */}
          <div>
            <h3 className="text-emerald-900 dark:text-emerald-100 mb-3 flex items-center gap-2">
              <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                Step 4
              </Badge>
              Final Value
            </h3>
            <div className="bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-950 dark:to-green-950 rounded-lg p-4 border-2 border-emerald-300 dark:border-emerald-700 space-y-3">
              <p className="text-xs text-muted-foreground">
                Value adjusted to make total exact:
              </p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="">Value</span>
                  <span className="">₹{option.value}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">+ CGST</span>
                  <span>₹{option.cgst}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">+ SGST</span>
                  <span>₹{option.sgst}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center pt-2">
                  <span className="">Final Total</span>
                  <span className="text-emerald-700 dark:text-emerald-400">
                    ₹{option.finalTotal}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Badge */}
          {Math.abs(option.finalTotal - targetAmount) < 0.01 && (
            <div className="flex items-center justify-center gap-2 bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200 p-4 rounded-lg border-2 border-green-400 dark:border-green-600">
              <Check className="w-5 h-5" />
              <span className="">Exact Match Verified!</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
