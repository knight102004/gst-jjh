import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Receipt, ArrowLeft, Sparkles } from 'lucide-react';
import { CalculationOption } from '../App';

interface OptionsListProps {
  options: CalculationOption[];
  targetAmount: number;
  onSelectOption: (option: CalculationOption) => void;
  onReset: () => void;
}

export function OptionsList({ options, targetAmount, onSelectOption, onReset }: OptionsListProps) {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Card */}
      <Card className="shadow-2xl border-2 border-emerald-300 dark:border-emerald-700 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-gray-900 dark:via-emerald-950 dark:to-teal-950">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-emerald-900 dark:text-emerald-100 flex items-center gap-2">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                </div>
                Best Matches Found
              </CardTitle>
              <CardDescription className="mt-2">
                Target: ₹{targetAmount.toFixed(2)} • {options.length} optimal options
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onReset}
              className="border-emerald-300 dark:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              New
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Scrollable Options List */}
      <ScrollArea className="h-[500px] rounded-md">
        <div className="space-y-3 pr-4">
          {options.map((option, index) => (
            <Card
              key={index}
              className="shadow-lg border-2 border-amber-200 dark:border-amber-800 hover:border-amber-400 dark:hover:border-amber-600 transition-all duration-300 transform hover:scale-[1.02] bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {/* Rank Badge */}
                  <div className="flex items-center justify-between">
                    <Badge 
                      className={`
                        ${index === 0 ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white' : ''}
                        ${index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800' : ''}
                        ${index === 2 ? 'bg-gradient-to-r from-orange-400 to-amber-600 text-white' : ''}
                        ${index > 2 ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white' : ''}
                      `}
                    >
                      {index === 0 && '🥇 '}
                      {index === 1 && '🥈 '}
                      {index === 2 && '🥉 '}
                      Option #{index + 1}
                    </Badge>
                    {option.accuracy < 0.001 && (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Perfect Match
                      </Badge>
                    )}
                  </div>

                  {/* Weight and Rate Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-950 dark:to-yellow-950 rounded-lg p-3">
                      <p className="text-xs text-amber-700 dark:text-amber-300 mb-1">Weight</p>
                      <p className="text-amber-900 dark:text-amber-100">{option.weight} gm</p>
                    </div>
                    <div className="bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-950 dark:to-yellow-950 rounded-lg p-3">
                      <p className="text-xs text-amber-700 dark:text-amber-300 mb-1">Rate</p>
                      <p className="text-amber-900 dark:text-amber-100">₹{option.rate}/gm</p>
                    </div>
                  </div>

                  {/* Calculation Preview */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg p-3 text-sm space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Raw Product:</span>
                      <span className="font-mono text-xs">{option.weight} × ₹{option.rate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span></span>
                      <span className="font-mono">₹{(option.weight * option.rate).toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">+ 3% GST check:</span>
                      <span className="font-mono">₹{((option.weight * option.rate) * 1.03).toFixed(2)}</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent my-1"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Adjusted Value:</span>
                      <span className="font-mono">₹{option.value}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">CGST:</span>
                      <span className="font-mono">₹{option.cgst}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">SGST:</span>
                      <span className="font-mono">₹{option.sgst}</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent my-1"></div>
                    <div className="flex justify-between items-center">
                      <span className="">Final Total:</span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-mono">
                        ₹{option.finalTotal}
                      </span>
                    </div>
                  </div>

                  {/* Receipt Button */}
                  <Button
                    onClick={() => onSelectOption(option)}
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg transition-all duration-300"
                  >
                    <Receipt className="w-4 h-4 mr-2" />
                    Generate Receipt
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
