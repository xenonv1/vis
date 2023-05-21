<template>
  <div>
    <div class="button-container">
      <button @click="handleClick">Refresh</button>
    </div>
    <div class="table-container" style="margin-top: 35px">
      <table :class="{ 'table-active': isActive }">
        <caption>
          Products
        </caption>
        <tbody>
          <tr>
            <td>
              <pre id="productsSourceCode">{{ productsSourceCode }}</pre>
            </td>
          </tr>
        </tbody>
      </table>
      <table :class="{ 'table-active': isActive }">
        <caption>
          Services
        </caption>
        <tbody>
          <tr>
            <td>
              <pre id="servicesSourceCode">{{ servicesSourceCode }}</pre>
            </td>
          </tr>
        </tbody>
      </table>
      <table :class="{ 'table-active': isActive }"></table>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      isActive: false,
      productsSourceCode: '',
      servicesSourceCode: ''
    }
  },
  created() {
    this.fetchProductsSourceCode()
    this.fetchServicesSourceCode()
  },
  computed: {
    tableClasses() {
      return {
        'table-active': this.isActive
      }
    }
  },
  methods: {
    async fetchProductsSourceCode() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/v2/products')
        this.productsSourceCode = JSON.stringify(response.data, null, 2)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async fetchServicesSourceCode() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/v2/services')
        this.servicesSourceCode = JSON.stringify(response.data, null, 2)
      } catch (error) {
        console.error('Error fetching services source code:', error)
      }
    },
    handleClick() {
      this.fetchProductsSourceCode()
      this.fetchServicesSourceCode()
      alert('Data refreshed')
    }
  }
}
</script>
<style>
html,
body {
  height: 100%;
  color: black;
  background-color: white;
}

.button-container {
  position: fixed;
  top: 1%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.table-container {
  display: flex;
  height: 100%;
  gap: 1px;
}

table {
  float: left;
  width: 33%;
  height: 80%;
  border: 2px solid black;
}

#productsSourceCode,
#servicesSourceCode {
  font-family: 'Courier New', monospace;
  font-size: 14px;
  font-weight: 800;
  white-space: pre-wrap;
  word-wrap: break-word;
  height: 80%;
  overflow-y: auto;
}

.table-active {
  background-color: yellow;
}
</style>
