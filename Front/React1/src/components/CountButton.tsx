import { useState } from "react";

interface CountButtonProps {
  label?: string;
  onCountChange: (newCount: number) => void;
}

const CountButton = ({ label = "Clics", onCountChange }: CountButtonProps) => {
  const [number, setNumber] = useState<number>(0);

  function manageCounter() {
    const nextValue = number + 1;

    setNumber(nextValue);
    onCountChange(nextValue);
  }

  return (
    // c'est un fragment
    <>
      <button onClick={manageCounter}>{label}</button>
    </>
  );
};

export default CountButton;
