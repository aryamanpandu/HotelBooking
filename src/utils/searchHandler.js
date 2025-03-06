const searchParams = new URLSearchParams(window.location.search);
const roomType = searchParams.get('room_type');

function displayResults(rooms) {
    const resultBody = document.getElementById('result-body');
    resultBody.innerHTML = ''; // Clear previous results

    if (rooms.length === 0) {
        resultBody.innerHTML = '<tr><td colspan="6">No rooms found</td></tr>';
        return;
    }

    rooms.forEach(room => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${room.roomType}</td>
            <td>${room.location}</td>
            <td>${room.numOfBedrooms}</td>
            <td>${room.poolIncluded}</td>
            <td>${room.avgRating}</td>
            <td>${room.price}</td>
        `;
        resultBody.appendChild(row);
    });
}


function fetchSearchResults(room_type) {
    const url = `/searchRooms.html?room_type=${room_type}`;

    fetch(url).then(response => response.json())
                .then(rooms => {
                    console.log('Filtered rooms: ', rooms);
                    displayResults(rooms);
                })
                .catch((err) => {
                    console.log('Error fetching data: ', err);
                    return;
                })
}

fetchSearchResults(roomType);
console.log(roomType);