const PAGE_SIZE = 6;
let currentPage = 1;

export function getCurrentPage() {
  return currentPage;
}

export function setCurrentPage(page) {
  currentPage = page;
}

export function getPageSize() {
  return PAGE_SIZE;
}

export function renderPagination(totalItems, callback) {
  const pages = Math.ceil(totalItems / PAGE_SIZE);
  const paginationContainer = document.querySelector('.catalog__pagination');
  
  if (!paginationContainer) return;
  
  paginationContainer.innerHTML = '';
  
  if (pages <= 1) {
    return;
  }
  
  for (let i = 1; i <= pages; i++) {
    const li = document.createElement('li');
    li.className = 'catalog__pagination-item';
    
    const button = document.createElement('button');
    button.className = 'catalog__pagination-link';
    button.textContent = i;
    button.dataset.page = i;
    
    if (i === currentPage) {
      button.classList.add('catalog__pagination-link--active');
    }
    
    button.addEventListener('click', () => {
      setCurrentPage(i);
      callback(i);
    });
    
    li.appendChild(button);
    paginationContainer.appendChild(li);
  }
}

export function getSlice(products) {
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  return products.slice(start, end);
}
