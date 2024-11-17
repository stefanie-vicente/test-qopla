const DrinkOptions = () => {
  const drinkFlavours: string[] = [
    "Coca",
    "Sprite",
    "Fanta",
    "Coca Zero",
    "Sprite Zero",
    "Fanta Zero",
  ];

  const handleClick = (item: any) => {
    console.log(`You clicked on ${item}`);
  };

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      {drinkFlavours.map((option: string) => (
        <div
          style={{ border: "1px solid black", padding: "10px" }}
          key={option}
          onClick={() => handleClick(option)}
        >
          <p style={{ fontSize: 20 }}>{option}</p>
        </div>
      ))}
    </div>
  );
};

export default DrinkOptions;
