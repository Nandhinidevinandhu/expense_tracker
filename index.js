
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 0;

const amountInput = document.getElementById('amount-input');
const descriptionInput = document.getElementById('description-input');
const categorySelect = document.getElementById('category-select');
const addBtn = document.getElementById('add-btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

function updateLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('totalAmount', totalAmount.toString());
}
function renderExpenses() {
    expenseTableBody.innerHTML = '';
    totalAmountCell.textContent = totalAmount;

    expenses.forEach((expense, index) => {
        const newRow = expenseTableBody.insertRow();

        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const descriptionCell = newRow.insertCell();
        const editCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();

        categoryCell.textContent = expense.category;
        amountCell.textContent = expense.amount;
        descriptionCell.textContent = expense.description;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', function() {
            amountInput.value = expense.amount;
            descriptionInput.value = expense.description;
            categorySelect.value = expense.category;

            expenses.splice(index, 1);

            totalAmount -= expense.amount;
            totalAmountCell.textContent = totalAmount;

            expenseTableBody.removeChild(newRow);

            updateLocalStorage();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
            expenses.splice(index, 1);

            totalAmount -= expense.amount;
            totalAmountCell.textContent = totalAmount;

            expenseTableBody.removeChild(newRow);
            updateLocalStorage();
        });

        editCell.appendChild(editBtn);
        deleteCell.appendChild(deleteBtn);
    });
}
addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const description = descriptionInput.value;

    expenses.push({ category, amount, description });
    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;
    renderExpenses();
    updateLocalStorage();
});
renderExpenses();
