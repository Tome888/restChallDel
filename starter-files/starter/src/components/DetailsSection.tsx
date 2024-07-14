
interface DetailProps{
    image: string,
    phone: string,
    email: string,
    address: string

    api?: any[]
    numberRandom?: number
    idNumber?: string
}

export function DetailsSection({image, phone, email, address}: DetailProps){
    
    return(
        <div>
         <img className="imgIndividualPage" src={image} alt="Details"/>
         <p>{phone}</p>
         <p>{email}</p>
         <p>{address}</p>
        </div>
    )
}