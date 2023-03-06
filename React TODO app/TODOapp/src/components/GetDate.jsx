export default function GetDate() {
  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  return (
    <span>
      {date}/{month}/{year}
    </span>
  );
}
