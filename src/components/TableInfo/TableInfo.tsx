import './table-info.scss'

interface ITableInfoProps {
    data: Array<object>
    nameMapping: any
}

export default function TableInfo({ data, nameMapping }: ITableInfoProps) {

    let headers: Array<string> = []
    if (data.length >= 0) {
        headers = Object.keys(data[0])
    }

    return (
        <table>
            <tbody>
                <tr>
                    {headers.map((header, index) => <th key={index}>{nameMapping[header]}</th>)}
                </tr>

                {data.map((obj, index) => {
                    return <tr key={index}>
                        {Object.values(obj).map((value, index) => <td key={index}>{value}</td>)}
                    </tr>
                })}
            </tbody>
        </table>
    )
}