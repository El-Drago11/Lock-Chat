import { useEffect } from "react";
import { Button } from "@/components/ui/button"
import { defaultCodeType } from "@/lib/CodeGenrator";
import { tokenType } from "./HomeIndex";
import { toast } from "react-toastify";



interface Props {
    getUserInput: string | null;
    getToken: Map<string, tokenType> | null;
    setToken: (value: Map<string, tokenType> | null) => void;
    getSecretCodes: defaultCodeType[] | null;
}

const UserInputIndex = ({ getUserInput, getToken, setToken, getSecretCodes }: Props) => {

    useEffect(() => {
        const data = getUserInput?.split(' ');
        if (data && getSecretCodes) {
            const tempStore = new Map<string, tokenType>();
            data?.forEach((curr, index) => {
                // Check if word already exists
                if (tempStore?.has(curr)) {
                    // Add position to existing token
                    const existingToken = tempStore?.get(curr);
                    existingToken?.pos?.push(index);
                } else {
                    // Process new word
                    const eachLetters = curr?.split('');
                    const getSecretLetters = eachLetters?.map((currLetter: string) => {
                        const found = getSecretCodes?.find((x) => x.key === currLetter);
                        return found?.value;
                    }).filter(Boolean) as string[];

                    // Check if all letters were found
                    if (getSecretLetters && getSecretLetters.length === eachLetters.length) {
                        const obj = {
                            'pos': [index],
                            'secret': getSecretLetters
                        };
                        tempStore.set(curr, obj);
                    } else {
                        // Only alert for genuinely unmappable characters
                        const unmappedChars = eachLetters.filter(letter =>
                            !getSecretCodes.some(code => code.key === letter)
                        );
                        toast.warn(`No secret mapping found for characters: ${unmappedChars.join(', ')} in word "${curr}"`);

                        // Still store the word but mark it as incomplete
                        const obj = {
                            'pos': [index],
                            'secret': [...getSecretLetters, '[INCOMPLETE]']
                        };
                        tempStore.set(curr, obj);
                    }
                }
            });

            if (tempStore) setToken(tempStore);
        }
    }, [getUserInput])


    return (
        <>
            {
                getUserInput
                    ?
                    <div className="flex gap-4 flex-wrap">
                        {(getToken && getToken.size) ?
                            Array.from(getToken)?.map(([key, value], index) => (
                                <div key={index} className="flex flex-col gap-2">
                                    <Button variant={'secondary'} className="bg-amber-400 hover:bg-amber-500 dark:bg-slate-800 dark:hover:bg-slate-600">
                                        {key}
                                    </Button>
                                    <Button variant={'secondary'} className="bg-amber-400 hover:bg-amber-500 dark:bg-slate-800 dark:hover:bg-slate-600">
                                        {value?.secret}
                                    </Button>
                                </div>
                            ))
                            : <></>}

                    </div>
                    :
                    <div className="flex justify-center items-center text-xl font-semibold text-muted h-full">No User Input</div>
            }
        </>
    )
}

export default UserInputIndex;