
import { defaultCodeType } from "@/lib/CodeGenrator";
import ChangeSecretCode from './ChangeSecretCode'

interface Props {
    getSecretCodes: defaultCodeType[] | null;
    setSecretCode: (value: defaultCodeType[] | null) => void
}

const SecretCodes = ({ getSecretCodes, setSecretCode }: Props) => {

    return (
        <div className="col-span-12 flex flex-wrap w-full gap-10 justify-evenly">
            {
                (getSecretCodes && getSecretCodes.length) ?
                    getSecretCodes?.map((curr, index) => (
                        <div key={index} className="flex border-1 p-2 rounded-md justify-between gap-4 w-20 md:w-28">
                            <div className="font-bold">{curr?.key}</div>
                            <ChangeSecretCode defaultValue={curr?.value} defaultKey={curr?.key} getSecretCodes={getSecretCodes} setSecretCode={setSecretCode} />
                        </div>
                    ))
                    : <></>
            }
        </div>
    )
}

export default SecretCodes