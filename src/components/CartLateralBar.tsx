const CartLateralBar = () => {
  const products: string[] = ["coca", "sprite", "fanta"];
  return (
    <div style={{ border: "2px solid black", height: "100%" }}>
      <div>
        <h3>Order</h3>
      </div>
      <div>
        {products.map((p) => (
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <p key={p}>{p}</p>
            <button onClick={() => console.log("add", p)}>add</button>
            <button onClick={() => console.log("remove", p)}>remove</button>
          </div>
        ))}
      </div>
      <div>
        <p>Total</p>
      </div>
      <div>
        <button onClick={() => console.log("pay")}>Pay Now</button>
      </div>
    </div>
  );
};

export default CartLateralBar;
