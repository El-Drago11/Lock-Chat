'use client'

import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import UserInputIndex from "./UserInputIndex";
import { defaultCodeType, generateDefaultCode } from "@/lib/CodeGenrator";
import SecretInputIndex from "./SecretInputIndex";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export interface tokenType {
    pos: number[];
    secret: string[];
}


const HomeIndex = () => {

    const [getUserInput, setUserInput] = useState<string | null>(null);
    const [getToken, setToken] = useState<Map<string, tokenType> | null>(null);
    const [getSecretCodes, setSecretCode] = useState<defaultCodeType[] | null>(null);
    const [encryptMessage, setEncryptMessage] = useState<string | null>(null);

    const copyTheEncryptMessage = async () => {
        let space = '';
        if (getSecretCodes) {
            const val = getSecretCodes?.find((curr) => curr?.key == ' ')
            if (val?.value) space = val?.value;
        }
        try {
            const encryptMessage: { pos: number, secret: string }[] = [];
            getToken?.forEach((value) => {
                value?.pos?.forEach((curr) => {
                    const obj = {
                        pos:curr,
                        secret: (value?.secret.join('-') + '-' + space + '-')
                    }
                    encryptMessage.push(obj)
                })
            });
            encryptMessage.sort((a, b) => a.pos - b.pos);
            let encryptText = '';
            encryptMessage?.forEach((curr)=>{
                encryptText += curr?.secret;
            })
            await navigator.clipboard.writeText(encryptText)
            toast.success('Copied to Clipboard')
        } catch (error) {
            console.error(error)
            toast.error('Unable to copy message')
        }
    }

    const checkIsValidKey = (val: string) => {

        if (!getSecretCodes) return;

        // Check each character
        const invalidChars = val.split('').filter(char =>
            !getSecretCodes.some(code => code.key === char)
        );
        // All characters are valid
        if (invalidChars.length === 0) {
            setUserInput(val);
        } else {
            // All characters are valid
            const uniqueInvalid = [...new Set(invalidChars)];
            toast.error(`Unsupported characters: ${uniqueInvalid.map(char =>char).join(', ')}`);

            // Remove invalid character
            const validInput = val.split('').filter(char =>
                getSecretCodes.some(code => code.key === char)
            ).join('');

            setUserInput(validInput);
        }
    };

    const changeSecret = (val:string,key:string)=>{
        console.log(`chnaging ${key}`,val)
    }

    useEffect(() => {
        const data = generateDefaultCode();
        setSecretCode(data);
    }, [])

    return (
        <div className="h-full space-y-10">
            <div className="grid grid-cols-12 h-[40svh] gap-10">
                <div className="col-span-4 overflow-y-auto">
                    <Textarea value={getUserInput ?? ''} className="w-full h-full" onChange={(e) => checkIsValidKey(e.target.value)} placeholder="Please enter your message to encrypt..." />
                </div>
                <div className="col-span-2 flex flex-col justify-center gap-4">
                    <Button className="bg-red-500 hover:bg-red-600" onClick={() => copyTheEncryptMessage()} disabled={!getUserInput?.length}>Copy Encrypt Message</Button>
                </div>
                <div className="col-span-6 grid grid-rows-1 overflow-y-auto">
                    <div className="row-start-1 border-4 p-4 rounded-lg">
                        <UserInputIndex getUserInput={getUserInput} getToken={getToken} setToken={setToken} getSecretCodes={getSecretCodes} />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 h-[40svh] gap-10">
                <div className="col-span-4 overflow-y-auto">
                    <Textarea value={encryptMessage ?? ''} className="w-full h-full" placeholder="Please Paste your secret message here to decrypt..." onChange={(e) => setEncryptMessage(e.target.value)} />
                </div>
                <div className="col-span-8 h-full">
                    <SecretInputIndex encryptMessage={encryptMessage} getSecretCodes={getSecretCodes} />
                </div>
            </div>
            <div className="grid grid-cols-12 gap-10">
                <div className="col-span-12 text-3xl font-bold">Your Secert Dictionary (key-value)</div>
                <div className="col-span-12 flex flex-wrap w-full gap-10">
                {
                    (getSecretCodes && getSecretCodes.length) ?
                        getSecretCodes?.map((curr, index) => (
                            <div key={index} className="flex border-1 p-2 rounded-md justify-between gap-4 w-28">
                                <div className="font-bold">{curr?.key}</div>
                                <input defaultValue={curr?.value} className="w-1/2 text-center" onChange={(e)=>changeSecret(e.currentTarget.value,curr?.key)}/>
                            </div>
                        ))
                        : <></>
                }
                </div>
            </div>
        </div>

    )
}

export default HomeIndex;