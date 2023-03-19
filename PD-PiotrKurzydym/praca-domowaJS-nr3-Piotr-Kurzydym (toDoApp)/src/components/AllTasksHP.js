const AllTasksHP = ({ items }) => {
  const arrayHighPriority = items.filter(function (item) {
    return item.priority === "high";
  });

  return arrayHighPriority.map((item) => (
    <li key={item.id} id="highPriorityTaskList">
      <div>
        <span className={item.isCompleted ? "text-strike" : null}>
          {item.value} - {item.dateAndTime} - {item.dateAndTimeofEdit}
        </span>
      </div>
    </li>
  ));
};
export default AllTasksHP;
