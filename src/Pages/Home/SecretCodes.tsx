'use client'
import { defaultCodeType } from "@/lib/CodeGenrator";
import { toast } from "react-toastify";

interface Props {
    getSecretCodes: defaultCodeType[] | null;
    setSecretCode: (value: defaultCodeType[] | null) => void
}

const SecretCodes = ({ getSecretCodes, setSecretCode }: Props) => {

    const changeSecret = (val: string, key: string, oldVal: string) => {
        //check if already assigned
        const isFound = getSecretCodes?.find((curr) => {
            if ((curr?.key != key) && curr?.value === val) {
                toast.error("The value is already assigned");
                return;
            }
        })


        //create a new secretCodes Details
        const newDictionary = getSecretCodes?.map((curr) => {
            if (curr?.key == key) {
                return { ...curr, value: isFound ? oldVal : val };
            }
            else return curr;
        })
        if (newDictionary) setSecretCode(newDictionary)
    }


    return (
        <div className="col-span-12 flex flex-wrap w-full gap-10 justify-evenly">
            {
                (getSecretCodes && getSecretCodes.length) ?
                    getSecretCodes?.map((curr, index) => (
                        <div key={index} className="flex border-1 p-2 rounded-md justify-between gap-4 w-28">
                            <div className="font-bold">{curr?.key}</div>
                            <input defaultValue={curr?.value} className="w-1/2 text-center" onChange={(e) => changeSecret(e.currentTarget.value, curr?.key, curr?.value)} />
                        </div>
                    ))
                    : <></>
            }
        </div>
    )
}

export default SecretCodes