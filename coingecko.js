// Existing tab-switching code (if still needed)
function showTab(tabId) {
    document.querySelectorAll('.account-form').forEach(form => form.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    document.querySelector(`.tab-button[onclick="showTab('${tabId}')"]`).classList.add('active');
  }
  
  // Display user email on wallet page
  document.addEventListener('DOMContentLoaded', () => {
    const userEmail = localStorage.getItem('currentUser');
    if (userEmail) {
      document.getElementById('user-email').textContent = userEmail;
    }
  
    // Fetch real-time prices from CoinGecko
    fetchCryptoPrices();
  });
  
  // Function to fetch and display crypto prices
  function fetchCryptoPrices() {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,ripple,binancecoin,solana,usd-coin,dogecoin&vs_currencies=usd';
    
    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        // Update prices in the DOM
        document.getElementById('btc-price').textContent = `$${data.bitcoin.usd.toLocaleString()} USD`;
        document.getElementById('eth-price').textContent = `$${data.ethereum.usd.toLocaleString()} USD`;
        document.getElementById('usdt-price').textContent = `$${data.tether.usd.toLocaleString()} USD`;
        document.getElementById('xrp-price').textContent = `$${data.ripple.usd.toLocaleString()} USD`;
        document.getElementById('bnb-price').textContent = `$${data.binancecoin.usd.toLocaleString()} USD`;
        document.getElementById('sol-price').textContent = `$${data.solana.usd.toLocaleString()} USD`;
        document.getElementById('usd-price').textContent = `$${data['usd-coin'].usd.toLocaleString()} USD`;
        document.getElementById('doge-price').textContent = `$${data.dogecoin.usd.toLocaleString()} USD`;
      })
      .catch(error => {
        console.error('Error fetching prices:', error);
        document.getElementById('btc-price').textContent = 'Error';
        document.getElementById('eth-price').textContent = 'Error';
        document.getElementById('usdt-price').textContent = 'Error';
        document.getElementById('xrp-price').textContent = 'Error';
        document.getElementById('bnb-price').textContent = 'Error';
        document.getElementById('sol-price').textContent = 'Error';
        document.getElementById('usd-price').textContent = 'Error';
        document.getElementById('doge-price').textContent = 'Error';
      });
  }
  
  // Optional: Refresh prices every 30 seconds
  setInterval(fetchCryptoPrices, 30000);