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
            toast.error(`Unsupported characters: ${uniqueInvalid.map(char =>
                char === ' ' ? 'space' : char === '\n' ? 'newline' : char === '\t' ? 'tab' : `"${char}"`
            ).join(', ')}`);
            toast.info('We currently support aplhabets and numbers only')

            // Remove invalid character
            const validInput = val.split('').filter(char =>
                getSecretCodes.some(code => code.key === char)
            ).join('');

            setUserInput(validInput);
        }
    };

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
                    <Button className="bg-red-400 hover:bg-red-600" onClick={() => copyTheEncryptMessage()}>Copy Encrypt Message</Button>
                </div>
                <div className="col-span-6 grid grid-rows-1 overflow-y-auto">
                    <div className=" row-start-1">
                        <UserInputIndex getUserInput={getUserInput} getToken={getToken} setToken={setToken} getSecretCodes={getSecretCodes} />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 h-[40svh] gap-10">
                <div className="col-span-4 overflow-y-auto">
                    <Textarea value={encryptMessage ?? ''} className="w-full h-full overflow-y-auto" placeholder="Please Paste your secret message here to decrypt..." onChange={(e) => setEncryptMessage(e.target.value)} />
                </div>
                <div className="col-span-8">
                    <SecretInputIndex encryptMessage={encryptMessage} getSecretCodes={getSecretCodes} />
                </div>
            </div>
            <div className="grid grid-cols-12 gap-10">
                <div className="col-span-12 text-3xl font-bold">Your Secert Dictionary (key-value)</div>
                {
                    (getSecretCodes && getSecretCodes.length) ?
                        getSecretCodes?.map((curr, index) => (
                            <div key={index} className="flex border-1 p-2 rounded-md justify-between">
                                <span className="font-bold">{curr?.key}</span>
                                <span>{curr?.value}</span>
                            </div>
                        ))
                        : <></>
                }
            </div>
        </div>

    )
}

export default HomeIndex;