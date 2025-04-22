document.getElementById("reservation-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    document.getElementById("first-name-error").textContent = "";
    document.getElementById("last-name-error").textContent = "";
    document.getElementById("email-error").textContent = "";
    document.getElementById("password-error").textContent = "";
    document.getElementById("date-error").textContent = "";
    document.getElementById("time-error").textContent = "";

    let hasError = false;

    if (firstName.length < 2) {
        document.getElementById("first-name-error").textContent = "Име: минимум 2 символа";
        hasError = true;
    }

    if (lastName.length < 2) {
        document.getElementById("last-name-error").textContent = "Фамилия: минимум 2 символа";
        hasError = true;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById("email-error").textContent = "Невалиден имейл";
        hasError = true;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
        document.getElementById("password-error").textContent = "Парола: 8+ символа, главна/малка буква, число, символ";
        hasError = true;
    }

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
        document.getElementById("date-error").textContent = "Изберете бъдеща дата";
        hasError = true;
    }

    const dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 0) {
        document.getElementById("date-error").textContent = "Неделя е почивен ден";
        hasError = true;
    }

    const validHours = dayOfWeek === 6 ? ["10:00", "11:00", "12:00", "13:00"] : ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];
    if (!validHours.includes(time)) {
        document.getElementById("time-error").textContent = "Невалиден час";
        hasError = true;
    }

    if (!hasError) {
        const modal = document.getElementById("modal");
        document.getElementById("modal-message").innerHTML = `${firstName} ${lastName}<br>${email}<br>${date}<br>${time}`;
        modal.style.display = "block";

        document.querySelector(".close").onclick = () => modal.style.display = "none";
        window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; };
    }
});