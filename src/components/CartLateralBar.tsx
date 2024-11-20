// precisa receber do modal:
// - sabor / preço
// - addon / preço

// precisa ser capaz de:
// - adicionar e remover produto

// precisa calcular:
// - valor total sempre que alguma mudança de produto acontecer

// importar da Store:
// - addToCart
// - removeFromCart
// pay now button should show something since the payment function does not exist

const CartLateralBar = () => {
  const products: string[] = ["coca", "sprite", "fanta"];
  return (
    <div style={{ border: "2px solid black", height: "100%" }}>
      <div>
        <h3>Order</h3>
      </div>
      <div>
        {products.map((p, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <p key={i}>{p}</p>
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
