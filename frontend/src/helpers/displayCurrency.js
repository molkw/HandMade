const displayTND = (num) => {
    const formatter = new Intl.NumberFormat('ar-TN', {
        style: 'currency',
        currency: 'TND',
        minimumFractionDigits: 3
    });

    return formatter.format(num);
}

export default displayTND;
