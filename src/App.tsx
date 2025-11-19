import { useState } from 'react';
import { Calculator } from './components/Calculator';
import { OptionsList } from './components/OptionsList';
import { ReceiptDisplay } from './components/ReceiptDisplay';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import { Gem, Sparkles } from 'lucide-react';

export interface CalculationOption {
  weight: number;
  rate: number;
  rawProduct: number;
  difference: number;
  halfDifference: number;
  cgst: number;
  sgst: number;
  totalGST: number;
  value: number;
  finalTotal: number;
  accuracy: number;
}

export default function App() {
  const [amount, setAmount] = useState<string>('');
  const [minRange, setMinRange] = useState<string>('');
  const [maxRange, setMaxRange] = useState<string>('');
  const [options, setOptions] = useState<CalculationOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<CalculationOption | null>(null);
  const [targetAmount, setTargetAmount] = useState<number>(0);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const calculateGST = () => {
    const target = parseFloat(amount);
    const minRate = parseFloat(minRange);
    const maxRate = parseFloat(maxRange);

    if (!target || !minRate || !maxRate || minRate >= maxRate) {
      return;
    }

    setIsCalculating(true);
    setTargetAmount(target);
    setSelectedOption(null);

    // Use setTimeout to allow UI to update with loading state
    setTimeout(() => {
      const allOptions: CalculationOption[] = [];
      
      // We need to find weight × rate where (weight × rate × 1.03) is very close to target
      // Ideally >= target - 1 (so for 25000, we want >= 24999)
      const minAcceptableRawWithGST = target - 1;
      
      // Optimized: Check rates in increments based on range size
      const rateRange = maxRate - minRate;
      let rateIncrement = 0.1;
      if (rateRange > 200) {
        rateIncrement = 0.5;
      } else if (rateRange > 50) {
        rateIncrement = 0.2;
      }
      
      for (let rate = minRate; rate <= maxRate; rate += rateIncrement) {
        const roundedRate = Math.round(rate * 10) / 10; // Round rate to 1 decimal
        
        // Calculate ideal weight where weight × rate × 1.03 = target
        const idealWeight = target / (roundedRate * 1.03);
        
        // Skip if ideal weight is unreasonable
        if (idealWeight < 0.05 || idealWeight > 10.0) continue;
        
        // Try weights around ideal weight with 0.001 gram precision
        const maxOffset = 0.02;
        const offsetStep = 0.001;
        
        for (let weightOffset = -maxOffset; weightOffset <= maxOffset; weightOffset += offsetStep) {
          const calculatedWeight = idealWeight + weightOffset;
          
          // Round weight to 3 decimal places FIRST to ensure consistency
          const weight = Math.round(calculatedWeight * 1000) / 1000;
          
          // Skip if weight is unreasonable
          if (weight < 0.05 || weight > 10.0) continue;
          
          // Calculate raw product: weight × rate
          const rawProduct = weight * roundedRate;
          
          // Check if raw product + 3% GST is close enough to target
          const rawProductWithGST = rawProduct * 1.03;
          
          // Only continue if raw product + 3% GST is very close to target (within 1 rupee and preferably above target-1)
          if (rawProductWithGST < minAcceptableRawWithGST || rawProductWithGST > target + 1) continue;
          
          // Step 1: Calculate total GST needed = amount - raw product
          const totalGSTNeeded = target - rawProduct;
          
          // Step 2: Divide GST by 2 and truncate to 2 decimal places
          const halfGST = totalGSTNeeded / 2;
          const cgst = Math.floor(halfGST * 100) / 100;
          const sgst = Math.floor(halfGST * 100) / 100;
          const totalGST = cgst + sgst;
          
          // Step 3: Adjust value to make value + CGST + SGST = target exactly
          // Crop rawProduct to 1 decimal place to get base value
          const baseValue = Math.floor(rawProduct * 10) / 10;
          
          // Try different last digits (0-9) for the second decimal place
          let bestValue = baseValue;
          let bestDiff = Infinity;
          
          for (let digit = 0; digit <= 9; digit++) {
            const testValue = baseValue + digit / 100;
            const testTotal = testValue + totalGST;
            const testDiff = Math.abs(target - testTotal);
            
            if (testDiff < bestDiff) {
              bestDiff = testDiff;
              bestValue = testValue;
            }
          }
          
          const finalTotal = bestValue + totalGST;
          const accuracy = Math.abs(target - finalTotal);
          
          // Only include if exact match or very close (within 0.01)
          if (accuracy <= 0.01) {
            const difference = target - rawProduct;
            const halfDifference = difference / 2;
            
            allOptions.push({
              weight: weight,
              rate: roundedRate,
              rawProduct: Math.round(rawProduct * 10000) / 10000,
              difference: Math.round(difference * 10000) / 10000,
              halfDifference: Math.round(halfDifference * 10000) / 10000,
              cgst: cgst,
              sgst: sgst,
              totalGST: totalGST,
              value: bestValue,
              finalTotal: Math.round(finalTotal * 100) / 100,
              accuracy
            });
          }
        }
      }
      
      // Sort by how close raw product + 3% GST is to target (prefer higher values)
      allOptions.sort((a, b) => {
        const aRawWithGST = a.rawProduct * 1.03;
        const bRawWithGST = b.rawProduct * 1.03;
        const aDiff = Math.abs(target - aRawWithGST);
        const bDiff = Math.abs(target - bRawWithGST);
        
        // If both are very close, prefer the one closer to target
        if (Math.abs(aDiff - bDiff) < 0.1) {
          return a.accuracy - b.accuracy;
        }
        
        // Otherwise prefer raw product + 3% GST closer to target
        return aDiff - bDiff;
      });
      
      // Take top 10 unique combinations
      const uniqueOptions: CalculationOption[] = [];
      const seen = new Set<string>();
      
      for (const option of allOptions) {
        const key = `${option.weight}-${option.rate}`;
        if (!seen.has(key) && uniqueOptions.length < 10) {
          seen.add(key);
          uniqueOptions.push(option);
        }
      }
      
      setOptions(uniqueOptions);
      setIsCalculating(false);
    }, 10);
  };

  const handleReset = () => {
    setOptions([]);
    setSelectedOption(null);
    setAmount('');
    setMinRange('');
    setMaxRange('');
    setTargetAmount(0);
    setIsCalculating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-amber-950 dark:to-gray-900">
      <PWAInstallPrompt />
      <div className="container max-w-md mx-auto px-4 py-6">
        {/* Header with Enhanced Design */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4 pt-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 rounded-full blur-2xl opacity-60 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-500 p-5 rounded-full shadow-2xl ring-4 ring-amber-200 dark:ring-amber-800">
                <Gem className="w-10 h-10 text-white drop-shadow-lg" />
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2 drop-shadow-sm">
              Jewelry GST Calculator
            </h1>
            <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-300">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <p className="text-sm tracking-wide">Premium Ornament Billing System</p>
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Calculator Component */}
        {options.length === 0 && !selectedOption && (
          <Calculator
            amount={amount}
            setAmount={setAmount}
            minRange={minRange}
            setMinRange={setMinRange}
            maxRange={maxRange}
            setMaxRange={setMaxRange}
            onCalculate={calculateGST}
            isCalculating={isCalculating}
          />
        )}

        {/* Options List */}
        {options.length > 0 && !selectedOption && (
          <OptionsList
            options={options}
            targetAmount={targetAmount}
            onSelectOption={setSelectedOption}
            onReset={handleReset}
          />
        )}

        {/* Receipt Display */}
        {selectedOption && (
          <ReceiptDisplay
            option={selectedOption}
            targetAmount={targetAmount}
            onBack={() => setSelectedOption(null)}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}
