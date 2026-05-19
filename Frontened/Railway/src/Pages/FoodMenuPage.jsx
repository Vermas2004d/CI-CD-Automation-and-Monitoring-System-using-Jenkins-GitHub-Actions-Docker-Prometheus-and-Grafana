import React, { useState } from "react";
import { Search, ShoppingCart, Plus, Minus, X } from "lucide-react";
import { initiatePayment } from "../utils/paymentUtils";
import { useNavigate } from "react-router-dom";

const FoodMenu = () => {
  const [isVeg, setIsVeg] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const navigate = useNavigate();

  const foodData = {
    appetizers: [
      {
        name: "Crispy Samosa",
        description: "Golden fried pastry filled with spiced potatoes and peas",
        price: "₹40",
        type: "veg",
        image:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80",
      },
      {
        name: "Paneer Tikka",
        description: "Marinated cottage cheese cubes grilled to perfection",
        price: "₹160",
        type: "veg",
        image:
          "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&q=80",
      },
      {
        name: "Spring Rolls",
        description: "Crispy rolls filled with stir-fried vegetables",
        price: "₹120",
        type: "veg",
        image:
          "https://saltedmint.com/wp-content/uploads/2024/01/Vegetable-Spring-Rolls-4-500x375.jpg",
      },
      {
        name: "French Fries",
        description: "Crispy golden salted fries",
        price: "₹90",
        type: "veg",
        image:
          "https://www.inspiredtaste.net/wp-content/uploads/2022/10/Baked-French-Fries-Recipe-1200.jpg",
      },
      {
        name: "Chicken 65",
        description: "Spicy, deep-fried chicken dish from Chennai",
        price: "₹200",
        type: "non-veg",
        image:
          "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=500&q=80",
      },
      {
        name: "Fish Fingers",
        description: "Crispy breaded fish strips with tartar sauce",
        price: "₹180",
        type: "non-veg",
        image:
          "https://i.ndtvimg.com/i/2016-09/fish-fingers-625_625x350_71474443801.jpg",
      },
    ],
    soups: [
      {
        name: "Tomato Soup",
        description: "Classic creamy tomato soup with croutons",
        price: "₹80",
        type: "veg",
        image:
          "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&q=80",
      },
      {
        name: "Sweet Corn Soup",
        description: "Indo-Chinese style soup with sweet corn and veggies",
        price: "₹90",
        type: "veg",
        image:
          "https://media.istockphoto.com/id/182119752/photo/soup-of-fresh-yellow-corn-served-on-a-wooden-table.jpg?s=612x612&w=0&k=20&c=SyhQNaSyAwFLz_sLmsGyfe-opZD2bFVHgZuucQlfmxg=",
      },
      {
        name: "Manchow Soup",
        description: "Spicy soup with vegetables and fried noodles",
        price: "₹100",
        type: "veg",
        image:
          "https://cdn1.foodviva.com/static-content/food-images/soup-recipes/manchow-soup/manchow-soup.jpg",
      },
      {
        name: "Chicken Clear Soup",
        description: "Light and flavorful chicken broth",
        price: "₹120",
        type: "non-veg",
        image:
          "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?w=500&q=80",
      },
    ],
    salads: [
      {
        name: "Garden Fresh Salad",
        description: "Sliced cucumbers, tomatoes, carrots, and onions",
        price: "₹80",
        type: "veg",
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80",
      },
      {
        name: "Caesar Salad",
        description:
          "Crisp lettuce with parmesan, croutons and caesar dressing",
        price: "₹140",
        type: "veg",
        image:
          "https://shwetainthekitchen.com/wp-content/uploads/2022/09/vegetarian-caesar-salad.jpg",
      },
      {
        name: "Grilled Chicken Salad",
        description: "Salad greens topped with grilled chicken breast",
        price: "₹180",
        type: "non-veg",
        image:
          "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=500&q=80",
      },
    ],
    mainCourses: [
      {
        name: "Paneer Butter Masala",
        description: "Cottage cheese cubes in rich creamy tomato gravy",
        price: "₹220",
        type: "veg",
        image:
          "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80",
      },
      {
        name: "Dal Makhani",
        description: "Whole black lentils cooked with butter and cream",
        price: "₹180",
        type: "veg",
        image:
          "https://sinfullyspicy.com/wp-content/uploads/2015/03/1200-by-1200-images-1.jpg",
      },
      {
        name: "Chana Masala",
        description: "Spicy white chickpeas curry",
        price: "₹160",
        type: "veg",
        image:
          "https://i.ytimg.com/vi/zqlWezI-DBg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBoFMlio7Zaic0VJ3te4B-JKEDMAA",
      },
      {
        name: "Veg Biryani",
        description: "Aromatic rice cooked with mixed vegetables and spices",
        price: "₹200",
        type: "veg",
        image:
          "https://i.ytimg.com/vi/Do7ZdUodDdw/maxresdefault.jpg",
      },
      {
        name: "Butter Chicken",
        description: "Chicken cooked in a mildly spiced tomato sauce",
        price: "₹280",
        type: "non-veg",
        image:
          "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&q=80",
      },
      {
        name: "Chicken Biryani",
        description: "Layered rice dish with spiced chicken",
        price: "₹250",
        type: "non-veg",
        image:
          "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&q=80",
      },
      {
        name: "Mutton Rogan Josh",
        description: "Aromatic lamb dish of Persian origin",
        price: "₹350",
        type: "non-veg",
        image:
          "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&q=80",
      },
    ],
    sideDishes: [
      {
        name: "Butter Naan",
        description: "Soft leavened bread cooked in tandoor",
        price: "₹40",
        type: "veg",
        image:
          "https://t3.ftcdn.net/jpg/08/95/50/04/360_F_895500474_IDUMxbOGEBn29tyPyjG8oLEEWlK8ZlOg.jpg",
      },
      {
        name: "Tandoori Roti",
        description: "Whole wheat bread cooked in clay oven",
        price: "₹30",
        type: "veg",
        image:
          "https://media.istockphoto.com/id/1298650125/photo/homemade-roti-chapati-flatbread.jpg?s=612x612&w=0&k=20&c=C7BH_JgNd4u9L-kYWfPUYVIEIecw5A2deVktAPlTL-g=",
      },
      {
        name: "Jeera Rice",
        description: "Basmati rice flavored with cumin seeds",
        price: "₹120",
        type: "veg",
        image:
          "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=500&q=80",
      },
      {
        name: "Mixed Raita",
        description: "Yogurt with cucumber, tomato and spices",
        price: "₹60",
        type: "veg",
        image:
          "https://www.cookclickndevour.com/wp-content/uploads/2019/07/vegetable-raita-recipe.jpg",
      },
    ],
    desserts: [
      {
        name: "Gulab Jamun",
        description: "Deep-fried dough balls soaked in sugar syrup",
        price: "₹60",
        type: "veg",
        image:
          "https://thumbs.dreamstime.com/b/indian-sweets-gulab-jamun-125773271.jpg",
      },
      {
        name: "Rasgulla",
        description: "Ball-shaped dumplings of chhena and semolina",
        price: "₹60",
        type: "veg",
        image:
          "https://thumbs.dreamstime.com/b/close-up-bowl-indian-rasgulla-dessert-30268552.jpg",
      },
      {
        name: "Choice of Ice Cream",
        description: "Vanilla, Chocolate, or Strawberry",
        price: "₹80",
        type: "veg",
        image:
          "https://media.istockphoto.com/id/1090251878/photo/ice-cream-balls-in-paper-cup.jpg?s=612x612&w=0&k=20&c=QlII4k-Q2phcY190xGomdSsGwv-ab4jStWIhl_d5ndI=",
      },
      {
        name: "Chocolate Brownie",
        description: "Rich chocolate brownie with walnuts",
        price: "₹100",
        type: "veg",
        image:
          "https://bakewithshivesh.com/wp-content/uploads/2024/08/960E4D82-3A2F-436E-89AA-26F56A856DFE.jpg",
      },
    ],
    beverages: [
      {
        name: "Masala Chai",
        description: "Indian spiced tea with milk",
        price: "₹30",
        type: "veg",
        image:
          "https://www.teaforturmeric.com/wp-content/uploads/2021/11/Masala-Chai-Tea-Recipe-Card.jpg",
      },
      {
        name: "Filter Coffee",
        description: "Strong South Indian coffee",
        price: "₹40",
        type: "veg",
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80",
      },
      {
        name: "Sweet Lassi",
        description: "Yogurt-based sweet drink",
        price: "₹70",
        type: "veg",
        image:
          "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&q=80",
      },
      {
        name: "Fresh Fruit Juice",
        description: "Seasonal fresh fruit juice",
        price: "₹80",
        type: "veg",
        image:
          "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&q=80",
      },
    ],
    specials: [
      {
        name: "Special Veg Thali",
        description: "Rice, Dal, 2 Sabzi, Roti, Raita, Sweet, Papad",
        price: "₹250",
        type: "veg",
        image:
          "https://5.imimg.com/data5/ECOM/Default/2023/9/340858396/AP/RZ/RZ/187325221/1693843320605-3e0ba0540b1cc809e84bbd9b762fd686-500x500.jpeg",
      },
      {
        name: "Chicken Thali",
        description: "Rice, Dal, Chicken Curry, Roti, Raita, Sweet",
        price: "₹320",
        type: "non-veg",
        image:
          "https://img.freepik.com/premium-photo/chicken-thali-from-indian-cuisine-food-platter-consists-chicken-fryboiled-egg-curry-lentils-chicken-biryaniroti-onions-selective_726363-858.jpg?semt=ais_hybrid&w=740&q=80",
      },
      {
        name: "Veg Supreme Pizza",
        description: "Topped with onion, capsicum, mushroom, corn",
        price: "₹350",
        type: "veg",
        image:
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80",
      },
      {
        name: "Classic Chicken Burger",
        description: "Grilled chicken patty with cheese and veggies",
        price: "₹180",
        type: "non-veg",
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
      },
    ],
  };

  const handleCheckout = async () => {
      const subtotal = getTotalPrice();
      const deliveryCharge = 50;
      const gst = Math.round((subtotal + deliveryCharge) * 0.05);
      const totalAmount = subtotal + deliveryCharge + gst;

      const bookingData = {
        pnr: "PNR123456789",
        trainNumber: "12345",
        trainName: "Express Train",
        deliveryDetails: {
          stationCode: "NDLS",
          stationName: "New Delhi",
          coach: "A1",
          seat: "25",
          deliveryTime: new Date(),
        },
        items: cart.map((item) => ({
          name: item.name,
          restaurant: "RailSync Kitchen",
          quantity: item.quantity,
          price: parseInt(item.price.replace("₹", "")),
        })),
        contactPhone: "9876543210",
        subtotal,
        deliveryCharge,
        gst,
        totalAmount,
      };

      const userDetails = {
        name: "User",
        email: "user@example.com",
        phone: "9876543210",
      };

      await initiatePayment(
        "food",
        bookingData,
        userDetails,
        (response) => {
          setCart([]);
          setShowCart(false);
          navigate("/dashboard", { state: { section: "history" } });
        },
        (error) => console.error(error)
      );
    };

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.name === item.name);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemName) => {
    const existingItem = cart.find((cartItem) => cartItem.name === itemName);
    if (existingItem.quantity === 1) {
      setCart(cart.filter((cartItem) => cartItem.name !== itemName));
    } else {
      setCart(
        cart.map((cartItem) =>
          cartItem.name === itemName
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseInt(item.price.replace("₹", ""));
      return total + price * item.quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const VegIndicator = () => (
    <span className="inline-block w-4 h-4 border-2 border-green-600 relative mr-2 align-middle rounded-sm">
      <span className="absolute w-2 h-2 bg-green-600 rounded-sm top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
    </span>
  );

  const NonVegIndicator = () => (
    <span className="inline-block w-4 h-4 border-2 border-red-600 relative mr-2 align-middle rounded-sm">
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-8 border-b-red-600"></span>
    </span>
  );

  const FoodCard = ({ item }) => {
    const isInCart = cart.find((cartItem) => cartItem.name === item.name);

    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg hover:border-[#008BD0] transition-all duration-300 group">
        <div className="relative overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2">
            {item.type === "veg" ? <VegIndicator /> : <NonVegIndicator />}
          </div>
        </div>
        <div className="p-4">
          <div className="text-lg font-semibold text-[#1C335C] mb-1">
            {item.name}
          </div>
          <div className="text-gray-600 text-sm leading-relaxed mb-3 h-10 overflow-hidden">
            {item.description}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-[#008BD0]">{item.price}</div>
            <button
              onClick={() => addToCart(item)}
              className="bg-[#008BD0] hover:bg-[#006BA0] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center gap-1"
            >
              <Plus size={16} />
              Add
            </button>
          </div>
          {isInCart && (
            <div className="mt-2 text-xs text-green-600 font-semibold">
              {isInCart.quantity} in cart
            </div>
          )}
        </div>
      </div>
    );
  };

  const CategorySection = ({ title, items }) => {
    const filteredItems = items.filter((item) => {
      const matchesType = item.type === (isVeg ? "veg" : "non-veg");
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });

    if (filteredItems.length === 0) return null;

    

    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-[#1C335C] mb-4 flex items-center gap-2">
          {title}
          <span className="text-sm font-normal text-gray-500">
            ({filteredItems.length})
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item, index) => (
            <FoodCard key={index} item={item} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-[#1C335C]">
                Food Services
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Browse our curated menu for your journey
              </p>
            </div>

            {/* Toggle Switch */}
            <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full">
              <span
                className={`text-sm font-semibold ${
                  isVeg ? "text-green-700" : "text-gray-700"
                }`}
              >
                Veg
              </span>
              <button
                onClick={() => setIsVeg(!isVeg)}
                className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${
                  isVeg ? "bg-green-500" : "bg-red-500"
                }`}
                aria-label="Toggle veg/non-veg"
                aria-pressed={isVeg}
              >
                <span
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                    isVeg ? "translate-x-0" : "translate-x-7"
                  }`}
                ></span>
              </button>
              <span
                className={`text-sm font-semibold ${
                  !isVeg ? "text-red-700" : "text-gray-700"
                }`}
              >
                Non-Veg
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search for dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008BD0] focus:border-transparent"
            />
          </div>
        </div>

        {/* Food Categories */}
        <CategorySection title="Appetizers" items={foodData.appetizers} />
        <CategorySection title="Soups" items={foodData.soups} />
        <CategorySection title="Salads" items={foodData.salads} />
        <CategorySection title="Main Courses" items={foodData.mainCourses} />
        <CategorySection title="Side Dishes" items={foodData.sideDishes} />
        <CategorySection title="Desserts" items={foodData.desserts} />
        <CategorySection title="Beverages" items={foodData.beverages} />
        <CategorySection title="Specials" items={foodData.specials} />
      </div>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <button
          onClick={() => setShowCart(true)}
          className="fixed bottom-6 right-6 bg-[#008BD0] hover:bg-[#006BA0] text-white rounded-full p-4 shadow-lg transition-all duration-200 flex items-center gap-2 z-50"
        >
          <ShoppingCart size={24} />
          <span className="font-semibold">{getTotalItems()}</span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {cart.length}
          </span>
        </button>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-all duration-300"
          onClick={() => setShowCart(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cart Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
              <h2 className="text-2xl font-bold text-[#1C335C] flex items-center gap-2">
                <ShoppingCart className="text-[#008BD0]" />
                Your Cart
              </h2>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-red-500"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                  <div className="bg-gray-50 p-6 rounded-full">
                    <ShoppingCart size={64} className="opacity-20" />
                  </div>
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <button 
                    onClick={() => setShowCart(false)}
                    className="text-[#008BD0] font-semibold hover:underline"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="group bg-white border border-gray-100 rounded-xl p-3 flex gap-4 hover:shadow-md transition-all duration-200"
                    >
                      <div className="relative overflow-hidden rounded-lg w-24 h-24 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-[#1C335C] text-lg leading-tight flex items-center gap-2">
                              {item.type === "veg" ? (
                                <VegIndicator />
                              ) : (
                                <NonVegIndicator />
                              )}
                              {item.name}
                            </h3>
                          </div>
                          <p className="text-[#008BD0] font-bold mt-1">
                            {item.price}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                            <button
                              onClick={() => removeFromCart(item.name)}
                              className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="font-bold text-[#1C335C] w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => addToCart(item)}
                              className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <div className="text-sm font-medium text-gray-500">
                            ₹{parseInt(item.price.replace("₹", "")) * item.quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-white space-y-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-500">
                    <span>Delivery Charge</span>
                    <span>₹50</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-500">
                    <span>GST (5%)</span>
                    <span>₹{Math.round((getTotalPrice() + 50) * 0.05)}</span>
                  </div>
                  <div className="border-t border-dashed border-gray-200 my-2"></div>
                  <div className="flex items-center justify-between text-xl font-bold text-[#1C335C]">
                    <span>Total Amount</span>
                    <span>₹{getTotalPrice() + 50 + Math.round((getTotalPrice() + 50) * 0.05)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#008BD0] hover:bg-[#0077B5] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span>Pay with Razorpay</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded text-sm">
                  ₹{getTotalPrice() + 50 + Math.round((getTotalPrice() + 50) * 0.05)}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodMenu;
