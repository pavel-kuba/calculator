"use client";
import { useState } from "react";

export default function Home() {
  const [display, setDisplay] = useState("0");
  const [currentOperation, setCurrentOperation] = useState<string | null>(null);
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [newInput, setNewInput] = useState(true);

  const handleNumberClick = (num: string) => {
    if (newInput) {
      setDisplay(num);
      setNewInput(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperationClick = (operation: string) => {
    if (currentOperation && !newInput) {
      handleEquals();
    }
    setCurrentOperation(operation);
    setPreviousValue(parseFloat(display));
    setNewInput(true);
  };

  const handleEquals = () => {
    if (currentOperation && previousValue !== null) {
      const current = parseFloat(display);
      let result: number;
      switch (currentOperation) {
        case "+": result = previousValue + current; break;
        case "-": result = previousValue - current; break;
        case "×": result = previousValue * current; break;
        case "÷": 
          if (current === 0) {
            setDisplay("Error");
            setNewInput(true);
            return;
          }
          result = previousValue / current; 
          break;
        default: return;
      }
      setDisplay(result.toFixed(2).replace(/\.00$/, ''));
      setPreviousValue(result);
      setCurrentOperation(null);
      setNewInput(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setCurrentOperation(null);
    setPreviousValue(null);
    setNewInput(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <div className="w-80 bg-white p-6 rounded-2xl shadow-lg">
        <div className="bg-gray-100 p-4 mb-4 text-right text-3xl rounded-lg font-medium text-black">{display}</div>
        <div className="grid grid-cols-4 gap-2">
          {["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "-", "C", "0", "=", "+"].map((btn) => (
            <button
              key={btn}
              onClick={() => {
                if ("0123456789".includes(btn)) handleNumberClick(btn);
                else if (btn === "=") handleEquals();
                else if (btn === "C") handleClear();
                else handleOperationClick(btn);
              }}
              className={`text-xl font-medium py-3 px-4 rounded-full transition-colors duration-150 ${
                btn === "=" ? "bg-blue-500 hover:bg-blue-600 text-white col-span-2" :
                btn === "C" ? "bg-gray-300 hover:bg-gray-400 text-black" :
                "÷×-+".includes(btn) ? "bg-gray-200 hover:bg-gray-300 text-black" :
                "bg-gray-100 hover:bg-gray-200 text-black"
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}