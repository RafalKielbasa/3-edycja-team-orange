export default function Buttons({ data, handleClick }) {
  console.log(data)

  return Object.keys(data).map((item) => (
    <button onClick={() => handleClick(item)}>{item}</button>
  ))
}
