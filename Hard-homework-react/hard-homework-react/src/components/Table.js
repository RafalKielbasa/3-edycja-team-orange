export default function Table({ data }) {
  return (
    <table>
      <thead>
        <tr>
          {data.map((item) => {
            return <th>{Object.keys(item)}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr>
              <td>{Object.values(item)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
