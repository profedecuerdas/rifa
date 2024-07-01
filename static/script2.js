$(document).ready(function() {
    function loadRaffleData() {
        $.get('/get_raffle_data', function(data) {
            const tableBody = $('#raffleTable tbody');
            tableBody.empty();

            data.forEach(function(row) {
                const number = row[0];
                const status = row[1];
                const playerName = row[2];

                const tableRow = $('<tr></tr>');
                const numberCell = $('<td></td>').text(number);
                const statusCell = $('<td></td>').text(status)
                    .addClass(status === 'Libre' ? 'free' : 'occupied');
                const nameCell = $('<td></td>').text(playerName)
                    .attr('contenteditable', true)
                    .on('input', function() {
                        if ($(this).text().trim() === '') {
                            statusCell.text('Libre');
                            statusCell.removeClass('occupied').addClass('free');
                        } else {
                            statusCell.text('Ocupado');
                            statusCell.removeClass('free').addClass('occupied');
                        }
                    });

                tableRow.append(numberCell).append(statusCell).append(nameCell);
                tableBody.append(tableRow);
            });
        });
    }

    function saveRaffleData() {
        const data = [];
        $('#raffleTable tbody tr').each(function() {
            const number = $(this).find('td').eq(0).text();
            const status = $(this).find('td').eq(1).text();
            const playerName = $(this).find('td').eq(2).text();
            data.push([number, status, playerName]);
        });

        $.ajax({
            url: '/save_raffle_data',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(response) {
                alert('Datos guardados exitosamente');
            }
        });
    }

    loadRaffleData();

    $('#saveButton').on('click', function() {
        saveRaffleData();
    });
});

