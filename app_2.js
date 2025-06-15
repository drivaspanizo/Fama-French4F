// Portfolio Data
const assets = [
    {"symbol": "SPY", "name": "SPDR S&P 500 ETF", "mkt_rf": 0.98, "smb": -0.15, "hml": -0.05, "rmw": 0.02},
    {"symbol": "QQQ", "name": "Invesco QQQ ETF", "mkt_rf": 1.15, "smb": -0.25, "hml": -0.35, "rmw": 0.15},
    {"symbol": "IWM", "name": "iShares Russell 2000", "mkt_rf": 1.05, "smb": 0.85, "hml": 0.25, "rmw": -0.10},
    {"symbol": "AAPL", "name": "Apple Inc.", "mkt_rf": 1.20, "smb": -0.30, "hml": -0.20, "rmw": 0.25},
    {"symbol": "MSFT", "name": "Microsoft Corp.", "mkt_rf": 1.10, "smb": -0.28, "hml": -0.15, "rmw": 0.30},
    {"symbol": "GOOGL", "name": "Alphabet Inc.", "mkt_rf": 1.25, "smb": -0.20, "hml": -0.25, "rmw": 0.20},
    {"symbol": "AMZN", "name": "Amazon.com Inc.", "mkt_rf": 1.35, "smb": -0.15, "hml": -0.40, "rmw": 0.10},
    {"symbol": "META", "name": "Meta Platforms", "mkt_rf": 1.30, "smb": -0.18, "hml": -0.30, "rmw": 0.15},
    {"symbol": "TSLA", "name": "Tesla Inc.", "mkt_rf": 1.60, "smb": -0.10, "hml": -0.45, "rmw": 0.05},
    {"symbol": "NVDA", "name": "NVIDIA Corp.", "mkt_rf": 1.45, "smb": -0.22, "hml": -0.35, "rmw": 0.25},
    {"symbol": "JPM", "name": "JPMorgan Chase", "mkt_rf": 1.15, "smb": -0.25, "hml": 0.15, "rmw": 0.20},
    {"symbol": "JNJ", "name": "Johnson & Johnson", "mkt_rf": 0.75, "smb": -0.20, "hml": 0.25, "rmw": 0.35},
    {"symbol": "V", "name": "Visa Inc.", "mkt_rf": 1.05, "smb": -0.30, "hml": -0.10, "rmw": 0.40},
    {"symbol": "PG", "name": "Procter & Gamble", "mkt_rf": 0.65, "smb": -0.25, "hml": 0.20, "rmw": 0.30},
    {"symbol": "UNH", "name": "UnitedHealth Group", "mkt_rf": 1.00, "smb": -0.22, "hml": 0.05, "rmw": 0.25},
    {"symbol": "XLF", "name": "Financial Select SPDR", "mkt_rf": 1.20, "smb": -0.10, "hml": 0.30, "rmw": 0.15},
    {"symbol": "XLK", "name": "Technology Select SPDR", "mkt_rf": 1.25, "smb": -0.30, "hml": -0.25, "rmw": 0.20},
    {"symbol": "XLE", "name": "Energy Select SPDR", "mkt_rf": 1.30, "smb": 0.10, "hml": 0.45, "rmw": -0.15},
    {"symbol": "XLV", "name": "Health Care SPDR", "mkt_rf": 0.85, "smb": -0.20, "hml": 0.10, "rmw": 0.30},
    {"symbol": "XLI", "name": "Industrial SPDR", "mkt_rf": 1.10, "smb": 0.05, "hml": 0.20, "rmw": 0.10},
    {"symbol": "XLY", "name": "Consumer Disc. SPDR", "mkt_rf": 1.20, "smb": -0.05, "hml": -0.15, "rmw": 0.05},
    {"symbol": "XLP", "name": "Consumer Staples SPDR", "mkt_rf": 0.70, "smb": -0.15, "hml": 0.25, "rmw": 0.25},
    {"symbol": "XLU", "name": "Utilities SPDR", "mkt_rf": 0.60, "smb": -0.05, "hml": 0.35, "rmw": 0.15},
    {"symbol": "XLRE", "name": "Real Estate SPDR", "mkt_rf": 0.95, "smb": 0.20, "hml": 0.40, "rmw": 0.05},
    {"symbol": "GLD", "name": "SPDR Gold Shares", "mkt_rf": 0.15, "smb": 0.05, "hml": 0.10, "rmw": -0.05},
    {"symbol": "TLT", "name": "iShares 20+ Yr Treasury", "mkt_rf": -0.20, "smb": 0.00, "hml": 0.15, "rmw": 0.20},
    {"symbol": "VNQ", "name": "Vanguard Real Estate", "mkt_rf": 0.90, "smb": 0.25, "hml": 0.35, "rmw": 0.10},
    {"symbol": "EFA", "name": "iShares MSCI EAFE", "mkt_rf": 0.85, "smb": 0.15, "hml": 0.25, "rmw": 0.05},
    {"symbol": "EEM", "name": "iShares MSCI Emerging", "mkt_rf": 1.10, "smb": 0.35, "hml": 0.30, "rmw": -0.10},
    {"symbol": "VTI", "name": "Vanguard Total Stock", "mkt_rf": 1.00, "smb": 0.00, "hml": 0.00, "rmw": 0.05}
];

// Global state
let currentPortfolio = null;
let factorChart = null;
let targetFactors = {
    mkt_rf: 1.00,
    smb: 0.00,
    hml: 0.00,
    rmw: 0.00
};

// DOM Elements
const sliders = {
    mkt_rf: document.getElementById('mkt-rf'),
    smb: document.getElementById('smb'),
    hml: document.getElementById('hml'),
    rmw: document.getElementById('rmw')
};

const valueDisplays = {
    mkt_rf: document.getElementById('mkt-rf-value'),
    smb: document.getElementById('smb-value'),
    hml: document.getElementById('hml-value'),
    rmw: document.getElementById('rmw-value')
};

const optimizeBtn = document.getElementById('optimizeBtn');
const exportBtn = document.getElementById('exportBtn');
const loadingOverlay = document.getElementById('loadingOverlay');
const portfolioTableBody = document.getElementById('portfolioTableBody');

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeSliders();
    initializeChart();
    initializeEventListeners();
    showToast('Welcome to Factor Analytics', 'success');
});

// Initialize factor sliders
function initializeSliders() {
    Object.keys(sliders).forEach(factor => {
        const slider = sliders[factor];
        const display = valueDisplays[factor];
        
        slider.addEventListener('input', function() {
            const value = parseFloat(this.value);
            targetFactors[factor] = value;
            display.textContent = value.toFixed(2);
            
            // Add visual feedback
            slider.style.background = `linear-gradient(to right, #00d4aa 0%, #00d4aa ${((value - parseFloat(slider.min)) / (parseFloat(slider.max) - parseFloat(slider.min))) * 100}%, rgba(255,255,255,0.1) ${((value - parseFloat(slider.min)) / (parseFloat(slider.max) - parseFloat(slider.min))) * 100}%, rgba(255,255,255,0.1) 100%)`;
        });
        
        // Initialize display
        display.textContent = slider.value;
        slider.dispatchEvent(new Event('input'));
    });
}

// Initialize Chart.js
function initializeChart() {
    const ctx = document.getElementById('factorChart').getContext('2d');
    
    factorChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Market Risk', 'Size Factor', 'Value Factor', 'Profitability'],
            datasets: [
                {
                    label: 'Target',
                    data: [1.00, 0.00, 0.00, 0.00],
                    borderColor: '#00d4aa',
                    backgroundColor: 'rgba(0, 212, 170, 0.1)',
                    borderWidth: 2,
                    pointBackgroundColor: '#00d4aa',
                    pointBorderColor: '#00d4aa',
                    pointRadius: 5
                },
                {
                    label: 'Portfolio',
                    data: [0, 0, 0, 0],
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    borderWidth: 2,
                    pointBackgroundColor: '#2563eb',
                    pointBorderColor: '#2563eb',
                    pointRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff',
                        font: {
                            size: 12
                        }
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    min: -0.5,
                    max: 1.5,
                    ticks: {
                        color: '#999999',
                        font: {
                            size: 10
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    pointLabels: {
                        color: '#e5e5e5',
                        font: {
                            size: 11
                        }
                    }
                }
            }
        }
    });
    
    // Set fixed height for chart container
    document.querySelector('.chart-container canvas').style.height = '300px';
}

// Initialize event listeners
function initializeEventListeners() {
    optimizeBtn.addEventListener('click', optimizePortfolio);
    exportBtn.addEventListener('click', exportResults);
    
    document.getElementById('sortByWeight').addEventListener('click', () => sortTable('weight'));
    document.getElementById('sortBySymbol').addEventListener('click', () => sortTable('symbol'));
    
    // Real-time optimization on slider change (debounced)
    let optimizeTimeout;
    Object.values(sliders).forEach(slider => {
        slider.addEventListener('input', () => {
            clearTimeout(optimizeTimeout);
            optimizeTimeout = setTimeout(() => {
                if (currentPortfolio) {
                    optimizePortfolio();
                }
            }, 500);
        });
    });
}

// Portfolio optimization algorithm
async function optimizePortfolio() {
    showLoading(true);
    
    try {
        // Simulate processing time for smooth UX
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const maxWeight = parseFloat(document.getElementById('max-weight').value) / 100;
        const minAssets = parseInt(document.getElementById('min-assets').value);
        
        // Simple optimization algorithm
        const result = await optimizeFactorPortfolio(targetFactors, maxWeight, minAssets);
        
        currentPortfolio = result;
        updateResults(result);
        updateChart(result);
        updateTable(result);
        updateMetrics(result);
        
        showToast('Portfolio optimized successfully', 'success');
        
    } catch (error) {
        console.error('Optimization error:', error);
        showToast('Optimization failed. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
}

// Core optimization function
async function optimizeFactorPortfolio(targets, maxWeight, minAssets) {
    const n = assets.length;
    let bestWeights = new Array(n).fill(0);
    let bestError = Infinity;
    
    // Genetic algorithm approach for simplicity
    const populationSize = 100;
    const generations = 50;
    
    for (let gen = 0; gen < generations; gen++) {
        const population = generatePopulation(populationSize, n, maxWeight, minAssets);
        
        for (const weights of population) {
            const error = calculateFactorError(weights, targets);
            if (error < bestError) {
                bestError = error;
                bestWeights = [...weights];
            }
        }
    }
    
    // Calculate portfolio metrics
    const portfolioFactors = calculatePortfolioFactors(bestWeights);
    const risk = calculatePortfolioRisk(bestWeights);
    const expectedReturn = calculateExpectedReturn(bestWeights);
    const sharpeRatio = expectedReturn / risk;
    const activeAssets = bestWeights.filter(w => w > 0.001).length;
    
    return {
        weights: bestWeights,
        factors: portfolioFactors,
        risk: risk,
        expectedReturn: expectedReturn,
        sharpeRatio: sharpeRatio,
        activeAssets: activeAssets,
        error: bestError
    };
}

// Generate random population for genetic algorithm
function generatePopulation(size, n, maxWeight, minAssets) {
    const population = [];
    
    for (let i = 0; i < size; i++) {
        let weights = new Array(n).fill(0);
        
        // Select random assets
        const selectedAssets = [];
        while (selectedAssets.length < minAssets) {
            const idx = Math.floor(Math.random() * n);
            if (!selectedAssets.includes(idx)) {
                selectedAssets.push(idx);
            }
        }
        
        // Add some additional random assets
        const additionalAssets = Math.floor(Math.random() * (n - minAssets) / 2);
        for (let j = 0; j < additionalAssets; j++) {
            const idx = Math.floor(Math.random() * n);
            if (!selectedAssets.includes(idx)) {
                selectedAssets.push(idx);
            }
        }
        
        // Assign random weights
        selectedAssets.forEach(idx => {
            weights[idx] = Math.random() * maxWeight;
        });
        
        // Normalize to sum to 1
        const sum = weights.reduce((a, b) => a + b, 0);
        if (sum > 0) {
            weights = weights.map(w => w / sum);
        }
        
        // Ensure max weight constraint
        weights = weights.map(w => Math.min(w, maxWeight));
        
        // Renormalize
        const newSum = weights.reduce((a, b) => a + b, 0);
        if (newSum > 0) {
            weights = weights.map(w => w / newSum);
        }
        
        population.push(weights);
    }
    
    return population;
}

// Calculate factor loading error
function calculateFactorError(weights, targets) {
    const portfolioFactors = calculatePortfolioFactors(weights);
    
    let error = 0;
    error += Math.pow(portfolioFactors.mkt_rf - targets.mkt_rf, 2) * 4; // Higher weight on market factor
    error += Math.pow(portfolioFactors.smb - targets.smb, 2) * 2;
    error += Math.pow(portfolioFactors.hml - targets.hml, 2) * 2;
    error += Math.pow(portfolioFactors.rmw - targets.rmw, 2) * 1;
    
    return error;
}

// Calculate portfolio factor loadings
function calculatePortfolioFactors(weights) {
    const factors = { mkt_rf: 0, smb: 0, hml: 0, rmw: 0 };
    
    weights.forEach((weight, i) => {
        if (weight > 0) {
            factors.mkt_rf += weight * assets[i].mkt_rf;
            factors.smb += weight * assets[i].smb;
            factors.hml += weight * assets[i].hml;
            factors.rmw += weight * assets[i].rmw;
        }
    });
    
    return factors;
}

// Calculate portfolio risk (simplified)
function calculatePortfolioRisk(weights) {
    // Simplified risk calculation based on factor loadings
    const factors = calculatePortfolioFactors(weights);
    const variance = Math.pow(factors.mkt_rf, 2) * 0.16 + 
                    Math.pow(factors.smb, 2) * 0.04 + 
                    Math.pow(factors.hml, 2) * 0.04 + 
                    Math.pow(factors.rmw, 2) * 0.02 + 
                    0.01; // Idiosyncratic risk
    
    return Math.sqrt(variance);
}

// Calculate expected return (simplified)
function calculateExpectedReturn(weights) {
    const factors = calculatePortfolioFactors(weights);
    // Risk premiums: Market=6%, SMB=2%, HML=3%, RMW=2%
    return factors.mkt_rf * 0.06 + factors.smb * 0.02 + factors.hml * 0.03 + factors.rmw * 0.02 + 0.02; // Risk-free rate
}

// Update results display
function updateResults(result) {
    // This function can be used for additional result processing
    console.log('Portfolio optimized:', result);
}

// Update chart
function updateChart(result) {
    if (!factorChart) return;
    
    const targetData = [
        targetFactors.mkt_rf,
        targetFactors.smb,
        targetFactors.hml,
        targetFactors.rmw
    ];
    
    const portfolioData = [
        result.factors.mkt_rf,
        result.factors.smb,
        result.factors.hml,
        result.factors.rmw
    ];
    
    factorChart.data.datasets[0].data = targetData;
    factorChart.data.datasets[1].data = portfolioData;
    factorChart.update('active');
}

// Update portfolio table
function updateTable(result) {
    const tbody = portfolioTableBody;
    tbody.innerHTML = '';
    
    // Create array of assets with weights
    const portfolioAssets = assets
        .map((asset, index) => ({
            ...asset,
            weight: result.weights[index]
        }))
        .filter(asset => asset.weight > 0.001)
        .sort((a, b) => b.weight - a.weight);
    
    portfolioAssets.forEach(asset => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${asset.symbol}</strong></td>
            <td>${asset.name}</td>
            <td><strong>${(asset.weight * 100).toFixed(2)}%</strong></td>
            <td>${asset.mkt_rf.toFixed(2)}</td>
            <td>${asset.smb.toFixed(2)}</td>
            <td>${asset.hml.toFixed(2)}</td>
            <td>${asset.rmw.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });
}

// Update metrics display
function updateMetrics(result) {
    document.getElementById('portfolio-risk').textContent = `${(result.risk * 100).toFixed(2)}%`;
    document.getElementById('expected-return').textContent = `${(result.expectedReturn * 100).toFixed(2)}%`;
    document.getElementById('sharpe-ratio').textContent = result.sharpeRatio.toFixed(2);
    document.getElementById('active-assets').textContent = result.activeAssets;
    
    // Add animated counters
    animateValue('portfolio-risk', 0, result.risk * 100, 1000, 2, '%');
    animateValue('expected-return', 0, result.expectedReturn * 100, 1000, 2, '%');
    animateValue('sharpe-ratio', 0, result.sharpeRatio, 1000, 2);
    animateValue('active-assets', 0, result.activeAssets, 800, 0);
}

// Animate numeric values
function animateValue(elementId, start, end, duration, decimals = 0, suffix = '') {
    const element = document.getElementById(elementId);
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easeOutCubic;
        
        element.textContent = current.toFixed(decimals) + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Sort table
function sortTable(criteria) {
    if (!currentPortfolio) return;
    
    const tbody = portfolioTableBody;
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    rows.sort((a, b) => {
        if (criteria === 'weight') {
            const weightA = parseFloat(a.cells[2].textContent.replace('%', ''));
            const weightB = parseFloat(b.cells[2].textContent.replace('%', ''));
            return weightB - weightA;
        } else if (criteria === 'symbol') {
            const symbolA = a.cells[0].textContent;
            const symbolB = b.cells[0].textContent;
            return symbolA.localeCompare(symbolB);
        }
        return 0;
    });
    
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
    
    showToast(`Table sorted by ${criteria}`, 'success');
}

// Export results
function exportResults() {
    if (!currentPortfolio) {
        showToast('No portfolio to export. Please optimize first.', 'warning');
        return;
    }
    
    const exportData = {
        timestamp: new Date().toISOString(),
        targetFactors: targetFactors,
        portfolio: currentPortfolio,
        assets: assets.map((asset, index) => ({
            ...asset,
            weight: currentPortfolio.weights[index]
        })).filter(asset => asset.weight > 0.001)
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-optimization-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Portfolio exported successfully', 'success');
}

// Show/hide loading overlay
function showLoading(show) {
    const overlay = loadingOverlay;
    if (show) {
        overlay.classList.add('active');
    } else {
        overlay.classList.remove('active');
    }
}

// Show toast notification
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => container.removeChild(toast), 300);
    }, 3000);
}