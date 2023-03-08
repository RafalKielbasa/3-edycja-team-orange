export default function HighPriorityList({ highPriorityItems }) {
  return (
    <div>
      {highPriorityItems.map((item) => (
        <li key={item.id}>{item.value}</li>
      ))}
    </div>
  );
}
