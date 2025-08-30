
import { defaultCodeType } from "@/lib/CodeGenrator";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  defaultValue: string;
  defaultKey: string;
  getSecretCodes: defaultCodeType[] | null;
  setSecretCode: (value: defaultCodeType[] | null) => void;
}

const ChangeSecretCode = ({ defaultValue, defaultKey, getSecretCodes, setSecretCode }: Props) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  const changeSecret = (val: string, key: string, oldVal: string) => {
    // check for duplicate values on different keys
    const isFound = getSecretCodes?.find(
      (curr) => curr.key !== key && curr.value === val
    );

    if (isFound) {
      toast.error(`The value "${val}" is already assigned to Key "${isFound.key}"`);
      setInputValue(oldVal);
      return;
    }

    // update dictionary
    const newDictionary = getSecretCodes?.map((curr) =>
      curr.key === key ? { ...curr, value: val } : curr
    );

    if (newDictionary) setSecretCode(newDictionary);
  };

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      changeSecret(inputValue, defaultKey, defaultValue);
    }
  };

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);

  return (
    <input
      value={inputValue}
      className="w-1/2 text-center border rounded px-2 py-1"
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={(e) => changeSecret(e.target.value, defaultKey, defaultValue)}
      onKeyDown={handleKeyDown}
    />
  );
};

export default ChangeSecretCode;
