import React, { useState, createContext, useContext, useEffect } from "react";
import type{ salaryBreakdown } from '../components/AddvancedSettings';
import { salaryBreakdownAmount } from "../utils/taxUtils";

interface ContextType {
  ctc: number;
  setCtc: React.Dispatch<React.SetStateAction<number>>;
  isMonthly: boolean;
  setIsMonthly: React.Dispatch<React.SetStateAction<boolean>>;
  isShow: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  isEmpty: boolean;
  setEmpty: React.Dispatch<React.SetStateAction<boolean>>;
  isNew: boolean;
  setIsNew: React.Dispatch<React.SetStateAction<boolean>>;
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  isCheckedTax: boolean;
  setIsCheckedTax: React.Dispatch<React.SetStateAction<boolean>>;
  isAmount: boolean;
  setIsAmount: React.Dispatch<React.SetStateAction<boolean>>;
  esi: number;
  setIsEsi: React.Dispatch<React.SetStateAction<number>>;
  epf: number;
  setIsEpf: React.Dispatch<React.SetStateAction<number>>;
  total: number;
  setTotal:  React.Dispatch<React.SetStateAction<number>>;
  salaryBreakdown: salaryBreakdown;
  setSalaryBreakdown: React.Dispatch<React.SetStateAction<salaryBreakdown>>;
  grossSalary:number;
  setGrossSalary: React.Dispatch<React.SetStateAction<number>>;
  
}

const MyContext = createContext<ContextType | null>(null);

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [grossSalary, setGrossSalary ] = useState<number>(0);  
  const [ctc, setCtc] = useState<number>(0);  
  const [isMonthly, setIsMonthly] = useState<boolean>(false);
  const [isShow, setShow] = useState<boolean>(false);
  const [isEmpty, setEmpty] = useState<boolean>(false);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [isCheckedTax, setIsCheckedTax] = useState<boolean>(true);
  const [isAmount, setIsAmount] = useState<boolean>(false);
  const [esi, setIsEsi] = useState<number>(0);
  const [epf, setIsEpf] = useState<number>(0);
   const [total, setTotal] = useState(0);
   
  const [salaryBreakdown, setSalaryBreakdown] = useState<salaryBreakdown>({
    basicSalary: 40,
    hra: 20,
    da: 10,
    lta: 5,
    specialAllowance: 15,
    performanceBonus: 10
  });

  useEffect(() => {
  const  gs = Object.values(salaryBreakdownAmount(salaryBreakdown,ctc)).reduce((t,i) => t+i,0);
 setGrossSalary((gs));
}, [ctc,salaryBreakdown]);


  return (
    <MyContext.Provider
      value={{
        ctc,
        setCtc,
        isMonthly,
        setIsMonthly,
        isShow,
        setShow,
        isEmpty,
        setEmpty,
        isNew,
        setIsNew,
        isChecked,
        setIsChecked,
        isCheckedTax,
        setIsCheckedTax,
        isAmount,
        setIsAmount,
        esi,
        setIsEsi,
        epf,
        setIsEpf,
        salaryBreakdown,
        setSalaryBreakdown,
        setTotal,
        total,
       grossSalary,
        setGrossSalary
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a ContextProvider");
  }
  return context;
};


