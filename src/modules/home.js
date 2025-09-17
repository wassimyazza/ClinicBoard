export function homeRander(){
    const app = document.getElementById('result');
    app.innerHTML = `<style>
.home-container {
    padding: 60px 40px;
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
    min-height: 80vh;
}

.home-content {
    max-width: 500px;
}

.home-title {
    font-size: 48px;
    font-weight: bold;
    color: #374151;
    line-height: 1.2;
    margin-bottom: 20px;
}

.home-title-blue {
    color: #3b82f6;
}

.home-description {
    font-size: 18px;
    color: #6b7280;
    line-height: 1.6;
    margin-bottom: 30px;
}

.home-image-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.home-image {
    width: 100%;
    max-width: 500px;
    border-radius: 16px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.consultant-badge {
    position: absolute;
    bottom: 20px;
    right: 20px;
    background: white;
    padding: 15px 20px;
    border-radius: 12px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 10px;
}

.consultant-icon {
    width: 24px;
    height: 24px;
    color: #3b82f6;
}

.consultant-text {
    color: #3b82f6;
    font-weight: 600;
    font-size: 16px;
}

.consultant-subtext {
    color: #6b7280;
    font-size: 12px;
    margin-top: 2px;
}

@media (max-width: 768px) {
    .home-container {
        grid-template-columns: 1fr;
        gap: 40px;
        padding: 40px 20px;
        text-align: center;
    }
    
    .home-title {
        font-size: 36px;
    }
}
</style>

<div class="home-container">
    <div class="home-content">
        <h1 class="home-title">
            Make an appointment<br>
            <span class="home-title-blue">easy</span> and <span class="home-title-blue">fast</span>
        </h1>
        <p class="home-description">
            Checking your family health by professional team doctors with complete and modern facilities services.
        </p>
    </div>
    
    <div class="home-image-container">
        <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=400&fit=crop&auto=format" alt="Medical Team" class="home-image">
        
        <div class="consultant-badge">
            <svg class="consultant-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            <div>
                <div class="consultant-text">Consultant</div>
                <div class="consultant-subtext">First consultant is<br>totally free</div>
            </div>
        </div>
    </div>
</div>`;

}