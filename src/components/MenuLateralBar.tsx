const MenuLateralBar = () => {
  const menuOptions: string[] = [
    "Meals",
    "Sides",
    "Drinks",
    "Desserts",
    "Sauces",
  ];

  const handleClick = (item: any) => {
    console.log(`You clicked on ${item}`);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {menuOptions.map((option: string) => (
        <div
          style={{ border: "2px solid black", padding: "10px" }}
          key={option}
          onClick={() => handleClick(option)}
        >
          <p style={{ fontSize: 20 }}>{option}</p>
        </div>
      ))}
    </div>
  );
};

export default MenuLateralBar;
