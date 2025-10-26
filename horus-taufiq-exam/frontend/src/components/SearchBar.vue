<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="searchQuery"
      @input="handleSearch"
      placeholder="Cari berdasarkan nama atau username..."
      class="search-input"
    >
    <button @click="handleSearch" class="search-button">
      Cari
    </button>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      searchQuery: this.modelValue
    }
  },

  watch: {
    modelValue (newValue) {
      this.searchQuery = newValue
    }
  },

  methods: {
    handleSearch () {
      this.$emit('update:modelValue', this.searchQuery)
      this.$emit('search', this.searchQuery)
    }
  }
}
</script>

<style scoped>
.search-bar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.search-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
}

.search-button {
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #0056b3;
}
</style>
