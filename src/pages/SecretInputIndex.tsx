import { defaultCodeType } from "@/lib/CodeGenrator";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
interface Props {
    encryptMessage: string | null;
    getSecretCodes: defaultCodeType[] | null;
}

const SecretInputIndex = ({ encryptMessage, getSecretCodes }: Props) => {

    const [decryptedMessage, setDecryptedMessage] = useState<string | null>(null)

    const DecryptUserMessage = () => {
        //get the array
        const decryptData = encryptMessage?.split('-')
        //find the value for each key
        const encrptData = decryptData?.map((curr) => {
            const obj = getSecretCodes?.find((x) => x.value == curr)
            return obj?.key
        })?.join('')
        if (encrptData) setDecryptedMessage(encrptData)
    }

    useEffect(() => {
        if (encryptMessage && encryptMessage?.length == 0) setDecryptedMessage('');
    }, [encryptMessage])

    return (
        <>
            <div className="col-span-12 lg:col-span-2 flex flex-col justify-center">
                <Button className="bg-green-400 hover:bg-green-600" onClick={() => DecryptUserMessage()}>Decrypt</Button>
            </div>
            <div className="col-span-12 lg:col-span-6 flex flex-col gap-2 h-full">
                <div className="text-lg flex items-center gap-2">
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-key-square-icon lucide-key-square"><path d="M12.4 2.7a2.5 2.5 0 0 1 3.4 0l5.5 5.5a2.5 2.5 0 0 1 0 3.4l-3.7 3.7a2.5 2.5 0 0 1-3.4 0L8.7 9.8a2.5 2.5 0 0 1 0-3.4z" /><path d="m14 7 3 3" /><path d="m9.4 10.6-6.814 6.814A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814" /></svg></span>
                    <span className="text-orange-500 font-bold">Decrypted Input</span>
                </div>
                <div className="flex flex-col justify-center items-center border-4 rounded-lg h-[40svh] lg:h-[40svh] overflow-y-auto">
                    {
                        (encryptMessage && decryptedMessage && (decryptedMessage?.length > 0))
                            ?
                            <div className="text-lg font-semibold overflow-y-auto p-4 h-full flex-1">{decryptedMessage}</div>
                            :
                            <span className="text-lg font-semibold text-muted px-4">
                                Please Paste your message to DECRYPT message box
                            </span>
                    }
                </div>
            </div>
        </>
    )
}

export default SecretInputIndex;