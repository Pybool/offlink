import Blockies from 'react-blockies';


export const identiconAddress = (address: string, size: any) => {
    return <Blockies size={size} scale={4} className="identicon border-2 border-white rounded-full" seed={address}/>
}