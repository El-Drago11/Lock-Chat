'use client'

import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import UserInputIndex from "./UserInputIndex";
import { defaultCodeType, generateDefaultCode } from "@/lib/CodeGenrator";
import SecretInputIndex from "./SecretInputIndex";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import SecretCodes from './SecretCodes'
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
        if (!getUserInput?.length) return;
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
                        pos: curr,
                        secret: (value?.secret.join('-') + '-' + space + '-')
                    }
                    encryptMessage.push(obj)
                })
            });
            encryptMessage.sort((a, b) => a.pos - b.pos);
            let encryptText = '';
            encryptMessage?.forEach((curr) => {
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
            toast.error(`Unsupported characters: ${uniqueInvalid.map(char => char).join(', ')}`);

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
        <div className="space-y-20">
            <div className="h-full space-y-10">
                <div className="grid grid-cols-12 h-auto lg:h-[40svh] gap-x-0 gap-y-4 lg:gap-10">
                    <div className="col-span-12 lg:col-span-4 flex flex-col overflow-y-auto gap-y-2 h-full">
                        <div className="text-lg flex items-center gap-2">
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-text-cursor-input-icon lucide-text-cursor-input"><path d="M12 20h-1a2 2 0 0 1-2-2 2 2 0 0 1-2 2H6" /><path d="M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7" /><path d="M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1" /><path d="M6 4h1a2 2 0 0 1 2 2 2 2 0 0 1 2-2h1" /><path d="M9 6v12" /></svg></span>
                            <span className="text-orange-500 font-bold">Text Input</span>
                        </div>
                        <div className="h-full overflow-y-auto">
                            <Textarea value={getUserInput ?? ''} className="w-full h-[30svh] lg:h-full" onChange={(e) => checkIsValidKey(e.target.value)} placeholder="Please enter your message to encrypt..." />
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-2 flex flex-col justify-center gap-4">
                        <Button className="bg-red-500 hover:bg-red-600" onClick={() => copyTheEncryptMessage()}>Copy Token</Button>
                    </div>
                    <div className="col-span-12 lg:col-span-6 h-[40svh]">
                        <div className="flex flex-col h-full gap-y-2">
                            <div className="h-8 flex items-center gap-2 text-lg">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check">
                                        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                                        <path d="m9 12 2 2 4-4" />
                                    </svg>
                                </span>
                                <span className="text-orange-500 font-bold">Token Encoding</span>
                            </div>
                            <div className="flex-1 overflow-y-auto border-4 rounded-lg p-4">
                                <UserInputIndex getUserInput={getUserInput} getToken={getToken} setToken={setToken} getSecretCodes={getSecretCodes} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-12 h-auto lg:h-[40svh] gap-x-0 gap-y-4 lg:gap-10">
                    <div className="col-span-12 lg:col-span-4 overflow-y-auto flex flex-col gap-2">
                        <div className="text-lg flex items-center gap-2">
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-lock-icon lucide-user-lock"><circle cx="10" cy="7" r="4" /><path d="M10.3 15H7a4 4 0 0 0-4 4v2" /><path d="M15 15.5V14a2 2 0 0 1 4 0v1.5" /><rect width="8" height="5" x="13" y="16" rx=".899" /></svg></span>
                            <span className="text-orange-500 font-bold">Encrypted Input</span>
                        </div>
                        <div className="h-full overflow-y-auto">
                            <Textarea value={encryptMessage ?? ''} className="w-full h-[30svh] lg:h-full" placeholder="Please Paste your secret message here to decrypt..." onChange={(e) => setEncryptMessage(e.target.value)} />
                        </div>
                    </div>
                    <SecretInputIndex encryptMessage={encryptMessage} getSecretCodes={getSecretCodes} />
                </div>
            </div>
            <div className="grid grid-cols-12 gap-x-0 gap-y-4 lg:gap-10 border-t-2 border-dashed py-10" id="yourSecret">
                <div className="col-span-12 text-xl font-bold flex items-center gap-2">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-key-icon lucide-book-key"><path d="m19 3 1 1" /><path d="m20 2-4.5 4.5" /><path d="M20 7.898V21a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" /><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2h7.844" /><circle cx="14" cy="8" r="2" /></svg>
                    </span>
                    <span>Your Secert Dictionary (key-value)</span>
                </div>
                <SecretCodes getSecretCodes={getSecretCodes} setSecretCode={setSecretCode}/>
            </div>
        </div>
    )
}

export default HomeIndex;