const monthSelect = document.getElementById('month');
        const yearSelect = document.getElementById('year');
        const dateSelect = document.getElementById('date');

        const fillYears = () => {
            const currentYear = new Date().getFullYear();
            for (let i = currentYear - 100; i <= currentYear + 10; i++) {
                yearSelect.add(new Option(i, i));
            }
        };

        const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

        const updateDays = () => {
            const daysInMonth = [
                31, isLeapYear(yearSelect.value) ? 29 : 28, 31, 30, 31, 30,
                31, 31, 30, 31, 30, 31
            ];
            const maxDays = daysInMonth[monthSelect.value];

            dateSelect.innerHTML = '';
            for (let i = 1; i <= maxDays; i++) {
                dateSelect.add(new Option(i, i));
            }
        };

        const init = () => {
            fillYears();
            yearSelect.value = new Date().getFullYear();
            monthSelect.value = new Date().getMonth();
            updateDays();
        };

        monthSelect.addEventListener('change', updateDays);
        yearSelect.addEventListener('change', updateDays);

        init();