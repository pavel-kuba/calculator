"use client";
import { useState } from "react";

function Calculator({ theme }: { theme: 'light' | 'dark' }) {
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

  const lightTheme = {
    bg: "bg-white",
    display: "bg-gray-100 text-black",
    button: "bg-gray-100 hover:bg-gray-200 text-black",
    opButton: "bg-gray-200 hover:bg-gray-300 text-black",
    equalButton: "bg-blue-500 hover:bg-blue-600 text-white",
    clearButton: "bg-gray-300 hover:bg-gray-400 text-black",
    shadow: "shadow-lg",
  };

  const darkTheme = {
    bg: "bg-gray-900",
    display: "bg-gray-800 text-white",
    button: "bg-gray-700 hover:bg-gray-600 text-white",
    opButton: "bg-gray-600 hover:bg-gray-500 text-white",
    equalButton: "bg-orange-500 hover:bg-orange-600 text-white",
    clearButton: "bg-gray-500 hover:bg-gray-400 text-white",
    shadow: "shadow-[0_0_15px_rgba(255,255,255,0.3)]",
  };

  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  const buttonOrder = ["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "-"];

  return (
    <div className={`w-full sm:w-[90%] md:w-[80%] max-w-lg ${currentTheme.bg} p-4 sm:p-6 md:p-8 rounded-2xl ${currentTheme.shadow}`}>
      <div className={`${currentTheme.display} p-4 sm:p-6 mb-4 sm:mb-6 text-right text-3xl sm:text-4xl md:text-5xl rounded-lg font-medium overflow-x-auto`}>{display}</div>
      <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {buttonOrder.map((btn) => (
          <button
            key={btn}
            onClick={() => {
              if ("0123456789".includes(btn)) handleNumberClick(btn);
              else handleOperationClick(btn);
            }}
            className={`text-xl sm:text-2xl md:text-3xl font-medium py-3 sm:py-4 md:py-6 px-2 sm:px-4 md:px-8 rounded-full transition-colors duration-150 ${
              "÷×-+".includes(btn) ? currentTheme.opButton : currentTheme.button
            }`}
          >
            {btn}
          </button>
        ))}
        <button
          onClick={() => handleClear()}
          className={`${currentTheme.clearButton} text-xl sm:text-2xl md:text-3xl font-medium py-3 sm:py-4 md:py-6 px-2 sm:px-4 md:px-8 rounded-full transition-colors duration-150 col-span-2`}
        >
          C
        </button>
        <button
          onClick={() => handleNumberClick("0")}
          className={`${currentTheme.button} text-xl sm:text-2xl md:text-3xl font-medium py-3 sm:py-4 md:py-6 px-2 sm:px-4 md:px-8 rounded-full transition-colors duration-150`}
        >
          0
        </button>
        <button
          onClick={() => handleOperationClick("+")}
          className={`${currentTheme.opButton} text-xl sm:text-2xl md:text-3xl font-medium py-3 sm:py-4 md:py-6 px-2 sm:px-4 md:px-8 rounded-full transition-colors duration-150`}
        >
          +
        </button>
      </div>
      <button
        onClick={handleEquals}
        className={`${currentTheme.equalButton} w-full text-xl sm:text-2xl md:text-3xl font-medium py-3 sm:py-4 md:py-6 px-2 sm:px-4 md:px-8 rounded-full transition-colors duration-150 mt-2 sm:mt-3 md:mt-4`}
      >
        =
      </button>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center p-4 min-h-[100vh] md:min-h-screen">
        <Calculator theme="light" />
      </div>
      <div className="w-full md:w-1/2 bg-gray-900 flex items-center justify-center p-4 min-h-[100vh] md:min-h-screen">
        <Calculator theme="dark" />
      </div>
    </main>
  );
}