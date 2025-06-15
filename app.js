// Asset data from the provided JSON
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

// Chart colors for dark theme
const chartColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'];

// Global variables
let currentWeights = new Array(assets.length).fill(0);
let optimizationHistory = [];
let charts = {};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    setupSliders();
    setupCharts();
    // Run initial optimization after a short delay to ensure charts are ready
    setTimeout(() => {
        optimizePortfolio();
    }, 100);
});

// Setup slider event listeners
function setupSliders() {
    const sliders = ['mkt', 'smb', 'hml', 'rmw', 'max-weight', 'min-weight'];
    
    sliders.forEach(slider => {
        const element = document.getElementById(`${slider}-slider`);
        const valueElement = document.getElementById(`${slider}-value`);
        
        element.addEventListener('input', function() {
            let value = parseFloat(this.value);
            let displayValue = value;
            
            if (slider.includes('weight')) {
                displayValue = (value * 100).toFixed(0) + '%';
            } else {
                displayValue = value.toFixed(1);
            }
            
            valueElement.textContent = displayValue;
            
            // Auto-optimize on slider change with debouncing
            clearTimeout(this.optimizeTimeout);
            this.optimizeTimeout = setTimeout(() => {
                optimizePortfolio();
            }, 300);
        });
    });
    
    // Optimize button
    document.getElementById('optimize-btn').addEventListener('click', function() {
        this.textContent = 'Optimizing...';
        this.disabled = true;
        
        setTimeout(() => {
            optimizePortfolio();
            this.textContent = 'Optimize Portfolio';
            this.disabled = false;
        }, 100);
    });
    
    // Export button
    document.getElementById('export-btn').addEventListener('click', exportWeights);
}

// Setup Chart.js charts with dark theme
function setupCharts() {
    Chart.defaults.color = '#e1e1e6';
    Chart.defaults.borderColor = '#404040';
    Chart.defaults.backgroundColor = '#2d2d30';
    
    // Portfolio allocation pie chart
    const allocationCtx = document.getElementById('allocation-chart').getContext('2d');
    charts.allocation = new Chart(allocationCtx, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: chartColors,
                borderWidth: 2,
                borderColor: '#2d2d30'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 12,
                        padding: 15,
                        color: '#e1e1e6',
                        font: {
                            size: 11
                        }
                    }
                },
                tooltip: {
                    backgroundColor: '#1e1e21',
                    titleColor: '#e1e1e6',
                    bodyColor: '#e1e1e6',
                    borderColor: '#404040',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${(context.parsed * 100).toFixed(1)}%`;
                        }
                    }
                }
            }
        }
    });
    
    // Factor exposure bar chart
    const exposureCtx = document.getElementById('exposure-chart').getContext('2d');
    charts.exposure = new Chart(exposureCtx, {
        type: 'bar',
        data: {
            labels: ['Market', 'Size', 'Value', 'Profitability'],
            datasets: [{
                label: 'Target',
                data: [1.0, 0.0, 0.0, 0.0],
                backgroundColor: '#3b82f6',
                borderWidth: 0
            }, {
                label: 'Portfolio',
                data: [0, 0, 0, 0],
                backgroundColor: '#10b981',
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#404040'
                    },
                    ticks: {
                        color: '#e1e1e6'
                    }
                },
                x: {
                    grid: {
                        color: '#404040'
                    },
                    ticks: {
                        color: '#e1e1e6'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#e1e1e6'
                    }
                },
                tooltip: {
                    backgroundColor: '#1e1e21',
                    titleColor: '#e1e1e6',
                    bodyColor: '#e1e1e6',
                    borderColor: '#404040',
                    borderWidth: 1
                }
            }
        }
    });
    
    // Convergence line chart
    const convergenceCtx = document.getElementById('convergence-chart').getContext('2d');
    charts.convergence = new Chart(convergenceCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Tracking Error',
                data: [],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 2,
                pointBackgroundColor: '#3b82f6'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#404040'
                    },
                    ticks: {
                        color: '#e1e1e6'
                    }
                },
                x: {
                    grid: {
                        color: '#404040'
                    },
                    ticks: {
                        color: '#e1e1e6'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#e1e1e6'
                    }
                },
                tooltip: {
                    backgroundColor: '#1e1e21',
                    titleColor: '#e1e1e6',
                    bodyColor: '#e1e1e6',
                    borderColor: '#404040',
                    borderWidth: 1
                }
            }
        }
    });
}

// Portfolio optimization function
function optimizePortfolio() {
    const targetExposures = {
        mkt_rf: parseFloat(document.getElementById('mkt-slider').value),
        smb: parseFloat(document.getElementById('smb-slider').value),
        hml: parseFloat(document.getElementById('hml-slider').value),
        rmw: parseFloat(document.getElementById('rmw-slider').value)
    };
    
    const maxWeight = parseFloat(document.getElementById('max-weight-slider').value);
    const minWeight = parseFloat(document.getElementById('min-weight-slider').value);
    
    // Optimization algorithm
    const result = optimizeWeights(targetExposures, minWeight, maxWeight);
    currentWeights = result.weights;
    optimizationHistory = result.history;
    
    // Update all visualizations
    updateCharts();
    updateMetrics();
}

// Improved optimization algorithm
function optimizeWeights(targetExposures, minWeight, maxWeight) {
    const n = assets.length;
    let weights = new Array(n).fill(1/n); // Start with equal weights
    let history = [];
    
    // Apply initial constraints
    for (let i = 0; i < n; i++) {
        weights[i] = Math.max(minWeight, Math.min(maxWeight, weights[i]));
    }
    
    // Normalize
    let sum = weights.reduce((a, b) => a + b, 0);
    weights = weights.map(w => w / sum);
    
    // Iterative optimization
    for (let iter = 0; iter < 200; iter++) {
        // Calculate current exposures
        const currentExposures = calculatePortfolioExposures(weights);
        
        // Calculate tracking error
        const trackingError = Math.sqrt(
            Math.pow(currentExposures.mkt_rf - targetExposures.mkt_rf, 2) +
            Math.pow(currentExposures.smb - targetExposures.smb, 2) +
            Math.pow(currentExposures.hml - targetExposures.hml, 2) +
            Math.pow(currentExposures.rmw - targetExposures.rmw, 2)
        );
        
        history.push(trackingError);
        
        // Early stopping if converged
        if (trackingError < 0.01) break;
        
        // Gradient-based weight adjustment
        const learningRate = Math.max(0.001, 0.05 / (iter + 1)); // Adaptive learning rate
        
        for (let i = 0; i < n; i++) {
            const asset = assets[i];
            
            // Calculate gradient
            const mktError = currentExposures.mkt_rf - targetExposures.mkt_rf;
            const smbError = currentExposures.smb - targetExposures.smb;
            const hmlError = currentExposures.hml - targetExposures.hml;
            const rmwError = currentExposures.rmw - targetExposures.rmw;
            
            const gradient = 2 * (
                mktError * asset.mkt_rf +
                smbError * asset.smb +
                hmlError * asset.hml +
                rmwError * asset.rmw
            );
            
            // Update weight
            weights[i] -= learningRate * gradient;
            
            // Apply constraints
            weights[i] = Math.max(minWeight, Math.min(maxWeight, weights[i]));
        }
        
        // Normalize weights to sum to 1
        sum = weights.reduce((a, b) => a + b, 0);
        if (sum > 0) {
            weights = weights.map(w => w / sum);
        }
    }
    
    return { weights, history };
}

// Calculate portfolio factor exposures
function calculatePortfolioExposures(weights) {
    const exposures = { mkt_rf: 0, smb: 0, hml: 0, rmw: 0 };
    
    for (let i = 0; i < assets.length; i++) {
        const asset = assets[i];
        const weight = weights[i];
        
        exposures.mkt_rf += weight * asset.mkt_rf;
        exposures.smb += weight * asset.smb;
        exposures.hml += weight * asset.hml;
        exposures.rmw += weight * asset.rmw;
    }
    
    return exposures;
}

// Update all charts
function updateCharts() {
    updateAllocationChart();
    updateExposureChart();
    updateConvergenceChart();
}

// Update portfolio allocation pie chart
function updateAllocationChart() {
    const significantWeights = [];
    const significantLabels = [];
    const significantColors = [];
    
    // Create array of assets with weights for sorting
    const assetsWithWeights = assets.map((asset, i) => ({
        ...asset,
        weight: currentWeights[i],
        index: i
    }));
    
    // Sort by weight descending and take top holdings
    assetsWithWeights.sort((a, b) => b.weight - a.weight);
    
    let otherWeight = 0;
    for (let i = 0; i < assetsWithWeights.length; i++) {
        const item = assetsWithWeights[i];
        if (item.weight > 0.02 && significantWeights.length < 10) { // Show top 10 holdings > 2%
            significantWeights.push(item.weight);
            significantLabels.push(item.symbol);
            significantColors.push(chartColors[significantWeights.length - 1]);
        } else if (item.weight > 0.001) {
            otherWeight += item.weight;
        }
    }
    
    // Add "Others" category if there are small holdings
    if (otherWeight > 0.001) {
        significantWeights.push(otherWeight);
        significantLabels.push('Others');
        significantColors.push('#6b7280');
    }
    
    charts.allocation.data.labels = significantLabels;
    charts.allocation.data.datasets[0].data = significantWeights;
    charts.allocation.data.datasets[0].backgroundColor = significantColors;
    charts.allocation.update('none'); // No animation for better performance
}

// Update factor exposure chart
function updateExposureChart() {
    const targetExposures = [
        parseFloat(document.getElementById('mkt-slider').value),
        parseFloat(document.getElementById('smb-slider').value),
        parseFloat(document.getElementById('hml-slider').value),
        parseFloat(document.getElementById('rmw-slider').value)
    ];
    
    const portfolioExposures = calculatePortfolioExposures(currentWeights);
    const portfolioValues = [
        portfolioExposures.mkt_rf,
        portfolioExposures.smb,
        portfolioExposures.hml,
        portfolioExposures.rmw
    ];
    
    charts.exposure.data.datasets[0].data = targetExposures;
    charts.exposure.data.datasets[1].data = portfolioValues;
    charts.exposure.update('none');
}

// Update convergence chart
function updateConvergenceChart() {
    const iterations = Array.from({length: optimizationHistory.length}, (_, i) => i + 1);
    
    charts.convergence.data.labels = iterations;
    charts.convergence.data.datasets[0].data = optimizationHistory;
    charts.convergence.update('none');
}

// Update portfolio metrics
function updateMetrics() {
    const targetExposures = {
        mkt_rf: parseFloat(document.getElementById('mkt-slider').value),
        smb: parseFloat(document.getElementById('smb-slider').value),
        hml: parseFloat(document.getElementById('hml-slider').value),
        rmw: parseFloat(document.getElementById('rmw-slider').value)
    };
    
    const portfolioExposures = calculatePortfolioExposures(currentWeights);
    
    // Calculate tracking error
    const trackingError = Math.sqrt(
        Math.pow(portfolioExposures.mkt_rf - targetExposures.mkt_rf, 2) +
        Math.pow(portfolioExposures.smb - targetExposures.smb, 2) +
        Math.pow(portfolioExposures.hml - targetExposures.hml, 2) +
        Math.pow(portfolioExposures.rmw - targetExposures.rmw, 2)
    );
    
    // Number of holdings (weights > 0.1%)
    const numHoldings = currentWeights.filter(w => w > 0.001).length;
    
    // Largest position
    const largestPosition = Math.max(...currentWeights);
    
    // Concentration (Herfindahl-Hirschman Index)
    const hhi = currentWeights.reduce((sum, w) => sum + w * w, 0);
    
    // Update display
    document.getElementById('tracking-error').textContent = trackingError.toFixed(4);
    document.getElementById('num-holdings').textContent = numHoldings;
    document.getElementById('largest-position').textContent = (largestPosition * 100).toFixed(1) + '%';
    document.getElementById('concentration').textContent = hhi.toFixed(4);
}

// Export portfolio weights
function exportWeights() {
    // Filter out very small weights for cleaner export
    const data = assets
        .map((asset, i) => ({
            symbol: asset.symbol,
            name: asset.name,
            weight: currentWeights[i]
        }))
        .filter(item => item.weight > 0.001) // Only export weights > 0.1%
        .sort((a, b) => b.weight - a.weight) // Sort by weight descending
        .map(item => ({
            symbol: item.symbol,
            name: item.name,
            weight: (item.weight * 100).toFixed(2) + '%'
        }));
    
    const csvContent = 'Symbol,Name,Weight\n' + 
        data.map(row => `${row.symbol},"${row.name}",${row.weight}`).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'portfolio_weights.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } else {
        // Fallback for browsers that don't support download attribute
        const url = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
        window.open(url);
    }
}