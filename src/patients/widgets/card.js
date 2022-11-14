function Card({ status, number }){
    let bColor = status=='Rescheduled' ? '#eedac1' : status=='Missed'? '#eeced0' : '#cfd6d0';
    let tColor = status=='Rescheduled' ? '#e69002' : status=='Missed'? '#d12c1f' : '#4a7f66';
    return(
        <div className=" flex flex-col px-6 py-3 space-y-3 basis-1/3  w-[10em] items-start justify-between rounded-bl-[2em] rounded-tr-[2em]" style={{backgroundColor: bColor, color: tColor}}>
            <h2 className="flex justify-items-start text-[18px] font-bold">{status}</h2>
            <h1 className="flex justify-items-start font-bold text-[30px]" style={{color: tColor}}>{number}</h1>
        </div>
    )
}

export default  Card;
