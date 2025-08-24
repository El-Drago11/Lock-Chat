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
        <div className="grid grid-cols-12 gap-10 h-full">
            <div className="col-span-3 flex flex-col justify-center">
                <Button className="bg-green-400 hover:bg-green-600" onClick={() => DecryptUserMessage()}>Decrypt Message</Button>
            </div>
            <div className="col-span-9 flex flex-col justify-center items-center border-1 rounded-lg overflow-y-auto">
                {
                    (encryptMessage && decryptedMessage && (decryptedMessage?.length > 0))
                        ?
                        <span className="text-lg font-semibold">{decryptedMessage}</span>
                        :
                        <span className="text-2xl font-semibold text-muted">
                            Please Paste your message TO DECRYPT message box
                        </span>
                }
            </div>

        </div>
    )
}

export default SecretInputIndex;