export default function HighPriorityList({ highPriorityItems }) {
  return (
    <div>
      <ul>
        {highPriorityItems?.map((item) => (
          <li key={item.id}>{item.value}</li>
        ))}
      </ul>
    </div>
  );
}
