import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Gem, Sparkles, Send, Heart, Star, Crown } from "lucide-react";

const EmojiFlower = ({ emoji, className }) => (
  <svg className={className} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="text-4xl">{emoji}</text>
  </svg>
);

const initialFlowers = [
  { id: 1, emoji: "🌸", name: "Cherry Blossom", meaning: "New beginnings & renewal", price: 20, owned: true, rarity: "Common", affirmation: "May today bring you fresh starts and gentle growth 🌸" },
  { id: 2, emoji: "🌺", name: "Hibiscus", meaning: "Delicate beauty", price: 30, owned: true, rarity: "Common", affirmation: "You are seen, you are valued, you are beautiful 🌺" },
  { id: 3, emoji: "🌻", name: "Sunflower", meaning: "Adoration & loyalty", price: 50, owned: false, rarity: "Rare", affirmation: "Let your heart follow the light and bloom with joy 🌻" },
  { id: 4, emoji: "🌹", name: "Rose", meaning: "Deep love & passion", price: 20, owned: false, rarity: "Common", affirmation: "Love surrounds you and flows through you like a rose 🌹" },
  { id: 5, emoji: "🪷", name: "Lotus", meaning: "Spiritual growth", price: 120, owned: false, rarity: "Legendary", affirmation: "Rise above challenges and find peace within 🪷" },
  { id: 6, emoji: "🌷", name: "Tulip", meaning: "Perfect love", price: 40, owned: true, rarity: "Common", affirmation: "May love and harmony fill your heart today 🌷" },
];

const FlowerPage = () => {
  // Centralized state with localStorage persistence
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem('flowerGarden');
    return saved ? { ...JSON.parse(saved), lastUpdated: Date.now() } : {
      flowers: initialFlowers,
      balance: 250,
      feed: [],
      transactions: [], // Purchase/sale history
    };
  });

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem('flowerGarden', JSON.stringify(state));
  }, [state]);

  const [uiState, setUiState] = useState({
    selectedFlower: null,
    message: "",
    isSending: false,
    showFlowerShop: false,
    isProcessingPurchase: false,
    showTransactionHistory: false,
  });

  // Memoized handlers for better performance
  const updateFlowers = useCallback((updater) => {
    setState(prev => ({ ...prev, flowers: updater(prev.flowers) }));
  }, []);

  const addTransaction = useCallback((type, flower, amount) => {
    setState(prev => ({
      ...prev,
      transactions: [{
        id: Date.now(),
        type,
        flower,
        amount,
        timestamp: new Date().toISOString(),
      }, ...prev.transactions.slice(0, 49)] // Keep last 50 transactions
    }));
  }, []);

  const handleSelectFlower = useCallback((flower) => {
    setUiState(prev => ({
      ...prev,
      selectedFlower: flower,
      message: flower.affirmation,
    }));
  }, []);

  const handleBuyFlower = useCallback(async (flower) => {
    if (state.balance < flower.price || state.flowers.find(f => f.id === flower.id)?.owned) {
      return;
    }

    setUiState(prev => ({ ...prev, isProcessingPurchase: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setState(prev => {
      const newBalance = prev.balance - flower.price;
      addTransaction('purchase', flower, flower.price);
      
      return {
        ...prev,
        balance: newBalance,
        flowers: prev.flowers.map(f => 
          f.id === flower.id ? { ...f, owned: true } : f
        ),
      };
    });

    setUiState(prev => ({ ...prev, isProcessingPurchase: false }));
  }, [state.balance, state.flowers, addTransaction]);

  const handleSellFlower = useCallback(async (flower) => {
    if (!state.flowers.find(f => f.id === flower.id)?.owned) return;

    setUiState(prev => ({ ...prev, isProcessingPurchase: true }));
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const sellPrice = Math.floor(flower.price * 0.8); // 80% resale value
    
    setState(prev => {
      addTransaction('sale', flower, sellPrice);
      
      return {
        ...prev,
        balance: prev.balance + sellPrice,
        flowers: prev.flowers.map(f => 
          f.id === flower.id ? { ...f, owned: false } : f
        ),
      };
    });

    setUiState(prev => ({ ...prev, isProcessingPurchase: false }));
  }, [state.balance, state.flowers, addTransaction]);

  const handleSendFlower = useCallback(() => {
    if (!uiState.selectedFlower || !uiState.message.trim()) return;
    
    setUiState(prev => ({ ...prev, isSending: true }));
    
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        feed: [{
          id: Date.now(),
          flower: uiState.selectedFlower,
          message: uiState.message,
          timestamp: new Date().toISOString(),
        }, ...prev.feed.slice(0, 24)], // Keep last 25 posts
      }));
      
      setUiState({
        selectedFlower: null,
        message: "",
        isSending: false,
        showFlowerShop: false,
      });
    }, 1000);
  }, [uiState.selectedFlower, uiState.message]);

  const ownedFlowers = state.flowers.filter(f => f.owned);
  const availableFlowers = state.flowers.filter(f => !f.owned);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-3 bg-white/50 backdrop-blur-sm rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center gap-2">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                My Flower Garden 🌸
              </h1>
              <p className="text-gray-600">
                {ownedFlowers.length}/{state.flowers.length} flowers • {state.feed.length} kindness shared
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/70 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/50">
            <Gem className="w-4 h-4 text-yellow-500" />
            {state.balance.toLocaleString()} KSH
            <div className="flex items-center gap-2 ml-3">
              <button
                onClick={() => setUiState(prev => ({ ...prev, showFlowerShop: !prev.showFlowerShop }))}
                className="p-2 hover:bg-pink-100 rounded-xl transition-colors flex items-center gap-1 text-pink-600 hover:text-pink-700"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
              <button
                onClick={() => setUiState(prev => ({ ...prev, showTransactionHistory: !prev.showTransactionHistory }))}
                className="p-2 hover:bg-blue-100 rounded-xl transition-colors flex items-center gap-1 text-blue-600 hover:text-blue-700"
                title="Transaction History"
              >
                <Star className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Garden & Shop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Your Garden */}
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 backdrop-blur-xl rounded-3xl p-6 border border-emerald-200/50">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              🌱 Your Garden ({ownedFlowers.length}/{state.flowers.length})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {ownedFlowers.map(flower => (
                <div key={flower.id} className="relative group">
                  <button
                    onClick={() => handleSelectFlower(flower)}
                    className={`aspect-square p-3 rounded-xl shadow-md hover:shadow-xl transition-all w-full flex flex-col items-center justify-center ${
                      uiState.selectedFlower?.id === flower.id 
                        ? 'bg-gradient-to-br from-pink-100 to-rose-100 ring-2 ring-pink-400' 
                        : 'bg-white hover:bg-pink-50'
                    }`}
                  >
                    <EmojiFlower emoji={flower.emoji} className="w-16 h-16 animate-float" />
                    <span className="mt-2 text-sm font-semibold text-gray-700">{flower.name}</span>
                    <span className="text-xs text-gray-500">{flower.rarity}</span>
                  </button>
                  <button
                    onClick={() => handleSellFlower(flower)}
                    disabled={uiState.isProcessingPurchase}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full text-xs shadow-lg opacity-0 group-hover:opacity-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    title={`Sell for ${Math.floor(flower.price * 0.8)} KSH`}
                  >
                    💰
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Flower Shop */}
          {uiState.showFlowerShop && (
            <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-6 shadow-xl border border-pink-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🌸 Flower Shop</h3>
              <div className="space-y-3">
                {availableFlowers.map(flower => (
                  <div key={flower.id} className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-md flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <EmojiFlower emoji={flower.emoji} className="w-14 h-14 animate-float" />
                      <div>
                        <div className="font-semibold text-gray-800">{flower.name}</div>
                        <div className="text-sm text-gray-500">{flower.meaning}</div>
                        <div className={`text-xs px-2 py-1 rounded-full font-medium ${
                          flower.rarity === 'Legendary' ? 'bg-purple-100 text-purple-800' :
                          flower.rarity === 'Rare' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {flower.rarity}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleBuyFlower(flower)}
                      disabled={state.balance < flower.price || uiState.isProcessingPurchase}
                      className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      {uiState.isProcessingPurchase ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        `Plant ${flower.price} KSH`
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Send Flower Section */}
        {uiState.selectedFlower && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 backdrop-blur-xl rounded-3xl p-6 border border-pink-200/50 shadow-md flex items-center gap-4">
              <EmojiFlower emoji={uiState.selectedFlower.emoji} className="w-16 h-16" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">{uiState.selectedFlower.name}</h2>
                <p className="text-pink-600 flex items-center gap-1"><Sparkles className="w-4 h-4" />{uiState.selectedFlower.meaning}</p>
              </div>
            </div>
            <textarea
              value={uiState.message}
              onChange={(e) => setUiState(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Write a kind message to the world..."
              className="w-full p-5 rounded-2xl bg-gradient-to-br from-white to-pink-50 border-2 border-pink-200 focus:outline-none focus:ring-4 focus:ring-pink-100 resize-none min-h-[120px] text-lg placeholder-gray-400 transition-all"
              maxLength={280}
            />
            <div className="text-right text-sm text-gray-500">{uiState.message.length}/280</div>
            <button
              onClick={handleSendFlower}
              disabled={!uiState.message.trim() || uiState.isSending}
              className={`w-full py-4 rounded-3xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg ${
                uiState.message.trim() && !uiState.isSending 
                  ? "bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white hover:shadow-2xl hover:scale-[1.02]" 
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {uiState.isSending ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-6 h-6" /> Send Flower 🌸
                </>
              )}
            </button>
          </div>
        )}

        {/* Transaction History */}
        {uiState.showTransactionHistory && state.transactions.length > 0 && (
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-md border border-white/50">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Recent Transactions</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {state.transactions.slice(0, 10).map(tx => (
                <div key={tx.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl text-sm">
                  <div className="flex items-center gap-3">
                    <EmojiFlower emoji={tx.flower.emoji} className="w-8 h-8" />
                    <div>
                      <div className="font-medium">{tx.flower.name}</div>
                      <div className="text-gray-500 text-xs">
                        {new Date(tx.timestamp).toLocaleDateString()} • {tx.type === 'purchase' ? 'Bought' : 'Sold'}
                      </div>
                    </div>
                  </div>
                  <span className={`font-bold px-2 py-1 rounded-full text-xs ${
                    tx.type === 'purchase' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {tx.type === 'purchase' ? `-${tx.amount}` : `+${tx.amount}`} KSH
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Flower Feed */}
        {state.feed.length > 0 && (
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-md border border-white/50">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">🌼 Kindness Wall ({state.feed.length})</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {state.feed.map(item => (
                <div key={item.id} className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-2xl shadow-sm flex items-start gap-3">
                  <EmojiFlower emoji={item.flower.emoji} className="w-10 h-10 animate-float flex-shrink-0 mt-1" />
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-700 text-sm leading-relaxed">{item.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlowerPage;
