const DrinksTopBar = () => {
  const drinkTypes: string[] = ["Juice", "Soda", "Smoothie", "Milkshake"];

  const handleClick = (item: any) => {
    console.log(`You clicked on ${item}`);
  };

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      {drinkTypes.map((option: string) => (
        <div
          style={{ border: "2px solid black", padding: "10px", width: "25%" }}
          key={option}
          onClick={() => handleClick(option)}
        >
          <p style={{ fontSize: 20 }}>{option}</p>
        </div>
      ))}
    </div>
  );
};

export default DrinksTopBar;
