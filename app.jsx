function DemoApp() {
    const [page, setPage] = React.useState("login");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [cart, setCart] = React.useState([]);
    const [popup, setPopup] = React.useState("");
  
    const products = [
      { id: 1, name: "Celana Osi" },
      { id: 2, name: "Celana Pretty" },
      { id: 3, name: "Tas Ika" },
      { id: 4, name: "Jaket Lutfi" },
      { id: 5, name: "Sepatu Maul" }
    ];
  
    const handleLogin = () => {
      if (email === "test.qa@trimegah.com" && password === "password123") {
        setError("");
        setPage("shop");
      } else {
        setError("Invalid email or password");
      }
    };
  
    const handleLogout = () => {
      setEmail("");
      setPassword("");
      setCart([]);
      setPage("login");
    };
  
    const showPopup = (msg, duration = 3000) => {
      setPopup(msg);
      setTimeout(() => setPopup(""), duration);
    };
  
    const addToCart = (p) => {
      if (cart.find(c => c.id === p.id)) {
        showPopup(`Product "${p.name}" sudah ditambahkan!`, 2500);
        return;
      }
      setCart([...cart, p]);
      showPopup(`Product "${p.name}" berhasil ditambahkan!`, 3000);
    };
  
    const removeFromCart = (id) => {
      const removed = cart.find(c => c.id === id);
      if (!removed) return;
      setCart(cart.filter(c => c.id !== id));
      showPopup(`Product "${removed.name}" dihapus dari cart`, 2500);
    };
  
    const addAllProducts = () => {
      const newProducts = products.filter(p => !cart.find(c => c.id === p.id));
      if (newProducts.length === 0) {
        showPopup("Semua product sudah ditambahkan!", 2500);
        return;
      }
      setCart([...cart, ...newProducts]);
      showPopup("Semua product berhasil ditambahkan!", 3000);
    };
  
    const removeAllProducts = () => {
      if (cart.length === 0) {
        showPopup("Cart kosong!", 2500);
        return;
      }
      setCart([]);
      showPopup("Semua product dihapus dari cart", 3000);
    };
  
    return (
      <div className="container">
        {popup && <div className="popup">{popup}</div>}
  
        {page === "login" && (
          <div className="card">
            <div className="logo">
              <img src="logo.png" alt="Demo Logo" />
            </div>
            <h1>Demo Login</h1>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-testid="email-input"
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-testid="password-input"
              onKeyDown={(e) => { if (e.key === "Enter") handleLogin(); }}
            />
            {error && <div className="error" data-testid="login-error">{error}</div>}
            <button onClick={handleLogin} data-testid="login-button">Login</button>
          </div>
        )}
  
        {page === "shop" && (
          <div className="card">
            <div className="logo">
              <img src="logo.png" alt="Demo Logo" />
            </div>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <h1>Demo Shop</h1>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
  
            <h2>Products</h2>
            <div style={{marginBottom: "10px"}}>
              <button onClick={addAllProducts}>Add All Products</button>
              <button onClick={removeAllProducts} style={{marginLeft: "10px"}}>Remove All Products</button>
            </div>
  
            {products.map((p) => (
              <div key={p.id} className="row">
                <span>{p.name}</span>
                <button data-testid={`add-${p.id}`} onClick={() => addToCart(p)}>Add</button>
              </div>
            ))}
  
            <h2>Cart</h2>
            <div data-testid="cart-list">
              {cart.length === 0 && <p>No items in cart</p>}
              {cart.map((c) => (
                <div key={c.id} className="row">
                  <span>{c.name}</span>
                  <button data-testid={`remove-${c.id}`} onClick={() => removeFromCart(c.id)}>Remove</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
  
  ReactDOM.createRoot(document.getElementById("root")).render(<DemoApp />);
  