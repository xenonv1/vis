<template>
  <div>
    <div class="button-container">
      <button @click="handleClick">Refresh</button>
    </div>
    <div class="table-container" style="margin-top: 35px">
      <table :class="{ 'table-active': isActive }">
        <tbody>
          <th>Products</th>
          <tr>
            <td>
              <div class="data-container">
                <pre id="productsSourceCode">{{ productsSourceCode }}</pre>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <table :class="{ 'table-active': isActive }">
        <tbody>
          <th>Services</th>
          <tr>
            <td>
              <div class="data-container">
              <pre id="servicesSourceCode">{{ servicesSourceCode }}</pre>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <table :class="{ 'table-active': isActive }">
        <tbody>
          <th>Skills</th>
          <tr>
            <td>
              <div class="data-container">
              <pre id="skillsSourceCode">{{ skillsSourceCode }}</pre>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <table :class="{ 'table-active': isActive }">
        <tbody>
          <th>Incidents</th>
          <tr>
            <td>
              <div class="data-container">
              <pre id="incidentsSourceCode">{{ incidentsSourceCode }}</pre>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <table :class="{ 'table-active': isActive }">
        <tbody>
          <th>Planning</th>
          <tr>
            <td>
              <div class="data-container">
              <pre id="planningSourceCode">{{ planningSourceCode }}</pre>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <table :class="{ 'table-active': isActive }">
        <tbody>
          <th>Technicians</th>
          <tr>
            <td>
              <div class="data-container">
              <pre id="techniciansSourceCode">{{ techniciansSourceCode }}</pre>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <table :class="{ 'table-active': isActive }">
        <tbody>
          <th>Orders</th>
          <tr>
            <td>
              <div class="data-container">
              <pre id="ordersSourceCode">{{ ordersSourceCode }}</pre>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <table :class="{ 'table-active': isActive }">
        <tbody>
          <th>Carts</th>
          <tr>
            <td>
              <div class="data-container">
              <pre id="cartsSourceCode">{{ cartsSourceCode }}</pre>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <table :class="{ 'table-active': isActive }">
        <tbody>
          <th>Customers</th>
          <tr>
            <td>
              <div class="data-container">
              <pre id="customersSourceCode">{{ customersSourceCode }}</pre>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <table :class="{ 'table-active': isActive }">
        <tbody>
          <th>Adresses</th>
          <tr>
            <td>
              <div class="data-container">
              <pre id="adressesSourceCode">{{ adressesSourceCode }}</pre>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <table :class="{ 'table-active': isActive }">
        <tbody>
          <th>Users</th>
          <tr>
            <td>
              <div class="data-container">
              <pre id="usersSourceCode">{{ usersSourceCode }}</pre>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
      servicesSourceCode: '',
      skillsSourceCode: '',
      incidentsSourceCode: '',
      planningSourceCode:'',
      techniciansSourceCode:'',
      ordersSourceCode:'',
      cartsSourceCode:'',
      customersSourceCode:'',
      adressesSourceCode:'',
      usersSourceCode:''
    }
  },
  created() {
    this.fetchProductsSourceCode()
    this.fetchServicesSourceCode()
    this.fetchSkillsSourceCode()
    this.fetchIncidentsSourceCode()
    this.fetchPlanningSourceCode()
    this.fetchTechniciansSourceCode()
    this.fetchOrdersSourceCode()
    this.fetchCartsSourceCode()
    this.fetchCustomersSourceCode()
    this.fetchAdressesSourceCode()
    this.fetchUsersSourceCode()
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
      const config = {
        headers:{
          'team-name': 'neverovertime',
          'team-endpoint': 'products'
        }
      }
      try {
        const response = await axios.get('http://192.168.0.100:8000/v2/distributor', config)
        this.productsSourceCode = JSON.stringify(response.data, null, 2)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async fetchServicesSourceCode() {
      const config = {
        headers:{
          'team-name': 'neverovertime',
          'team-endpoint': 'services'
        }
      }
      try {
        const response = await axios.get('http://192.168.0.100:8000/v2/distributor', config)
        this.servicesSourceCode = JSON.stringify(response.data, null, 2)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching services source code:', error)
      }
    },
    async fetchSkillsSourceCode() {
      const config = {
        headers:{
          'team-name': '404',
          'team-endpoint': 'skills'
        }
      }
      try {
        const response = await axios.get('http://192.168.0.100:8000/v2/distributor', config)
        this.skillsSourceCode = JSON.stringify(response.data, null, 2)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching services source code:', error)
      }
    },
    async fetchIncidentsSourceCode() {
      const config = {
        headers:{
          'team-name': '404',
          'team-endpoint': 'incidents'
        }
      }
      try {
        const response = await axios.get('http://192.168.0.100:8000/v2/distributor', config)
        this.incidentsSourceCode = JSON.stringify(response.data, null, 2)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching services source code:', error)
      }
    },
    async fetchPlanningSourceCode() {
      const config = {
        headers:{
          'team-name': '404',
          'team-endpoint': 'planning'
        }
      }
      try {
        const response = await axios.get('http://192.168.0.100:8000/v2/distributor', config)
        this.planningSourceCode = JSON.stringify(response.data, null, 2)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching services source code:', error)
      }
    },
    async fetchTechniciansSourceCode() {
      const config = {
        headers:{
          'team-name': '404',
          'team-endpoint': 'technicians'
        }
      }
      try {
        const response = await axios.get('http://192.168.0.100:8000/v2/distributor', config)
        this.techniciansSourceCode = JSON.stringify(response.data, null, 2)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching services source code:', error)
      }
    },
    async fetchOrdersSourceCode() {
      const config = {
        headers:{
          'team-name': 'pizza',
          'team-endpoint': 'orders'
        }
      }
      try {
        const response = await axios.get('http://192.168.0.100:8000/v2/distributor', config)
        this.ordersSourceCode = JSON.stringify(response.data, null, 2)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching services source code:', error)
      }
    },
    async fetchCartsSourceCode() {
      const config = {
        headers:{
          'team-name': 'pizza',
          'team-endpoint': 'carts'
        }
      }
      try {
        const response = await axios.get('http://192.168.0.100:8000/v2/distributor', config)
        this.cartsSourceCode = JSON.stringify(response.data, null, 2)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching services source code:', error)
      }
    },
    async fetchCustomersSourceCode() {
      const config = {
        headers:{
          'team-name': 'colada',
          'team-endpoint': 'customers'
        }
      }
      try {
        const response = await axios.get('http://192.168.0.100:8000/v2/distributor', config)
        this.customersSourceCode = JSON.stringify(response.data, null, 2)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching services source code:', error)
      }
    },
    async fetchAdressesSourceCode() {
      const config = {
        headers:{
          'team-name': 'colada',
          'team-endpoint': 'adresses'
        }
      }
      try {
        const response = await axios.get('http://192.168.0.100:8000/v2/distributor', config)
        this.adressesSourceCode = JSON.stringify(response.data, null, 2)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching services source code:', error)
      }
    },
    async fetchUsersSourceCode() {
      const config = {
        headers:{
          'team-name': 'colada',
          'team-endpoint': 'users'
        }
      }
      try {
        const response = await axios.get('http://192.168.0.100:8000/v2/distributor', config)
        this.usersSourceCode = JSON.stringify(response.data, null, 2)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching services source code:', error)
      }
    },
    handleClick() {
      this.fetchProductsSourceCode()
      this.fetchServicesSourceCode()
      this.fetchSkillsSourceCode()
      this.fetchIncidentsSourceCode()
      this.fetchplanningSourceCode()
      this.fetchTechniciansSourceCode()
      this.fetchOrdersSourceCode()
      this.fetchCartsSourceCode()
      this.fetchCustomersSourceCode()
      this.fetchAdressesSourceCode()
      this.fetchUsersSourceCode()
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

.data-container {
  max-height: 85vh;
  overflow-y: auto;
}

table {
  float: left;
  width: 33%;
  max-height: 50vh;
  border: 2px solid black;
}

#productsSourceCode,
#servicesSourceCode,
#skillsSourceCode,
#incidentsSourceCode,
#planningSourceCode,
#techniciansSourceCode,
#ordersSourceCode,
#cartsSourceCode,
#customersSourceCode,
#adressesSourceCode,
#usersSourceCode {
  font-family: 'Courier New', monospace;
  font-size: 14px;
  font-weight: 800;
  white-space: pre-wrap;
  word-wrap: break-word;
  max-height: 80%;
  overflow-y: auto;
  overflow-x: auto;
}

.table-active {
  background-color: rgb(255, 255, 255);
}
</style>
