
export default function Alert({message, color}) {

    return (
        <>
            <div className='alert' style={{backgroundColor: color}}>
                <h4>{message}</h4>
            </div>
        </>
    )
}
