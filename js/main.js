// ========================================
// SMOOTH SCROLLING
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 14, 26, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 10px rgba(180, 255, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 14, 26, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// CALORIE CALCULATOR
// ========================================
function calculateCalories() {
    const weight = parseFloat(document.getElementById('weight').value);
    const duration = parseInt(document.getElementById('duration').value);
    
    // Validation
    if (!weight || weight <= 0 || weight > 300) {
        showAlert('올바른 몸무게를 입력해주세요. (1-300kg)');
        return;
    }
    
    // 트램폴린 운동 칼로리 계산
    // 평균: 시간당 체중 × 12 kcal
    const caloriesPerKgPerHour = 12;
    const calories = Math.round((weight * caloriesPerKgPerHour * duration) / 60);
    
    // 조깅 환산 (시속 8km, 약 50 kcal/km)
    const distance = (calories / 50).toFixed(1);
    
    // 한 달 (20일) 감량 예상
    // 1kg 지방 = 약 7700 kcal
    const totalCalories = calories * 20;
    const fatLoss = (totalCalories / 7700).toFixed(1);
    
    // 결과 업데이트
    document.getElementById('caloriesResult').textContent = `${calories} kcal`;
    document.getElementById('distanceResult').textContent = `약 ${distance} km 조깅`;
    document.getElementById('fatLoss').textContent = `${fatLoss}kg`;
    
    // 결과 표시
    const resultsDiv = document.getElementById('results');
    resultsDiv.style.display = 'block';
    
    // 스크롤 애니메이션
    setTimeout(() => {
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// ========================================
// ALERT FUNCTION
// ========================================
function showAlert(message) {
    // 네온 스타일 알림창
    const alertDiv = document.createElement('div');
    alertDiv.className = 'custom-alert';
    alertDiv.innerHTML = `
        <div class="alert-content">
            <i class="fas fa-exclamation-triangle"></i>
            <p>${message}</p>
            <button onclick="this.parentElement.parentElement.remove()">확인</button>
        </div>
    `;
    
    // 스타일 추가
    alertDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    document.body.appendChild(alertDiv);
    
    // 3초 후 자동 제거
    setTimeout(() => {
        if (alertDiv.parentElement) {
            alertDiv.remove();
        }
    }, 3000);
}

// CSS for custom alert
if (!document.getElementById('custom-alert-style')) {
    const style = document.createElement('style');
    style.id = 'custom-alert-style';
    style.textContent = `
        .custom-alert .alert-content {
            background: #151921;
            border: 2px solid #b4ff00;
            border-radius: 20px;
            padding: 2rem;
            max-width: 400px;
            text-align: center;
            box-shadow: 0 0 30px rgba(180, 255, 0, 0.3);
        }
        
        .custom-alert .alert-content i {
            font-size: 3rem;
            color: #b4ff00;
            margin-bottom: 1rem;
            filter: drop-shadow(0 0 10px rgba(180, 255, 0, 0.6));
        }
        
        .custom-alert .alert-content p {
            color: #ffffff;
            margin-bottom: 1.5rem;
            font-size: 1.1rem;
        }
        
        .custom-alert .alert-content button {
            background: #b4ff00;
            color: #0a0e1a;
            border: none;
            padding: 0.8rem 2rem;
            border-radius: 25px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .custom-alert .alert-content button:hover {
            background: #c8ff33;
            box-shadow: 0 0 20px rgba(180, 255, 0, 0.5);
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// CONSULTATION HANDLER
// ========================================
function handleConsultation() {
    const message = `
        🌟 허그핏스타점핑 상담 문의
        
        📞 전화: 0507-1420-0735
        📍 주소: 군산 나은5길 16 2층
        ⏰ 운영시간: 평일 09:30 - 21:30
        
        ※ 주말은 사전 별도 문의 부탁드립니다.
    `;
    
    if (confirm(message.trim() + '\n\n전화 연결하시겠습니까?')) {
        window.location.href = 'tel:0507-1420-0735';
    }
}

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// ========================================
// INITIALIZE ANIMATIONS
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Fade in sections
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        fadeInObserver.observe(section);
    });
    
    // Card hover effects
    const cards = document.querySelectorAll('.why-card, .membership-card, .gallery-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// ========================================
// FORM INPUT VALIDATION
// ========================================
const weightInput = document.getElementById('weight');
if (weightInput) {
    weightInput.addEventListener('input', function() {
        const value = parseFloat(this.value);
        if (value < 1 || value > 300) {
            this.style.borderColor = '#ff0080';
        } else {
            this.style.borderColor = 'rgba(180, 255, 0, 0.2)';
        }
    });
}

// ========================================
// PARALLAX EFFECT
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBgImage = document.querySelector('.hero-bg-image');
    
    if (heroBgImage) {
        heroBgImage.style.transform = `translateY(${scrolled * 0.3}px) scale(1.1)`;
    }
});

// ========================================
// PREVENT FORM SUBMISSION ON ENTER
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.calculator-form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    });
    
    // Enter key to calculate
    const inputs = document.querySelectorAll('.form-input, .form-select');
    inputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                calculateCalories();
            }
        });
    });
});

// ========================================
// GALLERY IMAGE LOADING (for future use)
// ========================================
function loadGalleryImages(images) {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = '';
    
    images.forEach(image => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `<img src="${image.url}" alt="${image.alt}">`;
        galleryGrid.appendChild(item);
    });
}

// ========================================
// MOBILE MENU TOGGLE (for future implementation)
// ========================================
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('mobile-active');
}

// ========================================
// SMOOTH REVEAL ON LOAD
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// CONSOLE GREETING
// ========================================
console.log('%c허그핏스타점핑', 'color: #b4ff00; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px rgba(180, 255, 0, 0.8);');
console.log('%c나은동 No.1 다이어트 트램폴린 센터', 'color: #8b92a7; font-size: 14px;');
console.log('%c문의: 0507-1420-0735', 'color: #00d4ff; font-size: 12px;');