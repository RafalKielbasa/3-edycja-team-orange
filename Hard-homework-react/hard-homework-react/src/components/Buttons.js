export default function Buttons({ data, handleClick }) {
  return Object.keys(data).map((item) => (
    <button onClick={() => handleClick(item)}>{item}</button>
  ));
}
