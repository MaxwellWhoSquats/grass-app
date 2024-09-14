const DateDisplay = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div>
      <div className="font-semibold">{formattedDate}</div>
    </div>
  );
};

export default DateDisplay;
