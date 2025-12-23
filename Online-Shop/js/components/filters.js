export function fillFilterCounts(products) {
  const checkboxes = document.querySelectorAll('.custom-checkbox__field');
  
  checkboxes.forEach(checkbox => {
    const value = checkbox.value;
    const count = products.filter(product => product.type.includes(value)).length;
    
    const countElement = checkbox.closest('.custom-checkbox').querySelector('.custom-checkbox__count');
    if (countElement) {
      countElement.textContent = count;
    }
  });
}

export function getFilteredProducts(products) {
  const selectedTypes = Array.from(document.querySelectorAll('.custom-checkbox__field:checked'))
    .map(input => input.value);
  

  const statusRadio = document.querySelector('.custom-radio__field:checked');
  const status = statusRadio ? statusRadio.value : 'all-item';
  
  let filtered = products.filter(product => {
    const typeMatch = selectedTypes.length === 0 || selectedTypes.some(type => product.type.includes(type));
    
    const stockMatch = status === 'instock' 
      ? Object.values(product.availability).some(count => count > 0)
      : true;
    
    return typeMatch && stockMatch;
  });
  
  return filtered;
}

export function getSortedProducts(products) {
  const sortSelect = document.querySelector('.catalog__sort-select');
  const sortValue = sortSelect ? sortSelect.value : 'price-min';
  
  const sorted = [...products];
  
  switch (sortValue) {
    case 'price-min':
      sorted.sort((a, b) => a.price.new - b.price.new);
      break;
    case 'price-max':
      sorted.sort((a, b) => b.price.new - a.price.new);
      break;
    case 'rating-max':
      sorted.sort((a, b) => b.rating - a.rating);
      break;
  }
  
  return sorted;
}

export function getFilteredAndSorted(products) {
  const filtered = getFilteredProducts(products);
  return getSortedProducts(filtered);
}
