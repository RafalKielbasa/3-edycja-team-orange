export default function Table({ data }) {
  const fetchData = data.length > 0 ? data[0] : []

  const headers = Object.keys(fetchData)?.filter((_, index) => index < 8)
  console.log(headers)

  console.log()

  return (
    <table>
      <thead>
        <tr>
          {headers?.map((item) => {
            return <th>{item}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr>
              {headers.map((name) => (
                <td>{item[name]}</td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
