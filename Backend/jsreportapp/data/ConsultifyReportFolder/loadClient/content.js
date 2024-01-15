const axios = require('axios');

// Call remote API to fetch adviser data count
function fetchAdviserCount() {
    return axios.get('http://localhost:4000/api/advisers/count')
        .then(response => response.data.count)
        .catch(error => {
            console.error('Error fetching adviser count:', error);
            throw error;
        });
}

// Call remote API to fetch user budgets
function fetchUserBudgets() {
    return axios.get('http://localhost:4000/api/budgets/budgetsByUser')
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching user budgets:', error);
            throw error;
        });
}

    

// Call remote API to fetch adviser data
function fetchAdviserData() {
    return axios.get('http://localhost:4000/api/advisers')
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching adviser data:', error);
            throw error;
        });
}

function fetchUserCount() {
    return axios.get('http://localhost:4000/api/users/count')
        .then(response => response.data.count)
        .catch(error => {
            console.error('Error fetching user data:', error);
            throw error;
        });
}
// Process adviser data for the report
async function prepareDataSource() {
    try {
        const adviserCount = await fetchAdviserCount();
        const userBudgets = await fetchUserBudgets();
        const userCount = await fetchUserCount();
        const advisersData = await fetchAdviserData();


        const processedData = advisersData.map(adviser => ({
            id: adviser.id,
            userId: adviser.userId,
            name: adviser.name,
            lastName: adviser.lastName,
            dni: adviser.dni,
        }));

        const userbudgetsData = userBudgets.map(userBudget => ({
            userName: userBudget.user.username,
            totalBudgets: userBudget.totalBudgets,
        }));

        return {
            userBudgets: userbudgetsData,
            adviserCount,
            userCount,
            advisers: processedData,
        };
    } catch (error) {
        console.error('Error preparing data source for the report:', error);
        throw error;
    }
}

async function beforeRender(req, res) {
    try {
        const { adviserCount, userBudgets, userCount, advisers } = await prepareDataSource();
        req.data.adviserCount = adviserCount;
        req.data.userBudgets = userBudgets;
        req.data.userCount = userCount;
        req.data.advisers = advisers;
    } catch (error) {
        console.error('Error before rendering report:', error);
        throw error;
    }
}

