// Global data object
let data = {
    expenses: [],
    totalExpenses: 0,
    totalBudget: 0,
    categoryBudgets: {
        food: 0,
        transport: 0,
        utilities: 0,
        entertainment: 0,
        shopping: 0,
        other: 0
    },
    historicalData: {
        monthlyTotals: {},
        categoryTrends: {}
    }
};

// Initialize data with placeholder data if empty
function initializeData() {
    if (!localStorage.getItem('cashconData') || window.location.hash === '#reset') {
        console.log('Initializing with placeholder data...');
        data = { ...placeholderData };
        saveData();
        // Remove the reset flag from URL
        if (window.location.hash === '#reset') {
            window.location.hash = '';
        }
    } else {
        try {
            const savedData = JSON.parse(localStorage.getItem('cashconData'));
            // Ensure all required properties exist
            data = {
                expenses: savedData.expenses || [],
                totalExpenses: savedData.totalExpenses || 0,
                totalBudget: savedData.totalBudget || 0,
                categoryBudgets: {
                    food: savedData.categoryBudgets?.food || 0,
                    transport: savedData.categoryBudgets?.transport || 0,
                    utilities: savedData.categoryBudgets?.utilities || 0,
                    entertainment: savedData.categoryBudgets?.entertainment || 0,
                    shopping: savedData.categoryBudgets?.shopping || 0,
                    other: savedData.categoryBudgets?.other || 0
                },
                historicalData: savedData.historicalData || {
                    monthlyTotals: {},
                    categoryTrends: {}
                }
            };
        } catch (error) {
            console.error('Error loading saved data:', error);
            data = { ...placeholderData };
            saveData();
        }
    }
}

// Save data to localStorage
function saveData() {
    try {
        localStorage.setItem('cashconData', JSON.stringify(data));
        saveGamificationData();
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

// Gamification system data structures
let gamificationData = {
    user: {
        points: 2750,
        coins: 1200,
        level: 8,
        experience: 7850,
        streaks: {
            savingStreak: 12,
            budgetStreak: 5,
            trackingStreak: 15
        },
        badges: ['budget_master', 'streak_master', 'smart_shopper'],
        avatar: {
            currentOutfit: 'business',
            unlockedOutfits: ['default', 'business', 'casual'],
            accessories: ['glasses', 'watch']
        }
    },
    quests: {
        active: [
            {
                id: 'weekly_saver',
                title: 'Weekly Saver',
                description: 'Stay under budget for all categories this week',
                progress: 4,
                target: 7,
                reward: {
                    points: 300,
                    coins: 150,
                    badge: 'budget_master'
                }
            },
            {
                id: 'receipt_collector',
                title: 'Receipt Collector',
                description: 'Upload 5 receipts this week',
                progress: 3,
                target: 5,
                reward: {
                    points: 200,
                    coins: 100
                }
            }
        ],
        completed: [
            {
                id: 'first_save',
                title: 'First Save',
                description: 'Save your first $100',
                reward: {
                    points: 100,
                    coins: 50,
                    badge: 'smart_saver'
                }
            }
        ]
    },
    challenges: {
        weekly: [
            {
                id: 'weekly_restaurant',
                title: 'Restaurant Saver',
                description: 'Spend 30% less on restaurants this week',
                progress: 20,
                target: 30,
                reward: {
                    points: 300,
                    coins: 150,
                    badge: 'smart_saver'
                }
            },
            {
                id: 'weekly_tracking',
                title: 'Perfect Tracker',
                description: 'Track all expenses for 7 consecutive days',
                progress: 5,
                target: 7,
                reward: {
                    points: 200,
                    coins: 100
                }
            }
        ],
        monthly: [
            {
                id: 'monthly_savings',
                title: 'Super Saver',
                description: 'Save 20% of your income this month',
                progress: 15,
                target: 20,
                reward: {
                    points: 1000,
                    coins: 500,
                    badge: 'super_saver'
                }
            }
        ]
    },
    leaderboard: {
        global: [
            {
                username: "FinanceGuru",
                points: 5850,
                coins: 2400,
                level: 12,
                experience: 11850,
                badges: ['super_saver', 'budget_master', 'streak_master'],
                streaks: {
                    savingStreak: 45,
                    budgetStreak: 30
                }
            },
            {
                username: "SavvySaver",
                points: 4950,
                coins: 2100,
                level: 10,
                experience: 9950,
                badges: ['smart_saver', 'budget_master'],
                streaks: {
                    savingStreak: 25,
                    budgetStreak: 15
                }
            },
            {
                username: "BudgetNinja",
                points: 4200,
                coins: 1800,
                level: 9,
                experience: 8200,
                badges: ['smart_shopper', 'streak_master'],
                streaks: {
                    savingStreak: 20,
                    budgetStreak: 12
                }
            },
            {
                username: "MoneyMaster",
                points: 3800,
                coins: 1500,
                level: 8,
                experience: 7800,
                badges: ['budget_master', 'smart_saver'],
                streaks: {
                    savingStreak: 18,
                    budgetStreak: 10
                }
            },
            {
                username: "WealthWizard",
                points: 3500,
                coins: 1400,
                level: 7,
                experience: 6500,
                badges: ['smart_shopper'],
                streaks: {
                    savingStreak: 15,
                    budgetStreak: 8
                }
            }
        ],
        monthly: [
            {
                username: "ThriftHero",
                points: 2800,
                coins: 1200,
                level: 6,
                experience: 5800,
                badges: ['smart_saver', 'budget_master'],
                streaks: {
                    savingStreak: 22,
                    budgetStreak: 14
                }
            },
            {
                username: "SaverSupreme",
                points: 2600,
                coins: 1100,
                level: 6,
                experience: 5600,
                badges: ['smart_shopper'],
                streaks: {
                    savingStreak: 18,
                    budgetStreak: 10
                }
            },
            {
                username: "BudgetBoss",
                points: 2400,
                coins: 1000,
                level: 5,
                experience: 4400,
                badges: ['budget_master'],
                streaks: {
                    savingStreak: 15,
                    budgetStreak: 8
                }
            },
            {
                username: "FrugalFox",
                points: 2200,
                coins: 900,
                level: 5,
                experience: 4200,
                badges: ['smart_saver'],
                streaks: {
                    savingStreak: 12,
                    budgetStreak: 6
                }
            },
            {
                username: "SpendSmart",
                points: 2000,
                coins: 800,
                level: 4,
                experience: 3000,
                badges: ['smart_shopper'],
                streaks: {
                    savingStreak: 10,
                    budgetStreak: 5
                }
            }
        ],
        friends: [
            {
                username: "MoneyMentor",
                points: 3200,
                coins: 1300,
                level: 7,
                experience: 6200,
                badges: ['budget_master', 'smart_saver'],
                streaks: {
                    savingStreak: 25,
                    budgetStreak: 15
                }
            },
            {
                username: "SavingsStar",
                points: 2900,
                coins: 1200,
                level: 6,
                experience: 5900,
                badges: ['smart_shopper', 'streak_master'],
                streaks: {
                    savingStreak: 20,
                    budgetStreak: 12
                }
            },
            {
                username: "ThriftMaster",
                points: 2700,
                coins: 1100,
                level: 6,
                experience: 5700,
                badges: ['budget_master'],
                streaks: {
                    savingStreak: 18,
                    budgetStreak: 10
                }
            },
            {
                username: "BudgetPro",
                points: 2500,
                coins: 1000,
                level: 5,
                experience: 4500,
                badges: ['smart_saver'],
                streaks: {
                    savingStreak: 15,
                    budgetStreak: 8
                }
            },
            {
                username: "SaveMaster",
                points: 2300,
                coins: 900,
                level: 5,
                experience: 4300,
                badges: ['smart_shopper'],
                streaks: {
                    savingStreak: 12,
                    budgetStreak: 6
                }
            }
        ]
    }
};

// Quest templates
const questTemplates = {
    savingHero: {
        id: 'savingHero',
        title: 'Saving Hero',
        description: 'Spend less than your usual amount at restaurants this week',
        type: 'saving',
        target: 20, // Save 20% compared to average
        reward: {
            points: 100,
            coins: 50,
            badge: 'restaurant_saver'
        },
        progress: 0
    },
    budgetMaster: {
        id: 'budgetMaster',
        title: 'Budget Master',
        description: 'Stay under budget in all categories for a week',
        type: 'budget',
        target: 7, // 7 days
        reward: {
            points: 200,
            coins: 100,
            badge: 'budget_master'
        },
        progress: 0
    },
    expenseTracker: {
        id: 'expenseTracker',
        title: 'Expense Tracker',
        description: 'Track all expenses for 5 consecutive days',
        type: 'tracking',
        target: 5,
        reward: {
            points: 50,
            coins: 25
        },
        progress: 0
    }
};

// Badge definitions
const badges = {
    restaurant_saver: {
        id: 'restaurant_saver',
        name: 'Restaurant Saver',
        icon: '🍽️',
        description: 'Saved money on restaurant expenses'
    },
    budget_master: {
        id: 'budget_master',
        name: 'Budget Master',
        icon: '📊',
        description: 'Stayed under budget in all categories'
    },
    streak_master: {
        id: 'streak_master',
        name: 'Streak Master',
        icon: '🔥',
        description: 'Maintained a 30-day saving streak'
    },
    smart_shopper: {
        id: 'smart_shopper',
        name: 'Smart Shopper',
        icon: '🛍️',
        description: 'Made 5 purchases below average price'
    },
    smart_saver: {
        id: 'smart_saver',
        name: 'Smart Saver',
        icon: '💰',
        description: 'Achieved significant savings'
    },
    super_saver: {
        id: 'super_saver',
        name: 'Super Saver',
        icon: '🌟',
        description: 'Reached monthly savings goal'
    }
};

// Avatar customization options
const avatarItems = {
    outfits: {
        default: { 
            name: 'Default Outfit', 
            price: 0,
            imageUrl: 'image.png'
        },
        business: { 
            name: 'Business Attire', 
            price: 1000,
            imageUrl: 'image.png'
        },
        casual: { 
            name: 'Casual Style', 
            price: 500,
            imageUrl: 'image.png'
        },
        luxury: { 
            name: 'Luxury Fashion', 
            price: 2000,
            imageUrl: 'image.png'
        }
    },
    accessories: {
        glasses: { 
            name: 'Smart Glasses', 
            price: 300,
            imageUrl: 'image.png'
        },
        watch: { 
            name: 'Luxury Watch', 
            price: 800,
            imageUrl: 'image.png'
        },
        tie: { 
            name: 'Power Tie', 
            price: 400,
            imageUrl: 'image.png'
        },
        briefcase: { 
            name: 'Designer Briefcase', 
            price: 1000,
            imageUrl: 'image.png'
        }
    },
    hairstyles: {
        short: {
            name: 'Short Hair',
            price: 200,
            imageUrl: 'image.png'
        },
        long: {
            name: 'Long Hair',
            price: 200,
            imageUrl: 'image.png'
        },
        curly: {
            name: 'Curly Hair',
            price: 300,
            imageUrl: 'image.png'
        }
    }
};

// Extended placeholder data with more detailed transactions and historical data
const placeholderData = {
    expenses: [
        // Today's expenses
        { id: 1, title: 'Grocery Shopping', amount: 85.50, category: 'food', paymentMethod: 'credit', date: new Date().toISOString(), hasReceipts: true },
        { id: 2, title: 'Bus Ticket', amount: 2.50, category: 'transport', paymentMethod: 'cash', date: new Date().toISOString(), hasReceipts: false },
        { id: 3, title: 'Coffee and Snack', amount: 7.25, category: 'food', paymentMethod: 'debit', date: new Date().toISOString(), hasReceipts: true },
        { id: 4, title: 'Lunch with Colleagues', amount: 18.75, category: 'food', paymentMethod: 'credit', date: new Date().toISOString(), hasReceipts: true },
        
        // Yesterday's expenses
        { id: 5, title: 'Coffee Shop', amount: 4.75, category: 'food', paymentMethod: 'debit', date: new Date(Date.now() - 86400000).toISOString(), hasReceipts: true },
        { id: 6, title: 'Movie Night', amount: 15.00, category: 'entertainment', paymentMethod: 'credit', date: new Date(Date.now() - 86400000).toISOString(), hasReceipts: true },
        { id: 7, title: 'Pizza Delivery', amount: 22.50, category: 'food', paymentMethod: 'credit', date: new Date(Date.now() - 86400000).toISOString(), hasReceipts: true },
        { id: 8, title: 'Mobile Game Purchase', amount: 4.99, category: 'entertainment', paymentMethod: 'credit', date: new Date(Date.now() - 86400000).toISOString(), hasReceipts: false },
        
        // Last week's expenses
        { id: 9, title: 'Electric Bill', amount: 75.25, category: 'utilities', paymentMethod: 'transfer', date: new Date(Date.now() - 7 * 86400000).toISOString(), hasReceipts: true },
        { id: 10, title: 'New Shoes', amount: 89.99, category: 'shopping', paymentMethod: 'credit', date: new Date(Date.now() - 6 * 86400000).toISOString(), hasReceipts: true },
        { id: 11, title: 'Restaurant Dinner', amount: 45.80, category: 'food', paymentMethod: 'credit', date: new Date(Date.now() - 5 * 86400000).toISOString(), hasReceipts: true },
        { id: 12, title: 'Gas', amount: 40.00, category: 'transport', paymentMethod: 'debit', date: new Date(Date.now() - 4 * 86400000).toISOString(), hasReceipts: true },
        { id: 13, title: 'Internet Bill', amount: 65.00, category: 'utilities', paymentMethod: 'transfer', date: new Date(Date.now() - 3 * 86400000).toISOString(), hasReceipts: false },
        { id: 14, title: 'Gym Membership', amount: 50.00, category: 'other', paymentMethod: 'credit', date: new Date(Date.now() - 2 * 86400000).toISOString(), hasReceipts: true },
        { id: 15, title: 'Bookstore', amount: 35.99, category: 'entertainment', paymentMethod: 'debit', date: new Date(Date.now() - 2 * 86400000).toISOString(), hasReceipts: true },
        { id: 16, title: 'Lunch Special', amount: 12.99, category: 'food', paymentMethod: 'cash', date: new Date(Date.now() - 2 * 86400000).toISOString(), hasReceipts: true },
        
        // Two weeks ago
        { id: 17, title: 'Water Bill', amount: 45.00, category: 'utilities', paymentMethod: 'transfer', date: new Date(Date.now() - 14 * 86400000).toISOString(), hasReceipts: true },
        { id: 18, title: 'Birthday Gift Shopping', amount: 120.00, category: 'shopping', paymentMethod: 'credit', date: new Date(Date.now() - 13 * 86400000).toISOString(), hasReceipts: true },
        { id: 19, title: 'Sushi Restaurant', amount: 65.50, category: 'food', paymentMethod: 'credit', date: new Date(Date.now() - 12 * 86400000).toISOString(), hasReceipts: true },
        { id: 20, title: 'Uber Ride', amount: 25.75, category: 'transport', paymentMethod: 'credit', date: new Date(Date.now() - 12 * 86400000).toISOString(), hasReceipts: false },
        { id: 21, title: 'Coffee with Friends', amount: 15.25, category: 'food', paymentMethod: 'debit', date: new Date(Date.now() - 11 * 86400000).toISOString(), hasReceipts: true },
        { id: 22, title: 'Phone Case', amount: 29.99, category: 'shopping', paymentMethod: 'credit', date: new Date(Date.now() - 10 * 86400000).toISOString(), hasReceipts: true },
        
        // Last month's expenses
        { id: 23, title: 'Phone Bill', amount: 55.00, category: 'utilities', paymentMethod: 'transfer', date: new Date(Date.now() - 30 * 86400000).toISOString(), hasReceipts: true },
        { id: 24, title: 'Winter Clothing', amount: 245.00, category: 'shopping', paymentMethod: 'credit', date: new Date(Date.now() - 28 * 86400000).toISOString(), hasReceipts: true },
        { id: 25, title: 'Grocery Shopping', amount: 95.30, category: 'food', paymentMethod: 'debit', date: new Date(Date.now() - 25 * 86400000).toISOString(), hasReceipts: true },
        { id: 26, title: 'Concert Tickets', amount: 150.00, category: 'entertainment', paymentMethod: 'credit', date: new Date(Date.now() - 22 * 86400000).toISOString(), hasReceipts: false },
        { id: 27, title: 'Car Maintenance', amount: 250.00, category: 'transport', paymentMethod: 'credit', date: new Date(Date.now() - 20 * 86400000).toISOString(), hasReceipts: true },
        { id: 28, title: 'Home Decor', amount: 185.00, category: 'shopping', paymentMethod: 'credit', date: new Date(Date.now() - 18 * 86400000).toISOString(), hasReceipts: true },
        { id: 29, title: 'Fine Dining', amount: 125.50, category: 'food', paymentMethod: 'credit', date: new Date(Date.now() - 15 * 86400000).toISOString(), hasReceipts: true },
        { id: 30, title: 'Spotify Premium', amount: 9.99, category: 'entertainment', paymentMethod: 'credit', date: new Date(Date.now() - 15 * 86400000).toISOString(), hasReceipts: false },
        
        // Two months ago
        { id: 31, title: 'Laptop Repair', amount: 200.00, category: 'other', paymentMethod: 'credit', date: new Date(Date.now() - 45 * 86400000).toISOString(), hasReceipts: true },
        { id: 32, title: 'Dentist Visit', amount: 150.00, category: 'other', paymentMethod: 'credit', date: new Date(Date.now() - 40 * 86400000).toISOString(), hasReceipts: true },
        { id: 33, title: 'Birthday Gift', amount: 50.00, category: 'shopping', paymentMethod: 'credit', date: new Date(Date.now() - 38 * 86400000).toISOString(), hasReceipts: true },
        { id: 34, title: 'Netflix Subscription', amount: 15.99, category: 'entertainment', paymentMethod: 'credit', date: new Date(Date.now() - 35 * 86400000).toISOString(), hasReceipts: false },
        { id: 35, title: 'Pharmacy', amount: 45.00, category: 'other', paymentMethod: 'debit', date: new Date(Date.now() - 33 * 86400000).toISOString(), hasReceipts: true },
        { id: 36, title: 'Train Ticket', amount: 35.50, category: 'transport', paymentMethod: 'debit', date: new Date(Date.now() - 32 * 86400000).toISOString(), hasReceipts: true },
        { id: 37, title: 'Office Supplies', amount: 28.75, category: 'shopping', paymentMethod: 'credit', date: new Date(Date.now() - 31 * 86400000).toISOString(), hasReceipts: true },
        
        // Three months ago
        { id: 38, title: 'Hotel Booking', amount: 450.00, category: 'other', paymentMethod: 'credit', date: new Date(Date.now() - 75 * 86400000).toISOString(), hasReceipts: true },
        { id: 39, title: 'Flight Tickets', amount: 550.00, category: 'transport', paymentMethod: 'credit', date: new Date(Date.now() - 73 * 86400000).toISOString(), hasReceipts: true },
        { id: 40, title: 'Travel Insurance', amount: 85.00, category: 'other', paymentMethod: 'credit', date: new Date(Date.now() - 73 * 86400000).toISOString(), hasReceipts: true },
        { id: 41, title: 'Souvenir Shopping', amount: 120.00, category: 'shopping', paymentMethod: 'credit', date: new Date(Date.now() - 70 * 86400000).toISOString(), hasReceipts: true },
        { id: 42, title: 'Resort Restaurant', amount: 180.00, category: 'food', paymentMethod: 'credit', date: new Date(Date.now() - 69 * 86400000).toISOString(), hasReceipts: true },
        { id: 43, title: 'Tourist Activities', amount: 250.00, category: 'entertainment', paymentMethod: 'credit', date: new Date(Date.now() - 68 * 86400000).toISOString(), hasReceipts: true },
        { id: 44, title: 'Local Transport', amount: 45.00, category: 'transport', paymentMethod: 'cash', date: new Date(Date.now() - 68 * 86400000).toISOString(), hasReceipts: false },
        { id: 45, title: 'Travel Meals', amount: 165.00, category: 'food', paymentMethod: 'credit', date: new Date(Date.now() - 67 * 86400000).toISOString(), hasReceipts: true }
    ],
    totalExpenses: 4928.72,
    totalBudget: 6000.00,
    categoryBudgets: {
        food: 1200,
        transport: 800,
        utilities: 500,
        entertainment: 400,
        shopping: 800,
        other: 1300
    },
    historicalData: {
        monthlyTotals: {
            'Jan': 2850.75,
            'Feb': 2143.32,
            'Mar': 1969.09
        },
        categoryTrends: {
            food: [820.50, 680.25, 430.35],
            transport: [680.00, 395.50, 392.50],
            utilities: [285.00, 295.00, 195.25],
            entertainment: [395.00, 225.00, 190.00],
            shopping: [650.00, 480.00, 409.99],
            other: [520.25, 667.57, 350.00]
        }
    }
};

// Chart configuration and data
const chartConfig = {
    expenseChart: {
        type: 'line',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Monthly Expenses Trend'
                }
            }
        }
    },
    categoryChart: {
        type: 'doughnut',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                },
                title: {
                    display: true,
                    text: 'Expenses by Category'
                }
            }
        }
    },
    trendChart: {
        type: 'bar',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Budget vs Actual by Category'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    }
};

// Function to update dashboard charts
function updateDashboard() {
    try {
        // Sample data for charts
        const monthlyData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            expenses: [2100, 1850, 2300, 1950, 2400, 2200],
            savings: [800, 950, 700, 1050, 600, 800]
        };

        // Expense Trend Chart
        const expenseCtx = document.getElementById('expenseChart');
        if (expenseCtx) {
            const existingChart = Chart.getChart(expenseCtx);
            if (existingChart) {
                existingChart.destroy();
            }

            new Chart(expenseCtx, {
                type: 'line',
                data: {
                    labels: monthlyData.labels,
                    datasets: [{
                        label: 'Monthly Expenses',
                        data: monthlyData.expenses,
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Monthly Expenses Trend'
                        }
                    }
                }
            });
        }

        // Category Distribution Chart
        const categoryCtx = document.getElementById('categoryChart');
        if (categoryCtx) {
            const existingChart = Chart.getChart(categoryCtx);
            if (existingChart) {
                existingChart.destroy();
            }

            const categoryData = {
                labels: ['Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Other'],
                data: [30, 15, 20, 10, 15, 10]
            };

            new Chart(categoryCtx, {
                type: 'doughnut',
                data: {
                    labels: categoryData.labels,
                    datasets: [{
                        data: categoryData.data,
                        backgroundColor: [
                            '#ef4444',
                            '#f59e0b',
                            '#10b981',
                            '#6366f1',
                            '#8b5cf6',
                            '#ec4899'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Expense Distribution by Category'
                        }
                    }
                }
            });
        }

        // Savings vs Expenses Chart
        const trendCtx = document.getElementById('trendChart');
        if (trendCtx) {
            const existingChart = Chart.getChart(trendCtx);
            if (existingChart) {
                existingChart.destroy();
            }

            new Chart(trendCtx, {
                type: 'bar',
                data: {
                    labels: monthlyData.labels,
                    datasets: [
                        {
                            label: 'Expenses',
                            data: monthlyData.expenses,
                            backgroundColor: '#ef4444'
                        },
                        {
                            label: 'Savings',
                            data: monthlyData.savings,
                            backgroundColor: '#10b981'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Monthly Expenses vs Savings'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Amount ($)'
                            }
                        }
                    }
                }
            });
        }

        // Update insights
        updateDashboardInsights();
        
        // Update recent expenses
        renderExpenses();
    } catch (error) {
        console.error('Error updating dashboard:', error);
    }
}

// Function to render expenses list
function renderExpenses() {
    const expensesList = document.getElementById('expensesList');
    if (!expensesList) return;

    expensesList.innerHTML = '';
    
    // Sort expenses by date (most recent first)
    const sortedExpenses = [...data.expenses].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );

    sortedExpenses.forEach(expense => {
        const expenseElement = document.createElement('div');
        expenseElement.className = 'expense-item';
        
        const date = new Date(expense.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        expenseElement.innerHTML = `
            <div class="expense-info">
                <span class="expense-title">${expense.title}</span>
                <span class="expense-details">
                    ${formattedDate} • ${expense.category} • ${expense.paymentMethod}
                    ${expense.hasReceipts ? '📎' : ''}
                </span>
            </div>
            <span class="expense-amount">$${expense.amount.toFixed(2)}</span>
        `;

        expensesList.appendChild(expenseElement);
    });

    // Update total expenses display
    const totalExpensesElement = document.querySelector('.total-expenses');
    if (totalExpensesElement) {
        totalExpensesElement.textContent = `$${data.totalExpenses.toFixed(2)}`;
    }
}

// Function to update dashboard insights
function updateDashboardInsights() {
    const insightsContainer = document.querySelector('.insights-container');
    if (!insightsContainer) return;

    insightsContainer.innerHTML = '';

    // Calculate insights
    const insights = [];
    
    // Check budget status
    const totalBudget = data.totalBudget;
    const currentExpenses = data.totalExpenses;
    const budgetPercentage = (currentExpenses / totalBudget) * 100;

    if (budgetPercentage > 90) {
        insights.push({
            type: 'alert',
            title: 'Budget Alert',
            message: `You've used ${budgetPercentage.toFixed(1)}% of your total budget`,
            action: 'Review your expenses and adjust spending'
        });
    } else if (budgetPercentage > 75) {
        insights.push({
            type: 'warning',
            title: 'Budget Warning',
            message: `You've used ${budgetPercentage.toFixed(1)}% of your total budget`,
            action: 'Consider reducing non-essential expenses'
        });
    }

    // Check category spending
    Object.entries(data.categoryBudgets).forEach(([category, budget]) => {
        const categoryExpenses = data.expenses
            .filter(e => e.category === category)
            .reduce((sum, e) => sum + e.amount, 0);
        
        const categoryPercentage = (categoryExpenses / budget) * 100;
        
        if (categoryPercentage > 90) {
            insights.push({
                type: 'alert',
                title: `${category.charAt(0).toUpperCase() + category.slice(1)} Budget Alert`,
                message: `You've used ${categoryPercentage.toFixed(1)}% of your ${category} budget`,
                action: 'Review and adjust your spending in this category'
            });
        }
    });

    // Check for savings opportunities
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    const thisMonthExpenses = data.expenses
        .filter(e => new Date(e.date) > lastMonth)
        .reduce((sum, e) => sum + e.amount, 0);
    
    if (thisMonthExpenses < data.totalBudget * 0.8) {
        insights.push({
            type: 'success',
            title: 'Savings Goal Progress',
            message: 'You\'re under budget this month! Keep up the good work!',
            action: 'Consider moving excess to savings'
        });
    }

    // Add tips based on spending patterns
    insights.push({
        type: 'tip',
        title: 'Money Saving Tip',
        message: 'Track your daily expenses to identify areas for potential savings',
        action: 'Try our expense tracking feature'
    });

    // Render insights
    insights.forEach(insight => {
        const insightCard = document.createElement('div');
        insightCard.className = `insight-card ${insight.type}`;
        insightCard.innerHTML = `
            <h4>${insight.title}</h4>
            <p>${insight.message}</p>
            <p class="insight-action">${insight.action}</p>
        `;
        insightsContainer.appendChild(insightCard);
    });
}

// Function to add a new expense
function addExpense() {
    const title = document.getElementById('expenseTitle').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const category = document.getElementById('expenseCategory').value;
    const paymentMethod = document.getElementById('paymentMethod').value;

    if (!title || !amount || !category || !paymentMethod) {
        alert('Please fill in all fields');
        return;
    }

    const expenseId = Date.now();
    const expense = {
        id: expenseId,
        title,
        amount,
        category,
        paymentMethod,
        date: new Date().toISOString(),
        hasReceipts: currentReceipts.length > 0
    };

    // Add expense to data
    data.expenses.push(expense);
    data.totalExpenses += amount;

    // Update streaks and check for rewards
    updateStreaks(expense);

    // Check for quest completion
    checkQuestProgress(expense);

    // Check for challenge progress
    updateChallengeProgress(expense);

    // Save and update UI
    saveData();
    updateDashboard();
    renderExpenses();
    updateChartsWithRealisticData();
    
    // Clear form
    document.getElementById('expenseTitle').value = '';
    document.getElementById('expenseAmount').value = '';
    document.getElementById('expenseCategory').value = '';
    document.getElementById('paymentMethod').value = '';
    currentReceipts = [];
    updateReceiptPreview();
}

// Function to switch tabs
function switchTab(tabId) {
    try {
        // Remove active class from all tabs and buttons
        document.querySelectorAll('.tab-content').forEach(tab => {
            if (tab) tab.classList.remove('active');
        });
        document.querySelectorAll('nav button').forEach(btn => {
            if (btn) btn.classList.remove('active');
        });
        
        // Add active class to selected tab and button
        const selectedTab = document.getElementById(tabId);
        const selectedButton = document.querySelector(`nav button[data-tab="${tabId}"]`);
        
        if (selectedTab) selectedTab.classList.add('active');
        if (selectedButton) selectedButton.classList.add('active');
        
        // Update content based on tab
        switch(tabId) {
            case 'dashboard':
                updateDashboard();
                break;
            case 'expenses':
                renderExpenses();
                break;
            case 'earnings':
                updateEarningsChart();
                break;
            case 'quests':
                updateQuestsAndChallenges();
                break;
            case 'leaderboard':
                updateLeaderboard();
                break;
        }
    } catch (error) {
        console.error('Error switching tabs:', error);
    }
}

// Function to render all expenses
function renderAllExpenses() {
    const expensesList = document.getElementById('allExpensesList');
    if (!expensesList) return;

    expensesList.innerHTML = '';
    
    // Sort expenses by date (most recent first)
    const sortedExpenses = [...data.expenses].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );

    sortedExpenses.forEach(expense => {
        const expenseElement = document.createElement('div');
        expenseElement.className = 'expense-item';
        
        const date = new Date(expense.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        expenseElement.innerHTML = `
            <div class="expense-info">
                <span class="expense-title">${expense.title}</span>
                <span class="expense-details">
                    ${formattedDate} • ${expense.category} • ${expense.paymentMethod}
                    ${expense.hasReceipts ? '📎' : ''}
                </span>
            </div>
            <span class="expense-amount">$${expense.amount.toFixed(2)}</span>
        `;

        expensesList.appendChild(expenseElement);
    });
}

// Function to update earnings chart
function updateEarningsChart() {
    const earningsCtx = document.getElementById('earningsChart');
    if (!earningsCtx) return;

    // Clear existing chart
    const existingChart = Chart.getChart(earningsCtx);
    if (existingChart) {
        existingChart.destroy();
    }

    // Create earnings data with realistic values
    const earningsData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        earnings: [4500, 4800, 4600, 5200, 5500, 5800],
        savings: [900, 1200, 1150, 1500, 1650, 1800]
    };

    new Chart(earningsCtx, {
        type: 'line',
        data: {
            labels: earningsData.labels,
            datasets: [{
                label: 'Monthly Earnings',
                data: earningsData.earnings,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly Earnings Trend'
                }
            }
        }
    });

    // Update summary cards
    const monthlyEarningsAmount = document.querySelector('.earnings-summary .summary-card:first-child .amount');
    const totalSavingsAmount = document.querySelector('.earnings-summary .summary-card:last-child .amount');

    if (monthlyEarningsAmount) {
        monthlyEarningsAmount.textContent = `$${earningsData.earnings[earningsData.earnings.length - 1].toLocaleString()}`;
    }

    if (totalSavingsAmount) {
        const totalSavings = earningsData.savings.reduce((sum, amount) => sum + amount, 0);
        totalSavingsAmount.textContent = `$${totalSavings.toLocaleString()}`;
    }
}

// Enhanced leaderboard data
const leaderboardData = {
    global: [
        {
            username: "FinanceGuru",
            avatar: "👨‍💼",
            points: 12850,
            coins: 5400,
            level: 25,
            experience: 24850,
            badges: ['super_saver', 'budget_master', 'streak_master', 'smart_shopper'],
            streaks: {
                savingStreak: 85,
                budgetStreak: 60
            }
        },
        {
            username: "MoneyMaven",
            avatar: "👩‍💼",
            points: 11200,
            coins: 4800,
            level: 22,
            experience: 21200,
            badges: ['super_saver', 'budget_master', 'smart_saver'],
            streaks: {
                savingStreak: 72,
                budgetStreak: 45
            }
        },
        {
            username: "SavvySpender",
            avatar: "🧑‍💼",
            points: 9800,
            coins: 4200,
            level: 20,
            experience: 19800,
            badges: ['budget_master', 'streak_master', 'smart_shopper'],
            streaks: {
                savingStreak: 65,
                budgetStreak: 40
            }
        },
        {
            username: "WealthWizard",
            avatar: "🧙‍♂️",
            points: 8500,
            coins: 3600,
            level: 18,
            experience: 17500,
            badges: ['super_saver', 'smart_saver'],
            streaks: {
                savingStreak: 55,
                budgetStreak: 35
            }
        },
        {
            username: "BudgetBoss",
            avatar: "👑",
            points: 7200,
            coins: 3000,
            level: 16,
            experience: 15200,
            badges: ['budget_master', 'smart_shopper'],
            streaks: {
                savingStreak: 45,
                budgetStreak: 30
            }
        }
    ],
    monthly: [
        {
            username: "ThriftQueen",
            avatar: "👸",
            points: 4500,
            coins: 2000,
            level: 12,
            experience: 11500,
            badges: ['smart_saver', 'budget_master'],
            streaks: {
                savingStreak: 28,
                budgetStreak: 20
            }
        },
        {
            username: "SaveMaster",
            avatar: "🎯",
            points: 4200,
            coins: 1800,
            level: 11,
            experience: 10200,
            badges: ['smart_shopper', 'streak_master'],
            streaks: {
                savingStreak: 25,
                budgetStreak: 18
            }
        },
        {
            username: "FrugalFox",
            avatar: "🦊",
            points: 3800,
            coins: 1600,
            level: 10,
            experience: 9800,
            badges: ['budget_master'],
            streaks: {
                savingStreak: 22,
                budgetStreak: 15
            }
        },
        {
            username: "MoneyMinder",
            avatar: "🎭",
            points: 3500,
            coins: 1400,
            level: 9,
            experience: 8500,
            badges: ['smart_saver'],
            streaks: {
                savingStreak: 20,
                budgetStreak: 12
            }
        },
        {
            username: "SpendSmart",
            avatar: "🎓",
            points: 3200,
            coins: 1200,
            level: 8,
            experience: 7200,
            badges: ['smart_shopper'],
            streaks: {
                savingStreak: 18,
                budgetStreak: 10
            }
        }
    ],
    friends: [
        {
            username: "BestBudget",
            avatar: "🌟",
            points: 6500,
            coins: 2800,
            level: 15,
            experience: 14500,
            badges: ['budget_master', 'smart_saver'],
            streaks: {
                savingStreak: 35,
                budgetStreak: 25
            }
        },
        {
            username: "SavingPro",
            avatar: "💫",
            points: 5800,
            coins: 2400,
            level: 14,
            experience: 13800,
            badges: ['smart_shopper', 'streak_master'],
            streaks: {
                savingStreak: 32,
                budgetStreak: 22
            }
        },
        {
            username: "MoneyMaster",
            avatar: "⭐",
            points: 5200,
            coins: 2200,
            level: 13,
            experience: 12200,
            badges: ['budget_master'],
            streaks: {
                savingStreak: 30,
                budgetStreak: 20
            }
        },
        {
            username: "ThriftKing",
            avatar: "👑",
            points: 4800,
            coins: 2000,
            level: 12,
            experience: 11800,
            badges: ['smart_saver'],
            streaks: {
                savingStreak: 28,
                budgetStreak: 18
            }
        },
        {
            username: "SaveStar",
            avatar: "🌠",
            points: 4200,
            coins: 1800,
            level: 11,
            experience: 10200,
            badges: ['smart_shopper'],
            streaks: {
                savingStreak: 25,
                budgetStreak: 15
            }
        }
    ]
};

// Function to update leaderboard
function updateLeaderboard() {
    const leaderboardList = document.querySelector('.leaderboard-list');
    if (!leaderboardList) return;

    // Get active board type
    const activeTab = document.querySelector('.leaderboard-tab.active');
    const boardType = activeTab ? activeTab.getAttribute('data-board') : 'global';
    const currentData = leaderboardData[boardType];

    leaderboardList.innerHTML = '';

    // Add current user to the data
    const allPlayers = [
        {
            username: "You",
            avatar: "😊",
            points: gamificationData.user.points,
            coins: gamificationData.user.coins,
            level: gamificationData.user.level,
            experience: gamificationData.user.experience,
            badges: gamificationData.user.badges,
            streaks: gamificationData.user.streaks
        },
        ...currentData
    ].sort((a, b) => b.points - a.points);

    allPlayers.forEach((user, index) => {
        const entry = document.createElement('div');
        entry.className = 'leaderboard-entry';
        if (user.username === "You") entry.classList.add('current-user');

        entry.innerHTML = `
            <div class="entry-rank">#${index + 1}</div>
            <div class="entry-avatar">${user.avatar}</div>
            <div class="entry-info">
                <div class="entry-name-container">
                    <span class="entry-name">${user.username}</span>
                    <span class="level-indicator">Lvl ${user.level}</span>
                </div>
                <div class="entry-stats">
                    <span class="badge-indicator">🏆 ${user.badges.length}</span>
                    <span class="streak-count">🔥 ${user.streaks.savingStreak}d</span>
                </div>
            </div>
            <div class="entry-points">${user.points.toLocaleString()} pts</div>
        `;

        leaderboardList.appendChild(entry);
    });
}

// Function to switch leaderboard tabs
function switchLeaderboardTab(event) {
    const tabs = document.querySelectorAll('.leaderboard-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    updateLeaderboard();
}

// Add event listeners for leaderboard tabs
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.leaderboard-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', switchLeaderboardTab);
    });
});

// Function to update profile
function updateProfile() {
    // Update header profile info
    const headerLevel = document.querySelector('.user-profile .level');
    const headerPoints = document.querySelector('.user-profile .points');
    const headerCoins = document.querySelector('.user-profile .coins');
    const expProgress = document.querySelector('.user-profile .exp-progress');

    if (headerLevel) headerLevel.textContent = `Level ${gamificationData.user.level}`;
    if (headerPoints) headerPoints.textContent = `🏆 ${gamificationData.user.points} Points`;
    if (headerCoins) headerCoins.textContent = `💰 ${gamificationData.user.coins} Coins`;
    if (expProgress) expProgress.style.width = `${(gamificationData.user.experience % 1000) / 10}%`;

    // Update profile section
    const profileInfo = document.querySelector('.profile-info');
    if (profileInfo) {
        profileInfo.innerHTML = `
            <div class="profile-header">
                <h3>Level ${gamificationData.user.level}</h3>
                <div class="level-progress">
                    <div class="exp-progress" style="width: ${(gamificationData.user.experience % 1000) / 10}%"></div>
                </div>
                <p>${gamificationData.user.experience} XP</p>
            </div>
            <div class="profile-stats">
                <div class="stat-item">
                    <h4>Points</h4>
                    <p>🏆 ${gamificationData.user.points}</p>
                </div>
                <div class="stat-item">
                    <h4>Coins</h4>
                    <p>💰 ${gamificationData.user.coins}</p>
                </div>
                <div class="stat-item">
                    <h4>Saving Streak</h4>
                    <p>🔥 ${gamificationData.user.streaks.savingStreak} days</p>
                </div>
            </div>
            <div class="profile-badges">
                <h4>Your Badges</h4>
                <div class="badge-grid">
                    ${gamificationData.user.badges.map(badgeId => `
                        <div class="badge-item">
                            <div class="badge-icon">${badges[badgeId].icon}</div>
                            <div class="badge-name">${badges[badgeId].name}</div>
                            <div class="badge-tooltip">
                                <h4>${badges[badgeId].name}</h4>
                                <p>${badges[badgeId].description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Update profile dropdown
    const dropdownBadges = document.querySelector('.profile-dropdown .badge-list');
    if (dropdownBadges) {
        dropdownBadges.innerHTML = gamificationData.user.badges
            .slice(0, 3)
            .map(badgeId => `
                <div class="badge-item">
                    <div class="badge-icon">${badges[badgeId].icon}</div>
                </div>
            `).join('');
    }
}

// Function to toggle profile dropdown
function toggleProfileDropdown() {
    const dropdown = document.querySelector('.profile-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

// Close profile dropdown when clicking outside
document.addEventListener('click', (event) => {
    const dropdown = document.querySelector('.profile-dropdown');
    const button = document.querySelector('.profile-button');
    
    if (dropdown && button && !button.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove('active');
    }
});

// Function to update quests and challenges
function updateQuestsAndChallenges() {
    // Update active quests
    const questList = document.querySelector('.quest-list');
    if (questList) {
        questList.innerHTML = '';
        gamificationData.quests.active.forEach(quest => {
            const questElement = document.createElement('div');
            questElement.className = 'quest-item';
            questElement.innerHTML = `
                <div class="quest-info">
                    <h4>${quest.title}</h4>
                    <p>${quest.description}</p>
                    <div class="quest-progress">
                        <div class="progress-bar" style="width: ${(quest.progress / quest.target) * 100}%"></div>
                        <span class="progress-text">${quest.progress}/${quest.target}</span>
                    </div>
                </div>
                <div class="quest-rewards">
                    <span class="reward">🏆 ${quest.reward.points} Points</span>
                    <span class="reward">💰 ${quest.reward.coins} Coins</span>
                    ${quest.reward.badge ? `<span class="reward">🎖️ ${badges[quest.reward.badge].name}</span>` : ''}
                </div>
            `;
            questList.appendChild(questElement);
        });
    }

    // Update weekly challenges
    const weeklyChallenges = document.querySelector('.challenge-list.weekly');
    if (weeklyChallenges) {
        weeklyChallenges.innerHTML = '';
        gamificationData.challenges.weekly.forEach(challenge => {
            const challengeElement = document.createElement('div');
            challengeElement.className = 'challenge-item';
            challengeElement.innerHTML = `
                <div class="challenge-info">
                    <h4>${challenge.title}</h4>
                    <p>${challenge.description}</p>
                    <div class="challenge-progress">
                        <div class="progress-bar" style="width: ${(challenge.progress / challenge.target) * 100}%"></div>
                        <span class="progress-text">${challenge.progress}%/${challenge.target}%</span>
                    </div>
                </div>
                <div class="challenge-rewards">
                    <span class="reward">🏆 ${challenge.reward.points} Points</span>
                    <span class="reward">💰 ${challenge.reward.coins} Coins</span>
                    ${challenge.reward.badge ? `<span class="reward">🎖️ ${badges[challenge.reward.badge].name}</span>` : ''}
                </div>
            `;
            weeklyChallenges.appendChild(challengeElement);
        });
    }

    // Update monthly challenges
    const monthlyChallenges = document.querySelector('.challenge-list.monthly');
    if (monthlyChallenges) {
        monthlyChallenges.innerHTML = '';
        gamificationData.challenges.monthly.forEach(challenge => {
            const challengeElement = document.createElement('div');
            challengeElement.className = 'challenge-item';
            challengeElement.innerHTML = `
                <div class="challenge-info">
                    <h4>${challenge.title}</h4>
                    <p>${challenge.description}</p>
                    <div class="challenge-progress">
                        <div class="progress-bar" style="width: ${(challenge.progress / challenge.target) * 100}%"></div>
                        <span class="progress-text">${challenge.progress}%/${challenge.target}%</span>
                    </div>
                </div>
                <div class="challenge-rewards">
                    <span class="reward">🏆 ${challenge.reward.points} Points</span>
                    <span class="reward">💰 ${challenge.reward.coins} Coins</span>
                    ${challenge.reward.badge ? `<span class="reward">🎖️ ${badges[challenge.reward.badge].name}</span>` : ''}
                </div>
            `;
            monthlyChallenges.appendChild(challengeElement);
        });
    }

    // Update badges
    const badgeGrid = document.querySelector('.badges .badge-grid');
    if (badgeGrid) {
        badgeGrid.innerHTML = '';
        Object.entries(badges).forEach(([id, badge]) => {
            const isUnlocked = gamificationData.user.badges.includes(id);
            const badgeElement = document.createElement('div');
            badgeElement.className = `badge-item ${isUnlocked ? 'unlocked' : 'locked'}`;
            badgeElement.innerHTML = `
                <div class="badge-icon">${badge.icon}</div>
                <div class="badge-name">${badge.name}</div>
                <div class="badge-tooltip">
                    <h4>${badge.name}</h4>
                    <p>${badge.description}</p>
                </div>
            `;
            badgeGrid.appendChild(badgeElement);
        });
    }
}

// Initialize user stats
const userStats = {
    points: 3750,
    coins: 1500,
    level: 8,
    experience: 7850,
    badges: ['budget_master', 'streak_master', 'smart_shopper']
};

// Function to update header stats
function updateHeaderStats() {
    const pointsElement = document.querySelector('.points');
    const coinsElement = document.querySelector('.coins');
    
    if (pointsElement) pointsElement.textContent = `🏆 ${userStats.points.toLocaleString()} Points`;
    if (coinsElement) coinsElement.textContent = `💰 ${userStats.coins.toLocaleString()} Coins`;
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('Initializing application...');
        initializeData();
        console.log('Data initialized');
        
        // Add tab switching functionality
        document.querySelectorAll('nav button').forEach(button => {
            button.addEventListener('click', (e) => {
                switchTab(e.target.getAttribute('data-tab'));
            });
        });
        
        // Initialize dashboard as default tab
        switchTab('dashboard');
        
        // Update header stats
        updateHeaderStats();
        
        console.log('Application initialized');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});
