// Function to switch between tabs (Deliveries, Inventory, Orders)
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
  
    // Display the selected tab
    document.getElementById(tabName).classList.add('active');
  }
  
  // Global variables to store the fetched data
  let ordersData = [];
  let deliveriesData = [];
  let inventoryData = [];
  
  // Fetch data and store it in the global variables
  function fetchData() {
    // Fetch deliveries data
    fetch('/api/deliveries')
      .then(response => response.json())
      .then(data => {
        deliveriesData = data;
        populateTable('deliveries', data);
        document.getElementById('total-deliveries').textContent = data.length;
      });
  
    // Fetch inventory data
    fetch('/api/inventory')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        inventoryData = data;
        populateTable('inventory', data);
        document.getElementById('total-inventory').textContent = data.length;
      });
  
    // Fetch orders data
    fetch('/api/orders')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        ordersData = data;
        populateTable('orders', data);
        document.getElementById('total-orders').textContent = data.length;
      });
  }
  
  // Function to populate the tables with data
  function populateTable(type, data) {
    let table;
  
    if (type === 'orders') {
      table = document.getElementById('orders-table').getElementsByTagName('tbody')[0];
      table.innerHTML = ''; // Clear existing rows
      data.forEach(order => {
        let row = table.insertRow();
        row.insertCell(0).textContent = order.orderId;
        row.insertCell(1).textContent = order.customerName;
        row.insertCell(2).textContent = order.product;
        row.insertCell(3).textContent = order.quantity;
        row.insertCell(4).textContent = order.status;
        
      });
    }
  
    if (type === 'deliveries') {
      table = document.getElementById('deliveries-table').getElementsByTagName('tbody')[0];
      table.innerHTML = ''; // Clear existing rows
      data.forEach(delivery => {
        let row = table.insertRow();
        row.insertCell(0).textContent = delivery.trackingId;
        row.insertCell(1).textContent = delivery.orderId;
        row.insertCell(2).textContent = delivery.status;
        row.insertCell(3).textContent = delivery.location;
        row.insertCell(4).textContent = delivery.expectedDelivery;
      });
    }
  
    if (type === 'inventory') {
      table = document.getElementById('inventory-table').getElementsByTagName('tbody')[0];
      table.innerHTML = ''; // Clear existing rows
      data.forEach(product => {
        let row = table.insertRow();
        row.insertCell(0).textContent = product.productId;
        row.insertCell(1).textContent = product.productName;
        row.insertCell(2).textContent = product.stock;
        row.insertCell(3).textContent = product.price;
      });
    }
  }
  
  // Function to search orders by Order ID
  function searchOrder() {
    const searchId = document.getElementById('search-order-id').value.toLowerCase();
    const filteredOrders = ordersData.filter(order => order.orderId.toLowerCase().includes(searchId));
    populateTable('orders', filteredOrders);
  }
  
  // Function to search deliveries by Delivery ID (Tracking ID)
  function searchDelivery() {
    const searchId = document.getElementById('search-delivery-id').value.toLowerCase();
    const filteredDeliveries = deliveriesData.filter(delivery => delivery.trackingId.toLowerCase().includes(searchId));
    populateTable('deliveries', filteredDeliveries);
  }
  
  // Function to search inventory by Product ID
  function searchInventory() {
    const searchId = document.getElementById('search-inventory-id').value.toLowerCase();
    const filteredInventory = inventoryData.filter(product => product.productId.toLowerCase().includes(searchId));
    populateTable('inventory', filteredInventory);
  }
  
  // Modal functionality
  function openForm(type) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const formFields = document.getElementById('form-fields');
  
    // Show modal
    modal.classList.remove('hidden');
  
    // Set form fields dynamically
    formFields.innerHTML = '';
    if (type === 'orderForm') {
      modalTitle.textContent = 'Add Order';
      formFields.innerHTML = `
        <label for="orderId">Order ID</label>
        <input type="text" id="orderId" required />
        <label for="customerName">Customer Name</label>
        <input type="text" id="customerName" required />
        <label for="productName">Product</label>
        <input type="text" id="productName" required />
        <label for="quantity">Quantity</label>
        <input type="number" id="quantity" required />
        <label for="status">Status</label>
        <input type="text" id="status" required />
      `;
    } else if (type === 'deliveryForm') {
      modalTitle.textContent = 'Add Delivery';
      formFields.innerHTML = `
        <label for="trackingId">Tracking ID</label>
        <input type="text" id="trackingId" required />
        <label for="orderId">Order ID</label>
        <input type="text" id="orderId" required />
        <label for="status">Status</label>
        <input type="text" id="status" required />
        <label for="location">Location</label>
        <input type="text" id="location" required />
        <label for="expectedDelivery">Expected Delivery</label>
        <input type="date" id="expectedDelivery" required />
      `;
    } else if (type === 'inventoryForm') {
      modalTitle.textContent = 'Add Product';
      formFields.innerHTML = `
        <label for="productId">Product ID</label>
        <input type="text" id="productId" required />
        <label for="productName">Product Name</label>
        <input type="text" id="productName" required />
        <label for="quantity">Quantity</label>
        <input type="number" id="quantity" required />
        <label for="price">Price</label>
        <input type="number" id="price" required />
      `;
    }
  }
  
  function closeForm() {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
  }
  
  // Initialize data on page load
  document.addEventListener('DOMContentLoaded', fetchData);
  