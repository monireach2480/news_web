// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
  // ========== SEARCH FUNCTIONALITY ==========
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  
  // Function to filter articles on current page
  function filterArticles() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    // Select all article cards and featured articles (news items)
    const articles = document.querySelectorAll('.article-card, .featured-article');
    let hasResults = false;
    
    articles.forEach(article => {
      const text = article.innerText.toLowerCase();
      if (query === '' || text.includes(query)) {
        article.style.display = '';
        hasResults = true;
      } else {
        article.style.display = 'none';
      }
    });
    
    // Show/hide no-results message
    let noResultsMsg = document.querySelector('.no-results');
    if (!hasResults && query !== '') {
      if (!noResultsMsg) {
        const container = document.querySelector('.article-grid, .dashboard-grid');
        if (container) {
          noResultsMsg = document.createElement('div');
          noResultsMsg.className = 'no-results';
          noResultsMsg.textContent = '🔍 No matching articles found. Try a different keyword.';
          container.parentNode.insertBefore(noResultsMsg, container.nextSibling);
        }
      } else {
        noResultsMsg.style.display = 'block';
      }
    } else if (noResultsMsg) {
      noResultsMsg.style.display = 'none';
    }
  }
  
  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', filterArticles);
    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') filterArticles();
    });
  }
  
  // ========== CONTACT FORM VALIDATION ==========
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const subject = document.getElementById('subject')?.value;
      const message = document.getElementById('message')?.value.trim();
      
      if (!name || !email || !subject || !message) {
        alert('Please fill in all required fields (*).');
        return;
      }
      if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address.');
        return;
      }
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
  }
  
  // ========== BACK TO TOP BUTTON ==========
  const backBtn = document.createElement('button');
  backBtn.innerHTML = '↑';
  backBtn.className = 'back-to-top';
  backBtn.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backBtn);
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backBtn.classList.add('show');
    } else {
      backBtn.classList.remove('show');
    }
  });
  
  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // ========== DYNAMIC COPYRIGHT YEAR ==========
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  
  // ========== TRENDING DATA (mock) ==========
  // If on homepage, inject trending topics dynamically (avoid duplication)
  const trendingContainer = document.getElementById('trending-container');
  if (trendingContainer) {
    const trendingTopics = [
      { title: "Vercel Breach: OAuth Token Theft", link: "cybersecurity.html" },
      { title: "AI Power Consumption Estimator", link: "ai.html" },
      { title: "CISA Adds New Vulnerability", link: "cybersecurity.html" },
      { title: "OpenAI Workspace Agents", link: "ai.html" }
    ];
    trendingContainer.innerHTML = trendingTopics.map(topic => `
      <div class="trending-item">
        <h4><a href="${topic.link}">🔥 ${topic.title}</a></h4>
      </div>
    `).join('');
  }
});