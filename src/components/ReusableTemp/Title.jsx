export default function Title({title, position}) {
    return <>
        <h1 className="title" style={{textAlign: position}}>{title}</h1>
    </>
}